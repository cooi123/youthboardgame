"use client";
import {useState} from "react";
import {ShoppingCart, Minus, Plus, Trash2} from "lucide-react";
import {Button} from "@nextui-org/button";
import {Item} from "@/types/index";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/modal";
import {useItem} from "@/hooks/useItem";
import {useAuth} from "@/hooks/useAuth";
interface CartItem {
  item: Item;
  quantity: number;
}

export default function GameItems() {
  const {user} = useAuth();

  const {items: shopItems} = useItem();
  const [userBalance, setUserBalance] = useState(user?.points || 0);
  const [cart, setCart] = useState<CartItem[]>([]);

  const handleBuyItem = (item: Item) => {
    if (userBalance >= item.price) {
      setUserBalance((prevBalance) => prevBalance - item.price);
      setCart((prevCart) => {
        const existingItem = prevCart.find(
          (cartItem) => cartItem.item.id === item.id
        );
        if (existingItem) {
          return prevCart.map((cartItem) =>
            cartItem.item.id === item.id
              ? {...cartItem, quantity: cartItem.quantity + 1}
              : cartItem
          );
        }
        return [...prevCart, {item, quantity: 1}];
      });
    } else {
      alert("You don't have enough balance to buy this item.");
    }
  };
  const removeFromCart = (itemId: number) => {
    const item = shopItems.find((item) => item.id === itemId) as Item;
    const quantity =
      cart.find((cartItem) => cartItem.item.id === itemId)?.quantity || 1;
    setCart((prevCart) =>
      prevCart.filter((cartItem) => cartItem.item.id !== itemId)
    );
    setUserBalance((prevBalance) => prevBalance + item.price * quantity);
  };

  const updateQuantity = (itemId: number, newQuantity: number) => {
    const existingItem = cart.find((cartItem) => cartItem.item.id === itemId);
    const difference = (existingItem?.quantity || 1) - newQuantity;
    const newBalance =
      userBalance +
        difference * shopItems.find((item) => item.id === itemId)?.price || 0;
    if (newBalance < 0) {
      alert("You don't have enough balance to buy this item.");
      return;
    }
    if (newQuantity < 1) {
      removeFromCart(itemId);
    } else {
      const item = shopItems.find((item) => item.id === itemId) as Item;

      setCart((prevCart) =>
        prevCart.map((cartItem) =>
          cartItem.item.id === itemId
            ? {...cartItem, quantity: newQuantity}
            : cartItem
        )
      );
      setUserBalance(newBalance);
    }
  };
  const getTotalPrice = () => {
    return cart.reduce(
      (total, cartItem) => total + cartItem.item.price * cartItem.quantity,
      0
    );
  };

  const addToLocalStorage = (cart: CartItem[]) => {
    const order = localStorage.getItem("cart") || "[]";
    const parsedOrder = JSON.parse(order);
    const newOrder = [...parsedOrder, ...cart];
    localStorage.setItem("cart", JSON.stringify(newOrder));
    // setCart([]);
  };

  const {isOpen, onOpenChange, onClose, onOpen} = useDisclosure();
  const modalPlacement = "center";
  return (
    <div className="flex justify-center items-center py-6">
      <div className="w-[600px] bg-gray-100 shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Shop</h2>

        <div className="mb-4">
          <p className="text-lg font-bold text-gray-700">
            Your Balance: ${userBalance}
          </p>
        </div>

        <ul className="space-y-4 mb-4">
          {shopItems.map((item) => (
            <li key={item.id} className="bg-white p-4 rounded-lg shadow">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold text-gray-700">
                  {item.name}
                </h3>
                <p className="text-gray-800 font-bold">${item.price}</p>
                <button
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                  onClick={() => handleBuyItem(item)}
                >
                  Buy
                </button>
              </div>
            </li>
          ))}
        </ul>

        <div className="mt-8">
          <h2 className="text-xl font-bold mb-4">Shopping Cart</h2>
          {cart.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            <div>
              {cart.map((cartItem) => (
                <div
                  key={cartItem.item.id}
                  className="flex items-center justify-between border-b py-2"
                >
                  <div>
                    <p className="font-semibold">{cartItem.item.name}</p>
                    <p className="text-sm text-gray-600">
                      {cartItem.item.price} Gold each
                    </p>
                  </div>
                  <div className="flex items-center">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() =>
                        updateQuantity(cartItem.item.id, cartItem.quantity - 1)
                      }
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="mx-2">{cartItem.quantity}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() =>
                        updateQuantity(cartItem.item.id, cartItem.quantity + 1)
                      }
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="destructive"
                      size="icon"
                      className="ml-2"
                      onClick={() => removeFromCart(cartItem.item.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
              <div className="mt-4 flex justify-between items-center">
                <p className="text-xl font-bold">
                  Total Spending: {getTotalPrice()}
                </p>
                <Button
                  onPress={onOpen}
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  <ShoppingCart className="h-5 w-5" />
                  Checkout
                </Button>
              </div>
            </div>
          )}
        </div>

        <Modal
          isOpen={isOpen}
          placement={modalPlacement}
          onOpenChange={onOpenChange}
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  Purchase
                </ModalHeader>
                <ModalBody>
                  <p>
                    Please show this to the team leader to confirm your
                    purchase.
                  </p>
                  <div className="grid gap-4 py-4">
                    {cart.map((cartItem) => (
                      <div
                        key={cartItem.item.id}
                        className="flex justify-between items-center"
                      >
                        <label
                          htmlFor={`item-${cartItem.item.id}`}
                          className="font-semibold"
                        >
                          {cartItem.item.name}
                        </label>
                        <input
                          id={`item-${cartItem.item.id}`}
                          value={`${cartItem.quantity} x ${
                            cartItem.item.price
                          } = ${cartItem.quantity * cartItem.item.price} Gold`}
                          className="w-[180px]"
                          readOnly
                        />
                      </div>
                    ))}
                    <div className="flex justify-between items-center">
                      <label className="font-bold">Total</label>
                      <input
                        value={`${getTotalPrice()} Gold`}
                        className="w-[180px]"
                        readOnly
                      />
                    </div>
                  </div>
                </ModalBody>
                <ModalFooter>
                  <Button
                    color="danger"
                    variant="light"
                    onPress={onClose}
                    onClick={() => addToLocalStorage(cart)}
                  >
                    Close
                  </Button>
                  {/* <Button
                    color="primary"
                    onPress={onClose}
                    className="rounded"
                    onClick={() => addToLocalStorage(cart)}
                  >
                    Save
                  </Button> */}
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </div>
    </div>
  );
}
