import ShoppingCartContext from "./ShoppingCartContext";
import { useState } from "react";
import { CartItem } from "@/types/custom";

interface ShoppingCartProviderProps {
  children: React.ReactNode;
}

const ShoppingCartProvider = ({ children }: ShoppingCartProviderProps) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addToCart = (item: CartItem) => {
    const existingItemIndex = cartItems.findIndex(
      (cartItem) => cartItem.productId === item.productId
    );
    if (existingItemIndex !== -1) {
      // If the item already exists, update the quantity
      setCartItems((prevItems) => [
        ...prevItems.slice(0, existingItemIndex),
        {
          ...prevItems[existingItemIndex],
          quantity: (prevItems[existingItemIndex]?.qty ?? 0) + 1,
        },
        ...prevItems.slice(existingItemIndex + 1),
      ]);
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
