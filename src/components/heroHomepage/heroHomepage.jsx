import React, { useEffect, useState } from "react";
import styles from "./style.module.scss";
import { fetchPhotoById } from "@/services/flickr";

export default function HeroHomepage({ photoId }) {
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
    return <div className={styles.loader}>Loading...</div>;
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
        
          <h1> Welcome to my photo gallery </h1>
          <p>Discover my memories captured with passion</p>
    
        

        </div>
      </div>
    </div>
  );
}
