import { useState, useEffect } from 'react';

import { useAbortableAction } from '../../../hooks/useAbortableAsync';
import { fetchCategories } from '../../../api/products.api';

export const useCategories = () => {
  const [categories, setCategories] = useState<string[]>([]);
  const { loading, error, run } = useAbortableAction<string[]>({ initialLoading: true });

  useEffect(() => {
    void (async () => {
      const data = await run((signal) => fetchCategories(signal));
      if (data) setCategories(data);
    })();
  }, [run]);

  return { categories, loading, error };
};
