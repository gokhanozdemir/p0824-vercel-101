import { useState, useEffect } from 'react';

export default function useLocalStorage(key, defaultValue) {
  const [value, setValue] = useState(() => {
    const storedValue = localStorage.getItem(key);
    if (storedValue) {
      return JSON.parse(storedValue);
    }
    return defaultValue;
  });

  const setToLocalStorage = (data, noNotUseLocalStorage = false) => {
    setValue(data);
    if(!noNotUseLocalStorage) localStorage.setItem(key, JSON.stringify(data));
    if(data == undefined) localStorage.removeItem(key)
  };
  // use setValue only if you do not want to update the local storage
  return [value, setToLocalStorage];
}
