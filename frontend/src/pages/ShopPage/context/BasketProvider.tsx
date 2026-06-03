import { useCallback, useEffect, useMemo, useReducer, type ReactNode } from 'react';

import { basketReducer } from './basketReducer';
import { loadBasket, saveBasket } from '../../../storage/storage';
import { BasketContext } from './BasketContext';
import type { Product } from '../../../interfaces/product.interfaces';

export const BasketProvider = ({ children }: { children: ReactNode }) => {
  const [entries, dispatch] = useReducer(basketReducer, undefined, loadBasket);

  useEffect(() => {
    saveBasket(entries);
  }, [entries]);

  const totalItems = entries.reduce((sum, entry) => sum + entry.quantity, 0);
  const totalPrice = entries.reduce((sum, entry) => sum + entry.quantity * entry.product.price, 0);

  const addToBasket = useCallback((product: Product) => dispatch({ type: 'ADD', product }), []);
  const removeFromBasket = useCallback(
    (productId: number) => dispatch({ type: 'REMOVE', productId }),
    []
  );
  const clearBasket = useCallback(() => dispatch({ type: 'CLEAR' }), []);

  const value = useMemo(
    () => ({ entries, totalItems, totalPrice, addToBasket, removeFromBasket, clearBasket }),
    [entries, totalItems, totalPrice, addToBasket, removeFromBasket, clearBasket]
  );

  return <BasketContext.Provider value={value}>{children}</BasketContext.Provider>;
};
