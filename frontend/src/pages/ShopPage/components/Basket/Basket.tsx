import { useBasket } from '../../hooks/useBasket';
import styles from './Basket.module.scss';
import { BasketItem } from './BasketItem';

type Props = {
  open: boolean;
  onClose: () => void;
};

export const Basket = ({ open, onClose }: Props) => {
  const { entries, totalItems } = useBasket();

  const handleClose = () => {
    onClose();
  };

  return (
    <>
      {open && <div className={styles.overlay} onClick={handleClose} aria-hidden="true" />}

      <aside className={`${styles.panel} ${open ? styles.open : ''}`} aria-label="Shopping basket">
        <div className={styles.panelHeader}>
          <h2 className={styles.panelTitle}>
            Basket <span className={styles.count}>({totalItems})</span>
          </h2>
          <button className={styles.closeButton} onClick={handleClose} aria-label="Close basket">
            ✕
          </button>
        </div>

        <div className={styles.content}>
          {entries.length === 0 ? (
            <div className={styles.empty}>
              <p>Your basket is empty.</p>
            </div>
          ) : (
            <ul className={styles.list}>
              {entries.map((entry) => (
                <BasketItem key={entry.product.id} entry={entry}></BasketItem>
              ))}
            </ul>
          )}
        </div>
      </aside>
    </>
  );
};
