import { useBasket } from '../../hooks/useBasket';
import { usePurchase } from '../../hooks/usePurchase';
import styles from './Basket.module.scss';
import { BasketItem } from './BasketItem';

type Props = {
  open: boolean;
  onClose: () => void;
};

export const Basket = ({ open, onClose }: Props) => {
  const { entries, totalItems, totalPrice } = useBasket();
  const { loading, error, success, handlePurchase, reset } = usePurchase();

  const handleClose = () => {
    reset();
    onClose();
  };

  return (
    <>
      {open && <div className={styles.overlay} onClick={handleClose} aria-hidden="true" />}

      <aside
        className={`${styles.panel} ${open ? styles.open : ''}`}
        aria-label="Shopping basket"
        inert={!open}
      >
        <div className={styles.panelHeader}>
          <h2 className={styles.panelTitle}>
            Basket <span className={styles.count}>({totalItems})</span>
          </h2>
          <button className={styles.closeButton} onClick={handleClose} aria-label="Close basket">
            ✕
          </button>
        </div>

        <div className={styles.content}>
          {success && (
            <div className={styles.success}>
              <p>Purchase successful! Thank you.</p>
            </div>
          )}

          {error && (
            <div className={styles.error}>
              <p>Purchase failed. Please try again.</p>
            </div>
          )}

          {entries.length === 0 && !success ? (
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

        {entries.length > 0 && (
          <div className={styles.footer}>
            <div className={styles.total}>
              <span>Total</span>
              <span className={styles.totalPrice}>&euro;{totalPrice.toFixed(2)}</span>
            </div>
            <button
              className={styles.purchaseButton}
              onClick={() => {
                void handlePurchase();
              }}
              disabled={loading}
            >
              {loading ? 'Processing…' : 'Purchase'}
            </button>
          </div>
        )}
      </aside>
    </>
  );
};
