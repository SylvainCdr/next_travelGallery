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

export const specificPhoto = async (photoId) => {
  try {
    const response = await fetch(
      `https://api.flickr.com/services/rest/?method=flickr.photos.getInfo&api_key=${apiKey}&photo_id=${photoId}&format=json&nojsoncallback=1`
    );
    const data = await response.json();
    return data.photo;
  } catch (error) {
    console.error("Erreur lors de la récupération des photos de l'album:", error);
  }
}


// service/flickr.js

export const getPhotoMetadata = async (photoId) => {

  const url = `https://api.flickr.com/services/rest/?method=flickr.photos.getInfo&api_key=${apiKey}&photo_id=${photoId}&format=json&nojsoncallback=1`;

  const response = await fetch(url);
  const data = await response.json();

  console.log("Réponse de l'API Flickr:", data);  // Ajouter cette ligne pour inspecter la réponse

  if (data.stat === "ok") {
    const photo = data.photo;
    return {
      title: photo.title._content,
      description: photo.description._content,
      tags: photo.tags.tag.map((tag) => tag._content).join(", "),
      dateTaken: photo.dates.taken,
    };
  } else {
    console.error("Erreur API Flickr:", data);  // Log des erreurs API
    throw new Error("Erreur lors de la récupération des métadonnées");
  }
};


export const fetchAllPhotos = async (userId, page = 1, perPage = 500) => {
  try {
    const response = await fetch(
      `https://api.flickr.com/services/rest/?method=flickr.people.getPhotos&api_key=${apiKey}&user_id=${userId}&extras=geo&per_page=${perPage}&page=${page}&format=json&nojsoncallback=1`
    );
    const data = await response.json();

    if (data.stat === "ok") {
      return {
        photos: data.photos.photo,
        totalPages: data.photos.pages,
      };
    } else {
      console.error("Erreur lors de la récupération des photos:", data.message);
      return { photos: [], totalPages: 0 };
    }
  } catch (error) {
    console.error("Erreur lors de la récupération des photos:", error);
    return { photos: [], totalPages: 0 };
  }
};
