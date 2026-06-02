import { useContext } from 'react';
import { BasketContext, type BasketContextValue } from '../context/BasketContext';

export const useBasket = (): BasketContextValue => {
  const ctx = useContext(BasketContext);
  if (!ctx) throw new Error('useBasket must be used inside BasketProvider');
  return ctx;
};
