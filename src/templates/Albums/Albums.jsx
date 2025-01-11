import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { fetchAlbums } from "../../services/flickr";
import { BallTriangle } from "react-loader-spinner"; // Importer un loader spécifique
import styles from "./style.module.scss";

export default function Albums() {
  const [albums, setAlbums] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const userId = process.env.NEXT_PUBLIC_FLICKR_USER_ID;

  // Récupérer les albums au chargement du composant
  useEffect(() => {
    setIsLoading(true);
    fetchAlbums(userId)
      .then((data) => {
        setAlbums(data);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [userId]);

  const handleAlbumClick = (albumId) => {
    router.push(`/albums/${albumId}`);
  };

  return (
    <div className={styles.albumsContainer}>
      {isLoading ? (
        <div className={styles.loader}>
          <BallTriangle
            height={100}
            width={100}
            radius={5}
            color="#D6C3C9"
            ariaLabel="ball-triangle-loading"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          />
          <p>Chargement...</p>
        </div>
      ) : (
        <div className={styles.albumList}>
          {albums.length > 0 ? (
            <div className={styles.albumGrid}>
              {albums.map((album) => (
                <div
                  key={album.id}
                  className={styles.albumItem}
                  onClick={() => handleAlbumClick(album.id)}
                >
                  <h3>{album.title._content}</h3>
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
      )}
    </div>
  );
}
