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
    console.error(
      "Erreur lors de la récupération des photos de l'album:",
      error
    );
  }
};

// Récupérer toutes les photos avec leurs métadonnées
export const fetchAllPhotosWithMetadata = async (userId, perPage = 500) => {
  try {
    // Récupérer la première page pour obtenir le nombre total de pages
    const firstPageResponse = await fetch(
      `https://api.flickr.com/services/rest/?method=flickr.people.getPhotos&api_key=${apiKey}&user_id=${userId}&extras=geo&per_page=${perPage}&page=1&format=json&nojsoncallback=1`
    );
    const firstPageData = await firstPageResponse.json();

    if (firstPageData.stat !== "ok") {
      console.error(
        "Erreur lors de la récupération des photos:",
        firstPageData.message
      );
      return { photos: [], totalPages: 0 };
    }

    const totalPages = firstPageData.photos.pages;
    let allPhotos = firstPageData.photos.photo;

    // Récupérer les photos de toutes les pages suivantes
    for (let page = 2; page <= totalPages; page++) {
      const response = await fetch(
        `https://api.flickr.com/services/rest/?method=flickr.people.getPhotos&api_key=${apiKey}&user_id=${userId}&extras=geo&per_page=${perPage}&page=${page}&format=json&nojsoncallback=1`
      );
      const data = await response.json();

      if (data.stat === "ok") {
        allPhotos = [...allPhotos, ...data.photos.photo]; // Ajouter les photos de la page actuelle
      } else {
        console.error(
          "Erreur lors de la récupération des photos:",
          data.message
        );
        break;
      }
    }

    // Récupérer les métadonnées de chaque photo
    const photosWithMetadata = await Promise.all(
      allPhotos.map(async (photo) => {
        const metadata = await getPhotoMetadata(photo.id); // Fonction pour récupérer les métadonnées de la photo
        return { ...photo, metadata };
      })
    );

    return { photos: photosWithMetadata, totalPages };
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des photos et métadonnées:",
      error
    );
    return { photos: [], totalPages: 0 };
  }
};

// Fonction pour récupérer les métadonnées d'une photo
const getPhotoMetadata = async (photoId) => {
  try {
    const url = `https://api.flickr.com/services/rest/?method=flickr.photos.getInfo&api_key=${apiKey}&photo_id=${photoId}&format=json&nojsoncallback=1`;
    const response = await fetch(url);
    const data = await response.json();

    if (data.stat === "ok") {
      const photo = data.photo;

      // Extraire les données de localisation
      const location = photo.location
        ? {
            latitude: photo.location.latitude,
            longitude: photo.location.longitude,
            country: photo.location.country._content,
            neighbourhood: photo.location.neighbourhood._content,
          }
        : null;

      return {
        title: photo.title._content,
        description: photo.description._content,
        tags: photo.tags.tag.map((tag) => tag._content).join(", "),
        dateTaken: photo.dates.taken,
        location, // Retourne les données de localisation
      };
    } else {
      console.error("Erreur lors de la récupération des métadonnées:", data);
      return {};
    }
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des métadonnées de la photo:",
      error
    );
    return {};
  }
};

export const fetchPhotoById = async (photoId) => {
  try {
    const response = await fetch(
      `https://api.flickr.com/services/rest/?method=flickr.photos.getInfo&api_key=${apiKey}&photo_id=${photoId}&format=json&nojsoncallback=1`
    );
    const data = await response.json();

    if (data.stat === "ok") {
      const photo = data.photo;
      return {
        id: photo.id,
        title: photo.title._content,
        description: photo.description._content,
        tags: photo.tags.tag.map((tag) => tag._content).join(", "),
        dateTaken: photo.dates.taken,
        farm: photo.farm,
        server: photo.server,
        secret: photo.secret,
        photoUrl: `https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_b.jpg`,
      };
    } else {
      console.error("Erreur lors de la récupération de la photo:", data);
      return null;
    }
  } catch (error) {
    console.error("Erreur lors de la récupération de la photo:", error);
    return null;
  }
};

