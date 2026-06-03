import { useState, useEffect } from 'react';

import { useAbortableAction } from '../../../hooks/useAbortableAsync';
import type { Product } from '../../../interfaces/product.interfaces';
import { fetchProducts } from '../../../api/products.api';
import { useDebounce } from '../../../hooks/useDebounce';

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 200);
  const [selectedCategory, setSelectedCategory] = useState('');
  const { loading, error, run } = useAbortableAction<Product[]>({ initialLoading: true });

  useEffect(() => {
    void (async () => {
      setProducts([]);
      const data = await run((signal) => fetchProducts(debouncedSearch, selectedCategory, signal));
      if (data) setProducts(data);
    })();
  }, [debouncedSearch, selectedCategory, run]);

  return { products, loading, error, search, setSearch, selectedCategory, setSelectedCategory };
};
