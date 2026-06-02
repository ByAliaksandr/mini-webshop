import { useState } from 'react';
import { useAbortableAction } from '../../../hooks/useAbortableAsync';
import { useBasket } from './useBasket';
import { submitPurchase } from '../../../api/purchase.api';

export const usePurchase = () => {
  const { entries, clearBasket } = useBasket();
  const { loading, error, run, reset: resetAction } = useAbortableAction<void>();
  const [success, setSuccess] = useState(false);

  const handlePurchase = async () => {
    if (entries.length === 0) return;
    const result = await run((signal) =>
      submitPurchase(
        {
          items: entries.map((entry) => ({
            productId: entry.product.id,
            quantity: entry.quantity,
          })),
        },
        signal
      )
    );
    if (result !== null) {
      clearBasket();
      setSuccess(true);
    }
  };

  const reset = () => {
    setSuccess(false);
    resetAction();
  };

  return { loading, error, success, handlePurchase, reset };
};
