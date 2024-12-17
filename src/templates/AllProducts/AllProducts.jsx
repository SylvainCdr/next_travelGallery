import { useEffect, useState } from 'react';
import styles from './style.module.scss';
import ProductCard from '@/components/productCard/productCard';

export default function AllProducts() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Récupérer le fichier XML
    fetch('/productFeed/alidump.xml')
      .then((response) => response.text()) // Lire le fichier comme texte brut
      .then((data) => {
        // Parser le fichier XML en DOM
        const parser = new DOMParser();
        const xml = parser.parseFromString(data, 'application/xml');

        // Extraire les offres
        const offers = Array.from(xml.getElementsByTagName('offer')).map((offer) => ({
          id: offer.getAttribute('id'),
          name: offer.getElementsByTagName('name')[0]?.textContent || '',
          category: offer.getElementsByTagName('category')[0]?.textContent || '',
          picture: offer.getElementsByTagName('picture')[0]?.textContent || '',
          price: offer.getElementsByTagName('price')[0]?.textContent || '',
          oldprice: offer.getElementsByTagName('oldprice')[0]?.textContent || '',
          url: offer.getElementsByTagName('url')[0]?.textContent || '',
        }));

        setProducts(offers);

        // Extraire les catégories uniques
        const uniqueCategories = [
          ...new Set(offers.map((offer) => offer.category).filter((cat) => cat)),
        ];
        setCategories(uniqueCategories);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Erreur lors de la récupération du fichier XML :', error);
        setLoading(false);
      });
  }, []);

  // Filtrer les produits selon la catégorie sélectionnée
  const filteredProducts = selectedCategory
    ? products.filter((product) => product.category === selectedCategory)
    : products;

  if (loading) {
    return <p>Loading products...</p>;
  }

  return (
    <div className={styles.homeContainer}>
      <h1>Discover the hottest deals on Aliexpress</h1>

      {/* Menu de filtrage par catégorie */}
      <div className={styles.filterMenu}>
        <label htmlFor="categorySelect">Filter by Categories : </label>
        <select
          id="categorySelect"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">All Products</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      {/* Liste des produits */}
      <div className={styles.productsList}>
        {filteredProducts.map((product) => (
     
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
