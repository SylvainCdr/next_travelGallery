import { useEffect, useState } from "react";
import ProductCard from "@/components/productCard/productCard";
import styles from "./style.module.scss";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function Home() {
  const [phonesProducts, setPhonesProducts] = useState([]);
  const [electronicsProducts, setElectronicsProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [loading, setLoading] = useState(true);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,  // Essayez d'augmenter à 3 pour tester
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,

    responsive: [
      {
        breakpoint: 1300,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 500,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  


  useEffect(() => { 
    setLoading(true); 
    fetch("/productFeed/alidump.xml")
      .then((response) => response.text())
      .then((data) => {
        const parser = new DOMParser();
        const xml = parser.parseFromString(data, "application/xml");
        const offers = Array.from(xml.getElementsByTagName("offer")).map(
          (offer) => ({
            id: offer.getAttribute("id"),
            name: offer.getElementsByTagName("name")[0]?.textContent || "",
            category:
              offer.getElementsByTagName("category")[0]?.textContent || "",
            picture:
              offer.getElementsByTagName("picture")[0]?.textContent || "",
            price: offer.getElementsByTagName("price")[0]?.textContent || "",
            oldprice:
              offer.getElementsByTagName("oldprice")[0]?.textContent || "",
            url: offer.getElementsByTagName("url")[0]?.textContent || "",
          })
        );

        // Filtrer pour "Phones & Telecommunications"
        const phones = offers.filter(
          (offer) => offer.category === "Phones & Telecommunications"
        );
        setPhonesProducts(phones.sort(() => 0.5 - Math.random()).slice(0, 15));

        // Filtrer pour "Consumer Electronics"
        const electronics = offers.filter(
          (offer) => offer.category === "Consumer Electronics"
        );
        setElectronicsProducts(electronics.sort(() => 0.5 - Math.random()).slice(0, 15));

        setLoading(false);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération du fichier XML :", error);
        setLoading(false);
      });
  }, []);


  return (
    <div className={styles.homeContainer}>
      {/* Hero Section */}
     
        <div className={styles.heroContent}>
          <h1>Welcome on Hot Product Hunt</h1>

          <p>Discover the best trending products at unbeatable prices.</p>

          {/* <a href="#products" className={styles.ctaButton}> */}
          <a href="/allproducts" className={styles.ctaButton}>
            Explore products
          </a>
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Aliexpress_logo.svg/2560px-Aliexpress_logo.svg.png"
          alt="aliexpress logo"
          className={styles.aliLogo}
          />
        <img
          src="assets/hph-logo3.jpg"
          alt="hph logo"
          className={styles.hphLogo}
          />
          </div>
     

      {/* Product Section */}
      <div className={styles.productsSection1}>
        <h3> Phones & Telecommunications </h3>

        {loading ? (
          <p>Loading products...</p>
        ) : (
          <Slider {...settings}>
            {phonesProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </Slider>
        )}


  
      </div>

      <div className={styles.productsSection2}>
        <h3> Consumer Electronics </h3>

        {loading ? (
          <p>Loading products...</p>
        ) : (
          <Slider {...settings}>
            {electronicsProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </Slider>
        )}
        </div>
    </div>
  );
}
