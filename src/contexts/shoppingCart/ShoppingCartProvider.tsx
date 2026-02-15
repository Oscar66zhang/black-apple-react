import ShoppingCartContext from "./ShoppingCartContext";
import { useState, useEffect } from "react";
import { CartItem } from "@/types/custom";

interface ShoppingCartProviderProps {
  children: React.ReactNode;
}

const ShoppingCartProvider = ({ children }: ShoppingCartProviderProps) => {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    if (cartItems.length > 0) {
      localStorage.setItem("cart", JSON.stringify(cartItems));
    } else {
      localStorage.removeItem("cart");
    }
  }, [cartItems]);

  const addToCart = (item: CartItem) => {
    const existingItemIndex = cartItems.findIndex(
      (cartItem) => cartItem.productId === item.productId,
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

  const updateItem = (index: number, newItem: CartItem) => {
    setCartItems((prevItems) => {
      if (index < 0 || index >= prevItems.length) {
        console.error("Index out of bounds");
        return prevItems;
      }
      return [
        ...prevItems.slice(0, index),
        newItem,
        ...prevItems.slice(index + 1),
      ];
    });
  };

  return (
    <ShoppingCartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, updateItem }}
    >
      {children}
    </ShoppingCartContext.Provider>
  );
};

export default ShoppingCartProvider;
