import ShoppingCartContext from "./ShoppingCartContext";
import { useState, useEffect, useReducer } from "react";
import { CartItem } from "@/types/custom";
import useLocalStorage from "@/hooks/useLocalStorage";
import shoppingCartReducer, {
  addItem,
  removeItem,
  updateItem as updateCartItem,
  clearCart as clearCartItem,
} from "@/reducers/shoppingCartReducer";
import usePresistedReducer from "@/hooks/usePresistedReducer";
import useShoppingCartAction from "@/hooks/useShoppingCartAction";

interface ShoppingCartProviderProps {
  children: React.ReactNode;
}

const ShoppingCartProvider = ({ children }: ShoppingCartProviderProps) => {
  // const [cartItems, dispatch] = useReducer(ShoppingCartReducer, []);

  const [cartItems, dispatch] = usePresistedReducer(
    shoppingCartReducer,
    "shoppingCart",
    [],
  );

  const { addToCart, removeFromCart, updateItem, clearCart } = useShoppingCartAction(dispatch);



  return (
    <ShoppingCartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, updateItem, clearCart }}
    >
      {children}
    </ShoppingCartContext.Provider>
  );
};

export default ShoppingCartProvider;
