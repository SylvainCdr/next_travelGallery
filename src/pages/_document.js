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

      
<meta
  name="description"
  content="Découvrez l'art de la photographie à travers des albums uniques capturant des moments d'émotion, de beauté et d'authenticité. Explorez des galeries variées, du portrait au paysage."
/>
<meta
  name="keywords"
  content="photographie, albums photo, galeries photo, portraits, paysages, art visuel, moments capturés, photographie professionnelle, créativité, esthétique, émotion, beauté, photo artistique"
/>
<meta name="author" content="Sly's Adventure Gallery" />
<meta name="robots" content="index, follow" />

<meta
  property="og:title"
  content="Galerie Photo - Capturez l'émotion à travers l'objectif"
/>
<meta
  property="og:description"
  content="Explorez une collection inspirante de photos uniques, de paysages enchanteurs, de portraits captivants et bien plus. Laissez-vous séduire par la magie de chaque cliché."
/>
<meta property="og:url" content="https://slysadventuregallery.firebaseapp.com/" />
<meta property="og:type" content="website" />
<meta
  property="og:image"
  content="assets/logo.jpg"
/>
<meta property="og:locale" content="fr_FR" />
<meta property="og:site_name" content="Sly's Adventure Gallery" />



        {/* Favicon */}
        <link
          rel="icon"
          href="assets/logo.jpg"
        />

        {/* Google Fonts */}
     
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
