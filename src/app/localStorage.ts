import { useSyncExternalStore } from "react";
function subscribe(callback: () => void) {
    window.addEventListener("local-storage-updated", callback);
    return () => {
      window.removeEventListener("local-storage-updated", callback);
    };
  }
  
function getSnapshot(key: string) {
    return localStorage.getItem(key);
}

export const useLocalStorage =(key: string) => {
    const item = useSyncExternalStore(subscribe, () => getSnapshot(key), () => undefined);
    const value = typeof item === "string" ? JSON.parse(item) : null;

    const setItem = (value: unknown) => {
        if (typeof window !== "undefined") {
            window?.localStorage.setItem(key, JSON.stringify(value));
            window.dispatchEvent(new StorageEvent("local-storage-updated"));
          }
        
    }
    
    const getItem = () => {
        if (typeof window !== "undefined") {
            return window?.localStorage.getItem(key);
        }
    }

    return { setItem, getItem, value }
};