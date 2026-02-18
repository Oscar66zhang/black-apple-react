import { CartItem } from "@/types/custom";
import { createContext } from "react";

interface ShoppingCartContextType {
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (index: number) => void;
  updateItem: (index: number, newItem: CartItem) => void;
  clearCart: () => void;
}

const defaultShoppingCartContext: ShoppingCartContextType = {
  cartItems: [],
  addToCart: () => {},
  removeFromCart: () => {},
  updateItem: () => {},
  clearCart: () => {},
};

const ShoppingCartContext = createContext<ShoppingCartContextType>(
  defaultShoppingCartContext,
);

export default ShoppingCartContext;
