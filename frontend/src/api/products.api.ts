import type { Product } from '../interfaces/product.interfaces';

const BASE = '/api/products';

export const fetchProducts = async (
  search?: string,
  category?: string,
  signal?: AbortSignal
): Promise<Product[]> => {
  const params = new URLSearchParams();
  if (search) {
    params.set('search', search);
  }
  if (category) {
    params.set('category', category);
  }
  const query = params.toString();

  const res = await fetch(`${BASE}${query ? `?${query}` : ''}`, { signal });
  if (!res.ok) throw new Error(`Failed to fetch products: ${res.status}`);
  return res.json() as Promise<Product[]>;
};

export const fetchCategories = async (signal?: AbortSignal): Promise<string[]> => {
  const res = await fetch(`${BASE}/categories`, { signal });
  if (!res.ok) throw new Error(`Failed to fetch categories: ${res.status}`);
  return res.json() as Promise<string[]>;
};
