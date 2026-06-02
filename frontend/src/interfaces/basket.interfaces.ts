import type { Product } from './product.interfaces';

export interface BasketEntry {
  product: Product;
  quantity: number;
}
