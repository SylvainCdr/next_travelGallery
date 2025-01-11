// pages/_document.js
import { Html, Head, Main, NextScript } from "next/document";
// import { GA_TRACKING_ID } from "../../lib/gtag";

export default function Document() {
  return (
    <Html lang="fr">
      <Head>
        {/* Google Analytics
        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_TRACKING_ID}', {
                page_path: window.location.pathname,
              });
            `,
          }}
        /> */}

        {/* Meta Tags for SEO */}

        {/* <meta
          name="description"
          content="Diviniti, pionnier en sûreté augmentée, propose des solutions de vidéoprotection, IA et XR pour la ville intelligente de demain. Découvrez notre système d'exploitation dédié à la sécurité."
        />
        <meta
          name="keywords"
          content="sûreté augmentée, vidéoprotection, intelligence artificielle, réalité étendue, XR, ville intelligente, sécurité proactive, analyse d'image, contrôle d'accès, prédiction des risques, gestion de la sécurité, smart city, transport sécurisé, Diviniti"
        />
        <meta name="author" content="Diviniti" />
        <meta name="robots" content="index, follow" />
     

        <meta
          property="og:title"
          content="Diviniti - Sûreté augmentée pour la ville de demain"
        />
        <meta
          property="og:description"
          content="Diviniti développe des solutions de sûreté augmentée intégrant l'intelligence artificielle et la réalité étendue pour sécuriser les infrastructures de transport, bâtiments et villes."
        />
        <meta property="og:url" content="https://www.diviniti.tech" />
        <meta property="og:type" content="website" />
        <meta
          property="og:image"
          content="https://files.pixecurity.com/wp-content/uploads/sites/2/2024/10/diviniti-logo-gradient.png"
        />
        <meta property="og:locale" content="fr_FR" />
        <meta property="og:site_name" content="Diviniti" /> */}

        {/* Favicon */}
        {/* <link
          rel="icon"
          href="http://files.pixecurity.com/wp-content/uploads/sites/2/2024/10/diviniti-logo-gradient.png"
        /> */}

        {/* Google Fonts */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap"
        />
        <link
          href="https://fonts.cdnfonts.com/css/quicksand"
          rel="stylesheet"
        />
        <link
          href="https://fonts.cdnfonts.com/css/cinzel"
          rel="stylesheet"
        ></link>

        <link
          href="https://fonts.cdnfonts.com/css/fauna-one"
          rel="stylesheet"
        ></link>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
        />
        <link href="https://fonts.cdnfonts.com/css/barlow" rel="stylesheet" />

        {/* Font Awesome */}
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"
        />

        {/* Google Tag Manager */}
        {/* <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){
                w[l]=w[l]||[];
                w[l].push({'gtm.start':
                new Date().getTime(),event:'gtm.js'});
                var f=d.getElementsByTagName(s)[0],
                j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';
                j.async=true;
                j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
                f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-TXS5MXDB');
            `,
          }}
        /> */}
        {/* End Google Tag Manager */}
      </Head>
      <body>
        {/* Google Tag Manager (noscript) */}
        {/* <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-TXS5MXDB"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
            title="Google Tag Manager"
          ></iframe>
        </noscript> */}
        {/* End Google Tag Manager (noscript) */}

        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
