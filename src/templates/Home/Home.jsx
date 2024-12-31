import styles from "./style.module.scss";
import { fetchAllPhotosWithMetadata } from "@/services/flickr";
import { useEffect, useState } from "react";

export default function Home() {
  const [photos, setPhotos] = useState([]);
  const userId = process.env.NEXT_PUBLIC_FLICKR_USER_ID;

  useEffect(() => {
    fetchAllPhotosWithMetadata(userId).then((data) => {
      if (data.photos) {
        setPhotos(data.photos);
      }
    });
  }, [userId]);

  console.log(photos);  // Vérifiez que toutes les photos et métadonnées sont récupérées

  return (
    <div className={styles.homeContainer}>
      <h1>Welcome to my website</h1>
      <div>
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
                
                {/* Affichage des informations de localisation */}
                {photo.metadata.location && (
                  <div>
                    <h4>Location:</h4>
                    <p><strong>Country:</strong> {photo.metadata.location.country}</p>
                    <p><strong>Neighbourhood:</strong> {photo.metadata.location.neighbourhood}</p>
                    <p><strong>Latitude:</strong> {photo.metadata.location.latitude}</p>
                    <p><strong>Longitude:</strong> {photo.metadata.location.longitude}</p>
                  </div>
                )}
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
