import Link from "next/link";
import styles from "./style.module.scss";
import Head from "next/head";

export default function HighTech() {
  return (
    <>
      <Head>
        {/* <title>Diviniti - À Propos</title>

        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          property="og:title"
          content="Diviniti - Sûreté augmentée pour la ville de demain"
        />
        <meta
          property="og:description"
          content="Découvrez les solutions Diviniti pour la ville de demain, combinant IA et réalité étendue pour une sécurité proactive."
        />
        <meta
          property="og:keywords"
          content="sûreté augmentée, vidéoprotection, intelligence artificielle, réalité étendue, XR, ville intelligente, sécurité proactive, analyse d'image, contrôle d'accès, prédiction des risques, gestion de la sécurité, smart city, transport sécurisé, Diviniti"
        />
        <meta property="og:url" content="https://www.diviniti.tech" /> */}
      </Head>

      <div className={styles.highTechContainer}>
        <h1>High Tech trendings products</h1>

       {/* <Link href="https://amzn.to/48O16Xw" 
        target="_blank"
        rel="noopener noreferrer"
        style={{ textDecoration: "none" }}>
        <div className={styles.productCard}>
          <img src="assets/iphone-13.jpg" alt="iphone 13" />
          <h2>iPhone 13</h2>
          <p>Buy now</p>
          </div>
        </Link> */}

        
      
      </div>
    </>
  );
}
