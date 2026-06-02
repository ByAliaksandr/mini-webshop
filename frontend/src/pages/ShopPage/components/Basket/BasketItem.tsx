import type { BasketEntry } from '../../../../interfaces/basket.interfaces';
import { useBasket } from '../../hooks/useBasket';
import styles from './BasketItem.module.scss';

type Props = {
  entry: BasketEntry;
};

export const BasketItem = ({ entry }: Props) => {
  const { removeFromBasket } = useBasket();
  const { product, quantity } = entry;

  return (
    <li className={styles.item}>
      <img className={styles.image} src={product.imageUrl} alt={product.name} />

      <div className={styles.details}>
        <p className={styles.name}>{product.name}</p>
        <p className={styles.meta}>
          <span className={styles.quantity}>×{quantity}</span>
          <span className={styles.price}>&euro;{(product.price * quantity).toFixed(2)}</span>
        </p>
      </div>

      <button
        className={styles.removeButton}
        onClick={() => removeFromBasket(product.id)}
        aria-label={`Remove ${product.name}`}
      >
        Delete
      </button>
    </li>
  );
};
