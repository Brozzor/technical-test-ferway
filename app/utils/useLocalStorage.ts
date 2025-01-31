import { useState, useEffect } from "react";

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(initialValue);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    try {
      const item = localStorage.getItem(key);
      setValue(item ? JSON.parse(item) : initialValue);
    } catch (error) {
      console.error("Error reading localStorage key:", key, error);
    }
  }, []);

  useEffect(() => {
    if (isClient) {
      try {
        localStorage.setItem(key, JSON.stringify(value));
      } catch (error) {
        console.error("Error saving localStorage key:", key, error);
      }
    }
  }, [key, value, isClient]);

  return [value, setValue] as const;
}