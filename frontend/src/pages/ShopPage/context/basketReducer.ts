import type { BasketEntry } from '../../../interfaces/basket.interfaces';
import type { Product } from '../../../interfaces/product.interfaces';

export type Action =
  | { type: 'ADD'; product: Product }
  | { type: 'REMOVE'; productId: number }
  | { type: 'CLEAR' };

export const basketReducer = (state: BasketEntry[], action: Action): BasketEntry[] => {
  switch (action.type) {
    case 'ADD': {
      const existing = state.find((entry) => entry.product.id === action.product.id);
      if (existing) {
        return state.map((entry) =>
          entry.product.id === action.product.id
            ? { ...entry, quantity: entry.quantity + 1 }
            : entry
        );
      }
      return [...state, { product: action.product, quantity: 1 }];
    }
    case 'REMOVE':
      return state.filter((e) => e.product.id !== action.productId);
    case 'CLEAR':
      return [];
  }
};
