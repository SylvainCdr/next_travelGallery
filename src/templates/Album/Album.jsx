import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { fetchPhotosFromAlbum } from '../../services/flickr';
import styles from './style.module.scss';

export default function Album() {
  const [photos, setPhotos] = useState([]);
  const router = useRouter();

  useEffect(() => {
    if (router.isReady) {
      const { id } = router.query;
      if (id) {
        fetchPhotosFromAlbum(id, process.env.NEXT_PUBLIC_FLICKR_USER_ID)
          .then((photos) => setPhotos(photos))
          .catch((error) => console.error("Erreur lors de la récupération des photos:", error));
      }
    }
  }, [router.isReady]);

  return (
    <div className={styles.albumContainer}>
      <h1>Photos de l'album</h1>
      {photos.length > 0 ? (
        <div className={styles.photoGrid}>
          {photos.map((photo) => {
            const photoUrl = `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`;
            return (
              <div key={photo.id} className={styles.photoItem}>
                <img src={photoUrl} alt={photo.title} className={styles.photoImage} />
              </div>
            );
          })}
        </div>
      ) : (
        <p>Aucune photo disponible pour cet album.</p>
      )}
    </div>
  );
}
