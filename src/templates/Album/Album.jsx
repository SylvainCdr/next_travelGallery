import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { fetchPhotosFromAlbum } from "../../services/flickr";
import { motion } from "framer-motion";
import styles from "./style.module.scss";
import ModalImage from "react-modal-image";

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
  const [photoMetadata, setPhotoMetadata] = useState({});
  const router = useRouter();

  // Fonction pour récupérer l'URL de la photo en taille "Large 1600"
  const getLargePhotoUrl = (photo) => {
    return `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_b.jpg`;
  };



  useEffect(() => {
    if (router.isReady) {
      const { id } = router.query;
      if (id) {
        fetchPhotosFromAlbum(id, process.env.NEXT_PUBLIC_FLICKR_USER_ID)
          .then((photos) => {
            setPhotos(shuffleArray(photos));  // Mélange des photos de manière aléatoire
          
          })
          .catch((error) =>
            console.error("Erreur lors de la récupération des photos:", error)
          );
      }
    }
  }, [router.isReady]);

  return (
    <div className={styles.albumContainer}>
      <h1>Photos de l'album</h1>
    
        <div className={styles.photoGrid}>
          {photos.map((photo) => {
            const smallPhotoUrl = `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`;
            const largePhotoUrl = getLargePhotoUrl(photo);
            const { x, y, rotate, scale } = getRandomPositionAndSize(); // Obtenez des positions et tailles aléatoires

            return (
              <motion.div
                key={photo.id}
                className={styles.photoItem}
                initial={{
                  opacity: 0,
                  x: x,
                  y: y,
                  rotate: rotate,
                  scale: scale,  // Appliquer une taille aléatoire à l'entrée
                }}
                animate={{
                  opacity: 1,
                  x: 0,
                  y: 0,
                  rotate: 0,
                  scale: 1,  // La taille finale est la taille normale
                }}
                transition={{
                  duration: 1, // Durée de l'animation
                  type: "spring", // Utilisation d'une animation de type spring
                  stiffness: 50, // Stiffness pour un effet plus élastique
                }}
              >
                <ModalImage
                  alt={photo.title}
                  className={styles.photoImage}
                  small={smallPhotoUrl}
                  large={largePhotoUrl}
                />
              </motion.div>
            );
          })}
        </div>

    
        <button onClick={() => router.back()}>Retour</button>

      
    </div>
  );
}
