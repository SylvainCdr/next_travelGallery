import React from "react";
import ReactPlayer from "react-player";
import styles from "./style.module.scss";

export default function SkySeaVibes() {
  return (
    <div className={styles.skySeaVibesContainer}>
      <h1>Sky & Sea Vibes</h1>
      <div className={styles.videoWrapper}>
        <ReactPlayer
          url="https://www.youtube.com/watch?v=2my_Al1i_yg"
         
          width="100%"
          height="70%"
          controls={true} // Affiche les contrôles de lecture
          className={styles.reactPlayer} // Applique des styles personnalisés si nécessaire
        />
      </div>
      <div className={styles.videoWrapper}>
        <ReactPlayer
          url="https://www.youtube.com/watch?v=UHhBBvpdl1c"
         
          width="100%"
          height="70%"
          controls={true} // Affiche les contrôles de lecture
          className={styles.reactPlayer} // Applique des styles personnalisés si nécessaire
        />
      </div>
    </div>
  );
}
