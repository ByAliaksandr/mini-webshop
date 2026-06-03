import { memo } from 'react';
import type { Product } from '../../../../interfaces/product.interfaces';
import { ProductCard } from './ProductCard';
import styles from './ProductGrid.module.scss';

type Props = {
  products: Product[];
  loading: boolean;
  error: string | null;
};

export const ProductGrid = memo(({ products, loading, error }: Props) => {
  if (loading) {
    return (
      <div className={styles.grid}>
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className={styles.skeleton} aria-hidden="true" />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.message}>
        <p className={styles.errorText}>{error}</p>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className={styles.message}>
        <p>No products match your search.</p>
      </div>
    );
  }

  return (
    <div className={styles.grid}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
});
