import React, { useEffect, useState } from "react";
import styles from "./style.module.scss";
import { fetchPhotoById } from "@/services/flickr";

export default function HeroGallery({ photoId }) {
  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPhotoById(photoId).then((data) => {
      if (data) {
        setPhoto(data);
      }
      setLoading(false);
    });
  }, [photoId]);



  if (loading) {
    return <div className={styles.loader}>Chargement...</div>;
  }

  if (!photo) {
    return <div className={styles.error}>Erreur : La photo n'a pas pu être chargée.</div>;
  }

  return (
    <div className={styles.heroGalleryContainer}>
      <div
        className={styles.heroGalleryImage}
        style={{ backgroundImage: `url(${photo.photoUrl})` }}
      >
        <div className={styles.overlay}>
          <h1> Bienvenue dans ma galerie de photos </h1>
          <p>Découvrez mes souvenirs capturés avec passion</p>
        

        </div>
      </div>
    </div>
  );
}
