import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { fetchPhotosFromAlbum } from "../../services/flickr";
import { motion } from "framer-motion";
import styles from "./style.module.scss";

// Fonction pour mélanger un tableau de manière aléatoire
const shuffleArray = (array) => {
  return array.sort(() => Math.random() - 0.5);
};

// Fonction pour générer des positions et tailles aléatoires
const getRandomPositionAndSize = () => {
  const x = Math.random() * 200 - 100; // Entre -100 et +100
  const y = Math.random() * 200 - 100; // Entre -100 et +100
  const rotate = Math.random() * 30 - 15; // Entre -15° et +15°
  const scale = 0.7 + Math.random() * 0.6; // Taille entre 0.7 et 1.3
  return { x, y, rotate, scale };
};

export default function Album() {
  const [photos, setPhotos] = useState([]);
  const [albumTitle, setAlbumTitle] = useState(""); // Stocke le titre de l'album
  const [randomHeroPhoto, setRandomHeroPhoto] = useState(null); // Photo aléatoire pour le hero
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(null); // Gère la photo actuellement affichée
  const router = useRouter();

  const getLargePhotoUrl = (photo) => {
    return `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_b.jpg`;
  };

  useEffect(() => {
    if (router.isReady) {
      const { id } = router.query;
      if (id) {
        fetchPhotosFromAlbum(id, process.env.NEXT_PUBLIC_FLICKR_USER_ID)
          .then(({ photos, title }) => {
            const shuffledPhotos = shuffleArray(photos);
            setPhotos(shuffledPhotos); // Mélanger les photos
            setAlbumTitle(title); // Définir le titre de l'album
            setRandomHeroPhoto(shuffledPhotos[8]); // Photo aléatoire pour le hero
          })
          .catch((error) =>
            console.error("Erreur lors de la récupération des photos:", error)
          );
      }
    }
  }, [router.isReady]);

  // Gestion des clics pour ouvrir ou naviguer dans la vue agrandie
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

  // Fonction pour détecter le swipe
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
      {/* Hero Section */}
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

      {/* Photos Grid */}
      <div className={styles.photoGrid}>
        {photos.map((photo, index) => {
          const smallPhotoUrl = `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`;
          const largePhotoUrl = getLargePhotoUrl(photo);
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
              onClick={() => handleOpenModal(index)} // Ouvrir la photo agrandie
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

      {/* Modal Agrandie */}
      {currentPhotoIndex !== null && (
        <div
          className={styles.modal}
          onClick={handleCloseModal} // Fermer en cliquant en dehors
        >
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()} // Empêcher la fermeture si on clique sur le contenu
            onTouchStart={handleSwipe} // Détecter les gestes de swipe
          >
            <button className={styles.prevButton} onClick={handlePrevPhoto}>
            <i class="fa-solid fa-chevron-left"></i>
            </button>
            <img
              src={getLargePhotoUrl(photos[currentPhotoIndex])}
              alt={photos[currentPhotoIndex]?.title}
              className={styles.modalImage}
            />
            <button className={styles.nextButton} onClick={handleNextPhoto}>
            <i class="fa-solid fa-chevron-right"></i>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
