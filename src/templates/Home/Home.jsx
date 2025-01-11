import React, { useEffect, useState } from "react";
import HeroGallery from "@/components/heroGallery/heroGallery";
import styles from "./style.module.scss";
import { fetchAllPhotosWithMetadata } from "@/services/flickr";
import { motion } from "framer-motion";

export default function Home() {
  // Liste des IDs pour le HeroGallery
  const heroPhotoIds = [
    "53688327997", "54254685921", "53696551583", "54253765902",
    "54179157855", "54178884234", "54178884249", "53715240727",
    "53716364863", "53694442032", "53698205783", "53689847919",
    "53696982782"
  ];

  const [heroPhotoId, setHeroPhotoId] = useState(null); // Photo pour le Hero
  const [galleryPhotos, setGalleryPhotos] = useState([]); // Photos pour la galerie
  const [loadingGallery, setLoadingGallery] = useState(true);
  const [photos, setPhotos] = useState([]);
  const userId = process.env.NEXT_PUBLIC_FLICKR_USER_ID;
  const [loading, setLoading] = useState(true);

  // Sélectionner une photo aléatoire pour le Hero
  useEffect(() => {
    const randomPhotoId =
      heroPhotoIds[Math.floor(Math.random() * heroPhotoIds.length)];
    setHeroPhotoId(randomPhotoId);
  }, []);

  // Charger les 20 photos pour la galerie
  useEffect(() => {
    fetchAllPhotosWithMetadata(userId).then((data) => {
      if (data.photos) {
        const randomPhotos = data.photos.sort(() => Math.random() - 0.5).slice(0, 24);
        setPhotos(randomPhotos);
        setLoading(false);
      }
    });
  }, [userId]);


  if (!heroPhotoId) {
    return <div className={styles.loader}>Chargement...</div>;
  }

  return (
    <div className={styles.homeContainer}>
      {/* Hero Section */}
      <HeroGallery photoId={heroPhotoId} />

    

  
      {/* Loader */}
      {loading && (
        <div className={styles.loader}>
          <div className={styles.spinner}></div>
          <p>Chargement des photos...</p>
        </div>
      )}

      {/* Galerie de photos */}
      {!loading && (
        <section className={styles.gallery}>
          {photos.length > 0 ? (
            <div className={styles.grid}>
              {photos.map((photo) => {
  
  
  return (
    <motion.div
      key={photo.id}
      className={styles.photoItem}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    
    >
      <img
        src={`https://farm${photo.farm}.static.flickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`}
        alt={photo.title}
        className={styles.photo}
      />
    </motion.div>
  );
})}

            </div>
          ) : (
            <p>Aucune photo disponible</p>
          )}
        </section>
      )}


      {/* Footer */}
      <footer className={styles.footer}>
        <p>© 2024 Votre Nom. Tous droits réservés.</p>
      </footer>
    </div>
  );
}