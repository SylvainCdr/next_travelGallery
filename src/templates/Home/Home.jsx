import { useEffect, useState } from 'react';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          'https://gethotproducts-3rlb4imxua-uc.a.run.app/' // Remplacez par l'URL correcte
        );
        const data = await response.json();
        setProducts(data.products);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>Liste des produits</h1>
      <ul>
        {products.map((product, index) => (
          <li key={index}>
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <p>{product.price}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
