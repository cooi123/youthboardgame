import { useState } from 'react';

export function useLocalStorage() {
    const [value, setValue] = useState<string | null>(null);

    const setItem = (key: string, value: string) => {
        try {
            window.localStorage.setItem(key, value);
        } catch (e) {
            console.error("Failed to save to local storage", e);
        }
    };

    const getItem = (key: string) => {
        const value = window.localStorage.getItem(key);
        setValue(value);
        return value;
    };

    const removeItem = (key: string) => {
        window.localStorage.removeItem(key);
        setValue(null);
    };

    return { value, setItem, getItem, removeItem };
}