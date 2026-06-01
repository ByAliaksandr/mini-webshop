import type { Product } from '../../../../interfaces/product.interfaces';
import styles from './ProductCard.module.scss';

type Props = {
  product: Product;
};

export const ProductCard = ({ product }: Props) => {
  return (
    <article className={styles.card}>
      <div className={styles.imageWrapper}>
        <img className={styles.image} src={product.imageUrl} alt={product.name} loading="lazy" />
        <span className={styles.category}>{product.category}</span>
      </div>

      <div className={styles.content}>
        <p className={styles.brand}>{product.brand}</p>
        <h2 className={styles.name}>{product.name}</h2>
        <p className={styles.description}>{product.description}</p>

        <div className={styles.footer}>
          <div className={styles.priceRow}>
            <span className={styles.price}>&euro;{product.price}</span>
            <span className={product.stock > 0 ? styles.inStock : styles.outOfStock}>
              {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
            </span>
          </div>

          <button className={styles.addBtn} disabled={product.stock <= 0}>
            Add to basket
          </button>
        </div>
      </div>
    </article>
  );
};
