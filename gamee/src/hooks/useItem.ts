import { useEffect, useState } from "react";
import { Item } from "../types/index";
const ITEMURL = "http://localhost:3000/item";

export function useItem() {
    const [items, setItems] = useState<Item[]>([]);

    const fetchItems = async () => {
        console.log("fetching items");
        const response = await fetch(ITEMURL);
        if (response.ok) {
            const data = await response.json();
            setItems(data);
        }
    }

    useEffect(() => {
        fetchItems();
    }, []);

    const updateItems = async (items: Item[]) => {
        console.log(items);
        const response = await fetch(ITEMURL, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(items),
        });
        if (response.ok) {
            const data = await response.json();
            setItems(data);
        }
    }




    return { items, fetchItems, updateItems };
}