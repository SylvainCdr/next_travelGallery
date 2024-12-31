import styles from "./style.module.scss";
import { fetchAllPhotosWithMetadata } from "@/services/flickr";
import { useEffect, useState } from "react";

export default function Home() {
  const [photos, setPhotos] = useState([]);
  const userId = process.env.NEXT_PUBLIC_FLICKR_USER_ID;

  useEffect(() => {
    // Appel de l'API pour récupérer toutes les photos avec leurs métadonnées
    fetchAllPhotosWithMetadata(userId).then((data) => {
      if (data.photos) {
        setPhotos(data.photos);  // Mettez à jour l'état avec toutes les photos et leurs métadonnées
      }
    });
  }, [userId]);

  console.log(photos);  // Vérifiez que toutes les photos et métadonnées sont récupérées

  return (
    <div className={styles.homeContainer}>
      <h1>Welcome to my website</h1>
      <div>
        {/* Affichage des photos et de leurs métadonnées */}
        {photos.length > 0 ? (
          photos.map((photo) => (
            <div key={photo.id}>
              <img
                src={`https://farm${photo.farm}.static.flickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`}
                alt={photo.title}
                style={{ width: "200px", height: "200px" }}
              />
              <div>
                <h3>{photo.metadata.title}</h3>
                <p>{photo.metadata.description}</p>
                <p><strong>Tags:</strong> {photo.metadata.tags}</p>
                <p><strong>Date Taken:</strong> {photo.metadata.dateTaken}</p>
              </div>
            </div>
          ))
        ) : (
          <p>Aucune photo disponible</p>
        )}
      </div>
    </div>
  );
}
