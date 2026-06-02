import { createContext } from 'react';
import type { Product } from '../../../interfaces/product.interfaces';
import type { BasketEntry } from '../../../interfaces/basket.interfaces';

export interface BasketContextValue {
  entries: BasketEntry[];
  totalItems: number;
  totalPrice: number;
  addToBasket: (product: Product) => void;
  removeFromBasket: (productId: number) => void;
  clearBasket: () => void;
}

export const BasketContext = createContext<BasketContextValue | null>(null);
