import type { BasketEntry } from '../interfaces/basket.interfaces';

const STORAGE_BASKET_KEY = 'webshop-basket-key';

export const loadBasket = (): BasketEntry[] => {
  try {
    const data = localStorage.getItem(STORAGE_BASKET_KEY);
    if (!data) return [];

    const entries = JSON.parse(data);

    return Array.isArray(entries) ? entries : [];
  } catch {
    return [];
  }
};

export const saveBasket = (entries: BasketEntry[]): void => {
  localStorage.setItem(STORAGE_BASKET_KEY, JSON.stringify(entries));
};
