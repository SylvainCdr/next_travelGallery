import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { fetchPhotosFromAlbum } from "../../services/flickr";
import { motion } from "framer-motion";
import styles from "./style.module.scss";
import { BallTriangle } from "react-loader-spinner";

const shuffleArray = (array) => {
  return array.sort(() => Math.random() - 0.5);
};

const getRandomPositionAndSize = () => {
  const x = Math.random() * 200 - 100; 
  const y = Math.random() * 200 - 100; 
  const rotate = Math.random() * 30 - 15; 
  const scale = 0.7 + Math.random() * 0.6; 
  return { x, y, rotate, scale };
};

export default function Album() {
  const [photos, setPhotos] = useState([]);
  const [albumTitle, setAlbumTitle] = useState("");
  const [randomHeroPhoto, setRandomHeroPhoto] = useState(null);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // État pour le loader
  const router = useRouter();

  const getLargePhotoUrl = (photo) => {
    return `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_b.jpg`;
  };

  useEffect(() => {
    if (router.isReady) {
      const { id } = router.query;
      if (id) {
        setIsLoading(true); // Afficher le loader
        fetchPhotosFromAlbum(id, process.env.NEXT_PUBLIC_FLICKR_USER_ID)
          .then(({ photos, title }) => {
            const shuffledPhotos = shuffleArray(photos);
            setPhotos(shuffledPhotos);
            setAlbumTitle(title);
            setRandomHeroPhoto(shuffledPhotos[8]);
            setIsLoading(false); // Masquer le loader
          })
          .catch((error) => {
            console.error("Erreur lors de la récupération des photos:", error);
            setIsLoading(false); // Masquer le loader même en cas d'erreur
          });
      }
    }
  }, [router.isReady]);

  const handleOpenModal = (index) => {
    setCurrentPhotoIndex(index);
  };

  const handleCloseModal = () => {
    setCurrentPhotoIndex(null);
  };

  const handleNextPhoto = () => {
    setCurrentPhotoIndex((prevIndex) => (prevIndex + 1) % photos.length);
  };

  const handlePrevPhoto = () => {
    setCurrentPhotoIndex((prevIndex) =>
      (prevIndex - 1 + photos.length) % photos.length
    );
  };

  const handleSwipe = (e) => {
    const startX = e.changedTouches[0].clientX;
    const endX = e.changedTouches[1]?.clientX || startX;

    if (startX - endX > 100) {
      handleNextPhoto();
    } else if (endX - startX > 100) {
      handlePrevPhoto();
    }
  };

  return (
    <div className={styles.albumContainer}>
      {isLoading ? (
        <div className={styles.loader}>
          <BallTriangle
            height={100}
            width={100}
            radius={5}
            color="#D6C3C9"
            ariaLabel="ball-triangle-loading"
            visible={true}
          />
          <p>Chargement...</p>
        </div>
      ) : (
        <>
          {randomHeroPhoto && (
            <div className={styles.hero}>
              <img
                src={getLargePhotoUrl(randomHeroPhoto)}
                alt={randomHeroPhoto.title}
                className={styles.heroImage}
              />
              <div className={styles.heroOverlay}>
                <h1 className={styles.heroTitle}>{albumTitle}</h1>
              </div>
            </div>
          )}

          <div className={styles.photoGrid}>
            {photos.map((photo, index) => {
              const smallPhotoUrl = `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`;
              const { x, y, rotate, scale } = getRandomPositionAndSize();

              return (
                <motion.div
                  key={photo.id}
                  className={styles.photoItem}
                  initial={{
                    opacity: 0,
                    x: x,
                    y: y,
                    rotate: rotate,
                    scale: scale,
                  }}
                  animate={{
                    opacity: 1,
                    x: 0,
                    y: 0,
                    rotate: 0,
                    scale: 1,
                  }}
                  transition={{
                    duration: 1,
                    type: "spring",
                    stiffness: 50,
                  }}
                  onClick={() => handleOpenModal(index)}
                >
                  <img
                    alt={photo.title}
                    className={styles.photoImage}
                    src={smallPhotoUrl}
                  />
                </motion.div>
              );
            })}
          </div>

          {currentPhotoIndex !== null && (
            <div
              className={styles.modal}
              onClick={handleCloseModal}
            >
              <div
                className={styles.modalContent}
                onClick={(e) => e.stopPropagation()}
                onTouchStart={handleSwipe}
              >
                <button className={styles.prevButton} onClick={handlePrevPhoto}>
                  <i className="fa-solid fa-chevron-left"></i>
                </button>
                <img
                  src={getLargePhotoUrl(photos[currentPhotoIndex])}
                  alt={photos[currentPhotoIndex]?.title}
                  className={styles.modalImage}
                />
                <button className={styles.nextButton} onClick={handleNextPhoto}>
                  <i className="fa-solid fa-chevron-right"></i>
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
