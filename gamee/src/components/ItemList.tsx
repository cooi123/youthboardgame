import {Package} from "lucide-react";

const ItemComponent = ({name, quantity}: {name: string; quantity: number}) => (
  <div className="bg-blue-500 text-secondary-foreground rounded-lg p-2 flex items-center justify-between w-full">
    <div className="flex items-center gap-2">
      <Package className="w-4 h-4" />
      <span>{name}</span>
    </div>
    <span className="font-semibold">x {quantity}</span>
  </div>
);
export function ItemList({items}) {
  return (
    <div className="bg-card text-card-foreground rounded-lg p-4 shadow">
      <h2 className="text-lg font-semibold mb-2 flex items-center gap-2">
        <Package className="w-5 h-5" />
        Items
      </h2>
      <div className="flex flex-col gap-2">
        {items.map((item, index) => (
          <ItemComponent
            key={index}
            name={item.name}
            quantity={item.quantity}
          />
        ))}
      </div>
    </div>
  );
}
