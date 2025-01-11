import React, { useEffect } from "react";
import styles from "./style.module.scss";


export default function HeroHomepage2() {
  return (
    <div className={styles.heroGalleryContainer}>
      <div className={styles.heroGallery}>
        {/* Vidéo en arrière-plan */}
        <video
          className={styles.heroVideo}
          autoPlay
          muted
          loop
          playsInline
        >
          <source src="/assets/heroVideo.mp4" type="video/mp4" />
          Votre navigateur ne supporte pas la lecture des vidéos.
        </video>

        {/* Contenu overlay */}
        <div className={styles.overlay}>
          <h1>Welcome to my photo gallery</h1>
          <p>Discover my memories captured with passion</p>
        </div>
      </div>
    </div>
  );
}
