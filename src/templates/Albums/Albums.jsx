import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { fetchAlbums } from '../../services/flickr';
import styles from './style.module.scss';

export default function Albums() {
  const [albums, setAlbums] = useState([]);
  const router = useRouter(); // Pour la gestion de la redirection
  const userId = process.env.NEXT_PUBLIC_FLICKR_USER_ID;

  // Récupérer les albums au chargement du composant
  useEffect(() => {
    fetchAlbums(userId).then((data) => setAlbums(data));
  }, [userId]);

  const handleAlbumClick = (albumId) => {
    router.push(`/albums/${albumId}`); // Redirection vers la page dynamique de l'album
  };

  return (
    <div className={styles.galleryContainer}>
      <h1>Flickr Gallery</h1>

      {/* Affichage des albums */}
      <div className={styles.albumList}>
        <h2>Albums</h2>
        {albums.length > 0 ? (
          <div className={styles.albumGrid}>
            {albums.map((album) => (
              <div 
                key={album.id} 
                className={styles.albumItem}
                onClick={() => handleAlbumClick(album.id)} // Rediriger vers la page de l'album au clic
              >
                <h3>{album.title._content}</h3>
                {/* Afficher l'image de couverture de l'album */}
                <img
                  src={`https://farm${album.farm}.staticflickr.com/${album.server}/${album.primary}_${album.secret}.jpg`}
                  alt={album.title._content}
                  className={styles.albumImage}
                />
              </div>
            ))}
          </div>
        ) : (
          <p>Aucun album trouvé.</p>
        )}
      </div>
    </div>
  );
}
