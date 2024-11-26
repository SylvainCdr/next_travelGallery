/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export', // Activer l'export statique
    images: {
      unoptimized: true,  // Désactive l'optimisation des images
    },
  };
  
  export default nextConfig;
  