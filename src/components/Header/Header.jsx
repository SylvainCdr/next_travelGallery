import styles from "./style.module.scss";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false); // État pour le menu burger
  const [isMobile, setIsMobile] = useState(false); // État pour la détection de l'écran mobile
  const flickr = "https://www.flickr.com/people/114125114@N02/";

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Détection de la taille de l'écran
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 900); // Mobile/Tablet si largeur <= 900px
    };

    handleResize(); // Vérifie une première fois au chargement
    window.addEventListener("resize", handleResize); // Ajoute un écouteur pour suivre les changements

    return () => {
      window.removeEventListener("resize", handleResize); // Nettoyage
    };
  }, []);

  return (
    <header className={styles.headerContainer}>
      <div className={styles.headerLogo}>
        <Link href="/">
          <Image
            src="/assets/logo.jpg"
            alt="photo gallery home"
            width={200}
            height={80}
          />
        </Link>
      </div>

      {/* Menu responsive */}
      <motion.nav
        className={styles.headerLinks}
        initial={isMobile ? { x: "100%" } : { x: 0 }} // Visible sur desktop
        animate={isOpen ? { x: 0 } : isMobile ? { x: "100%" } : { x: 0 }}
        transition={{ type: "keyframes", stiffness: 100, damping: 10 }}
      >
        <ul>
          <li>
            <Link href="/albums" onClick={toggleMenu}>
            Travel Albums
            </Link>
          </li>
          <li>
            <Link href="/albums/72177720323101492" onClick={toggleMenu}>
            Nature & Animals
            </Link>
          </li>
          <li>
            <Link href="/sky-&-sea-vibes" onClick={toggleMenu}>
            Sky & Sea Vibes
            </Link>
          </li>
          <li>
            <Link
              href={flickr}
              target="_blank"
              rel="noopener noreferrer"
              onClick={toggleMenu}
              style={{ textDecoration: "none" }}
              className={styles.flickrIcon}
            >
              <img
                src="assets/flickrLogo.png"
                alt= "flickr logo"
                className={styles.flickrIcon}
              />
            </Link>
          </li>
        </ul>
      </motion.nav>

      {/* Menu burger */}
      {isMobile && ( // Affiche le menu burger uniquement en mobile
        <div className={styles.burgerMenu} onClick={toggleMenu}>
          <motion.div
            animate={isOpen ? { rotate: 45, y: 12 } : { rotate: 0, y: 0 }}
            className={styles.line}
          />
          <motion.div
            animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
            className={styles.line}
          />
          <motion.div
            animate={isOpen ? { rotate: -45, y: -12 } : { rotate: 0, y: 0 }}
            className={styles.line}
          />
        </div>
      )}
    </header>
  );
}
