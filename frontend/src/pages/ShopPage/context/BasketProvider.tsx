import { useEffect, useReducer, type ReactNode } from 'react';

import { basketReducer } from './basketReducer';
import { loadBasket, saveBasket } from '../../../storage/storage';
import { BasketContext } from './BasketContext';

export const BasketProvider = ({ children }: { children: ReactNode }) => {
  const [entries, dispatch] = useReducer(basketReducer, undefined, loadBasket);

  useEffect(() => {
    saveBasket(entries);
  }, [entries]);

  const totalItems = entries.reduce((sum, entry) => sum + entry.quantity, 0);
  const totalPrice = entries.reduce((sum, entry) => sum + entry.quantity * entry.product.price, 0);

  return (
    <BasketContext.Provider
      value={{
        entries,
        totalItems,
        totalPrice,
        addToBasket: (product) => dispatch({ type: 'ADD', product }),
        removeFromBasket: (productId) => dispatch({ type: 'REMOVE', productId }),
        clearBasket: () => dispatch({ type: 'CLEAR' }),
      }}
    >
      {children}
    </BasketContext.Provider>
  );
};
