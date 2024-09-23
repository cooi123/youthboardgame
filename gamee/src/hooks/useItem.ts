import { useEffect, useState } from "react";
import { Item } from "../types/index";
import { toast } from "react-toastify";



export function useItem() {
    const BACKENDURL = import.meta.env.VITE_BACKENDURL as string;
    const ITEMURL = `${BACKENDURL}/item`;
    const [items, setItems] = useState<Item[]>([]);

    const fetchItems = async () => {
        console.log("fetching items");
        const fetching = fetch(ITEMURL);

        const response = await fetching;
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
        const fetching = fetch(ITEMURL, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(items),
        });
        toast.promise(fetching, {
            pending: 'Updating',
            success: 'Items updated',
            error: 'Error updating items',
        });
        const response = await fetching;
        if (response.ok) {
            const data = await response.json();
            setItems(data);
        }
    }




    return { items, fetchItems, updateItems };
}