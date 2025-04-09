import { useRef, useEffect } from 'react';

export function useDebouncedCallback<T extends (...args: any[]) => void>(
  callback: T,
  delay: number
): {
  callback: (...args: Parameters<T>) => void;
  flush: () => void;
} {
  const callbackRef = useRef(callback);
  const argsRef = useRef<Parameters<T>>();
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  const debounced = (...args: Parameters<T>) => {
    argsRef.current = args;
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      if (argsRef.current) callbackRef.current(...argsRef.current);
    }, delay);
  };

  const flush = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      if (argsRef.current) {
        callbackRef.current(...argsRef.current);
      }
    }
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return { callback: debounced, flush };
}
