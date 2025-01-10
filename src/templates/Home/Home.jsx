import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import styles from './style.module.scss';
import { fetchAllPhotosWithMetadata } from '@/services/flickr';
import Link from 'next/link';


export default function Home() {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const userId = process.env.NEXT_PUBLIC_FLICKR_USER_ID;

  useEffect(() => {
    fetchAllPhotosWithMetadata(userId).then((data) => {
      if (data.photos) {
        const randomPhotos = data.photos.sort(() => Math.random() - 0.5).slice(0, 24);
        setPhotos(randomPhotos);
        setLoading(false);
      }
    });
  }, [userId]);

  return (
    <div className={styles.homeContainer}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1>Bienvenue dans ma galerie de photos</h1>
          <p>Découvrez une collection unique de photos provenant de ma vitrine Flickr.</p>
     
          <Link href="/albums" className={styles.button}>
            Voir les albums
          </Link>

        </div>
      </section>

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
