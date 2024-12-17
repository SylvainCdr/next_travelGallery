import styles from './style.module.scss';

export default function ProductCard({ product }) {
  return (
    <div className={styles.productCard}>
      <div className={styles.imageContainer}>
        <img src={product.picture} alt={product.name} className={styles.productImage} />
      </div>
      <div className={styles.productDetails}>
        <h2 className={styles.productName}>{product.name}</h2>
        <p className={styles.productCategory}>Category : {product.category}</p>
        <div className={styles.priceSection}>
          <p className={styles.currentPrice}>{product.price} USD</p>
          {product.oldprice && (
            <p className={styles.oldPrice}>
              <del>{product.oldprice} USD</del>
            </p>
          )}
        </div>
        <a href={product.url} target="_blank" rel="noopener noreferrer" className={styles.productLink}>
          See product
        </a>
      </div>
    </div>
  );
}
