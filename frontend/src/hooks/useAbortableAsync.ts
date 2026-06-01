import { useCallback, useEffect, useRef, useState } from 'react';

export const useAbortableAction = <T>({ initialLoading = false } = {}) => {
  const [loading, setLoading] = useState(initialLoading);
  const [error, setError] = useState<string | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  useEffect(() => {
    return () => {
      abortControllerRef.current?.abort();
    };
  }, []);

  const run = useCallback(
    async (asyncFn: (signal: AbortSignal) => Promise<T>): Promise<T | null> => {
      abortControllerRef.current?.abort();
      const controller = new AbortController();
      abortControllerRef.current = controller;

      setLoading(true);
      setError(null);

      try {
        const result = await asyncFn(controller.signal);
        return result;
      } catch (err) {
        if (err instanceof DOMException && err.name === 'AbortError') return null;
        setError(err instanceof Error ? err.message : String(err));
        return null;
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    },
    []
  );

  return { loading, error, run };
};
