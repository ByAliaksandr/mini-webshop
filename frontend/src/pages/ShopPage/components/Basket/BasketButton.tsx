import styles from './BasketButton.module.scss';

type Props = {
  onClick: () => void;
};

export const BasketButton = ({ onClick }: Props) => {
  // TODO update
  const totalItems = 12;

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
