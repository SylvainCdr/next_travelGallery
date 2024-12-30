const apiKey = process.env.NEXT_PUBLIC_FLICKR_KEY;
const userId = process.env.NEXT_PUBLIC_FLICKR_USER_ID;

// Récupérer les albums
export const fetchAlbums = async (userId) => {
  try {
    const response = await fetch(
      `https://api.flickr.com/services/rest/?method=flickr.photosets.getList&api_key=${apiKey}&user_id=${userId}&format=json&nojsoncallback=1`
    );
    const data = await response.json();
    return data.photosets.photoset;
  } catch (error) {
    console.error("Erreur lors de la récupération des albums:", error);
  }
};

// Récupérer les photos d'un album spécifique
export const fetchPhotosFromAlbum = async (albumId, userId) => {
  try {
    const response = await fetch(
      `https://api.flickr.com/services/rest/?method=flickr.photosets.getPhotos&api_key=${apiKey}&photoset_id=${albumId}&user_id=${userId}&format=json&nojsoncallback=1`
    );
    const data = await response.json();
    return data.photoset.photo;
  } catch (error) {
    console.error("Erreur lors de la récupération des photos de l'album:", error);
  }
};
