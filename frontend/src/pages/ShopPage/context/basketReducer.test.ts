import type { BasketEntry } from '../../../interfaces/basket.interfaces';
import type { Product } from '../../../interfaces/product.interfaces';
import { basketReducer } from './basketReducer';

describe('basketReducer', () => {
  describe('ADD', () => {
    it('add a new product with quantity 1', () => {
      const product = makeProduct(1);
      const state = basketReducer([], { type: 'ADD', product });

      expect(state).toHaveLength(1);
      expect(state[0]).toEqual({ product, quantity: 1 });
    });

    it('add the same product with quantity 2', () => {
      const product = makeProduct(1);
      const initial: BasketEntry[] = [{ product, quantity: 2 }];

      const state = basketReducer(initial, { type: 'ADD', product });

      expect(state).toHaveLength(1);
      expect(state[0]).toEqual({ product, quantity: 3 });
    });

    it('add two products', () => {
      const product1 = makeProduct(1);
      const product2 = makeProduct(2);

      const initial: BasketEntry[] = [{ product: product1, quantity: 1 }];

      const state = basketReducer(initial, { type: 'ADD', product: product2 });

      expect(state).toHaveLength(2);
      expect(state[0]).toEqual({ product: product1, quantity: 1 });
      expect(state[1]).toEqual({ product: product2, quantity: 1 });
    });
  });

  describe('REMOVE', () => {
    it('remove a product', () => {
      const product1 = makeProduct(1);
      const product2 = makeProduct(2);

      const initial: BasketEntry[] = [
        { product: product1, quantity: 1 },
        { product: product2, quantity: 3 },
      ];

      const state = basketReducer(initial, { type: 'REMOVE', productId: 1 });

      expect(state).toHaveLength(1);
      expect(state[0].product.id).toBe(2);
    });

    it('leave basket unchanged when product is not found', () => {
      const product1 = makeProduct(1);

      const initial: BasketEntry[] = [{ product: product1, quantity: 1 }];

      const state = basketReducer(initial, { type: 'REMOVE', productId: 99 });

      expect(state).toHaveLength(1);
      expect(state[0].product.id).toBe(1);
    });
  });

  describe('CLEAR', () => {
    it('remove a product', () => {
      const product1 = makeProduct(1);
      const product2 = makeProduct(2);

      const initial: BasketEntry[] = [
        { product: product1, quantity: 1 },
        { product: product2, quantity: 3 },
      ];

      const state = basketReducer(initial, { type: 'CLEAR' });
      expect(state).toEqual([]);
    });
  });

  const makeProduct = (id: number): Product => {
    return {
      id,
      name: `Product ${id}`,
      description: 'Description',
      price: 9.99,
      category: 'Category',
      brand: 'Brand',
      stock: 5,
      imageUrl: 'imageUrl',
    };
  };
});
