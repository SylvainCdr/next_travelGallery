import React, { useEffect, useState } from "react";
import HeroGallery from "@/components/heroHomepage/heroHomepage";
import HeroHomepage2 from "@/components/heroHomepage2/heroHomepage2";
import styles from "./style.module.scss";
import { fetchAllPhotosWithMetadata } from "@/services/flickr";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Home() {
  const heroPhotoIds = [
    "53688327997",
    "54254685921",
    "53696551583",
    "54253765902",
    "54179157855",
    "54178884234",
    "54178884249",
    "53715240727",
    "53716364863",
    "53694442032",
    "53698205783",
    "53689847919",
    "53696982782",
  ];

  const [heroPhotoId, setHeroPhotoId] = useState(null); // Photo pour le Hero
  const [galleryPhotos, setGalleryPhotos] = useState([]); // Photos pour la galerie
  const [loadingGallery, setLoadingGallery] = useState(true);
  const [photos, setPhotos] = useState([]);
  const userId = process.env.NEXT_PUBLIC_FLICKR_USER_ID;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const randomPhotoId =
      heroPhotoIds[Math.floor(Math.random() * heroPhotoIds.length)];
    setHeroPhotoId(randomPhotoId);
  }, []);

  useEffect(() => {
    fetchAllPhotosWithMetadata(userId).then((data) => {
      if (data.photos) {
        const randomPhotos = data.photos
          .sort(() => Math.random() - 0.5)
          .slice(0, 18);
        setPhotos(randomPhotos);
        setLoading(false);
      }
    });
  }, [userId]);

  if (!heroPhotoId) {
    return <div className={styles.loader}>Loading...</div>;
  }

  return (
    <div className={styles.homeContainer}>
      {/* Hero Section */}
      <HeroHomepage2 />

      {/* About Me Section */}
      <section className={styles.aboutMe}>
  <div className={styles.aboutMeContainer}>
    <img
      src="/assets/profile.jpg"
      alt="Profile Picture"
      className={styles.profilePhoto}
    />
    <div className={styles.aboutText}>
      <h2>Bienvenue !</h2>
      <p>
        Je suis Sylvain, passionné de voyages et de photographie. J'aime particulièrement capturer la beauté de la vie sauvage, notamment les reptiles, amphibiens et invertébrés.
      </p>
      <p>
        Avec mon reflex, mon drone et ma caméra sous-marine, je m'efforce d'immortaliser des instants uniques et de partager mes découvertes avec vous. Explorez mes albums pour voyager à travers mon objectif !
      </p>
    </div>
  </div>
</section>

      {/* Loader */}
      {loading && (
        <div className={styles.loader}>
          <div className={styles.spinner}></div>
          <p>Loading pictures...</p>
        </div>
      )}

      {/* Galerie de photos */}
      {!loading && (
        <section className={styles.gallery}>
          {photos.length > 0 ? (
            <div className={styles.grid}>
              {photos.map((photo) => {
                return (
                  <motion.div
                    key={photo.id}
                    className={styles.photoItem}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8 }}
                  >
                    <img
                      src={`https://farm${photo.farm}.static.flickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`}
                      alt={photo.title}
                      className={styles.photo}
                    />
                  </motion.div>
                );
              })}
            </div>
          ) : (
            <p>Aucune photo disponible</p>
          )}
        </section>
      )}

      {/* Navigation vers les albums */}
      <div className={styles.btns}>
        <Link href="/albums">
          <button className={styles.btn}>See Travel Albums</button>
        </Link>
        <Link href="/albums/72177720323101492">
          <button className={styles.btn}>See Wildlife</button>
        </Link>
      </div>

      {/* Footer */}
      <footer className={styles.footer}>
        <p>© 2025 Sylvain Cadoret. All rights reserved.</p>
      </footer>
    </div>
  );
}
