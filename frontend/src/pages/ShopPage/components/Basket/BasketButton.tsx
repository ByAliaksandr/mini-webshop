import { useBasket } from '../../hooks/useBasket';
import styles from './BasketButton.module.scss';

type Props = {
  onClick: () => void;
};

export const BasketButton = ({ onClick }: Props) => {
  const { totalItems } = useBasket();

  return (
    <button
      className={styles.basketButton}
      onClick={onClick}
      aria-label={`Shopping basket, ${totalItems} items`}
    >
      <span>🛒</span>
      <span>Basket</span>
      {totalItems > 0 && <span className={styles.badge}>{totalItems}</span>}
    </button>
  );
};
