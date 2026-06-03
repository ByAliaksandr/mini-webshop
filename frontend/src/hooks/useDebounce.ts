import { useEffect, useState } from 'react';

export const useDebounce = <T>(value: T, delayMs: number) => {
  const [debaunced, setDebaunced] = useState(value);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebaunced(value);
    }, delayMs);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [delayMs, value]);

  return debaunced;
};
