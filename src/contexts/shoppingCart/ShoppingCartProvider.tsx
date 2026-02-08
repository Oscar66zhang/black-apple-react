import { ShoppingCartContext } from "./shoppingCartContext";
import { useState } from "react";
import { type CartItem } from "@/types/custom";

interface ShoppingCartProviderProps {
  children: React.ReactNode;
}

const ShoppingCartProvider = ({ children }: ShoppingCartProviderProps) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const addToCart = (item: CartItem) => {
    const existingItemIndex = cartItems.findIndex(
      (cartItems) => cartItems.productId == item.productId,
    );
    if (existingItemIndex !== -1) {
      // If the item already exists, update the quantity
      setCartItems((prevItems) => {
        const item = prevItems[existingItemIndex];
        // Ensure we handle the case where item might be undefined (though index check prevents it logically)
        if (!item) return prevItems;

        const updatedItem: CartItem = {
          ...item,
          qty: (item.qty ?? 0) + 1,
        };

        return [
          ...prevItems.slice(0, existingItemIndex),
          updatedItem,
          ...prevItems.slice(existingItemIndex + 1),
        ];
      });
    } else {
      // If the item does not exist, add it to the cart
      setCartItems((prevItems) => [...prevItems, item]);
    }
  };

  const removeFromCart = (index: number) => {
    setCartItems((prevItems) => [
      ...prevItems.slice(0, index),
      ...prevItems.slice(index + 1),
    ]);
  };

  return (
    <ShoppingCartContext.Provider
      value={{ cartItems, addToCart, removeFromCart }}
    >
      {children}
    </ShoppingCartContext.Provider>
  );
};

export default ShoppingCartProvider;
