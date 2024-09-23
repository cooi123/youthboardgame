import {Card, CardHeader, CardBody} from "@nextui-org/card";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
} from "@nextui-org/table";
import {Input} from "@nextui-org/input";
import {Button} from "@nextui-org/button";
import {useState} from "react";

import {useItem} from "@/hooks/useItem";
import {useEffect} from "react";
import {Item} from "@/types/index";
export function ItemManagement() {
  const {items, updateItems, fetchItems} = useItem();
  console.log(items);

  const [localItems, setLocalItems] = useState<Item[]>([]);
  useEffect(() => {
    fetchItems();
  }, []); // Empty dependency array ensures this runs only once

  // Update localItems when the items from API change
  useEffect(() => {
    if (items.length > 0) {
      setLocalItems(items);
    }
  }, [items]); // Only re-run when `items` changes

  const handleItemPriceChange = (itemId: number, newPrice: number) => {
    console.log("newPrice", newPrice);
    setLocalItems(
      items.map((item) =>
        item.id === itemId ? {...item, price: newPrice} : item
      )
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardHeader>Item Management</CardHeader>
      </CardHeader>
      <CardBody>
        <Table>
          <TableHeader>
            <TableColumn>Item Name </TableColumn>
            <TableColumn>Item Description</TableColumn>
            <TableColumn>Item Price</TableColumn>
          </TableHeader>
          <TableBody>
            {localItems.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.description}</TableCell>
                <TableCell>
                  <Input
                    type="number"
                    value={item.price.toString()}
                    onChange={(e) =>
                      handleItemPriceChange(item.id, parseInt(e.target.value))
                    }
                    className="w-20"
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Button
          className="mt-4"
          color="success"
          onClick={() => updateItems(localItems)}
        >
          Save Changes
        </Button>
      </CardBody>
    </Card>
  );
}
