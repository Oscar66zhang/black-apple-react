import ShoppingCartContext from "./ShoppingCartContext";
import { useState, useEffect, useReducer } from "react";
import { CartItem, ShoppingCart } from "@/types/custom";
import useLocalStorage from "@/hooks/useLocalStorage";
import shoppingCartReducer, {
  addItem,
  removeItem,
  updateItem as updateCartItem,
  clearCart as clearCartItem,
} from "@/reducers/shoppingCartReducer";
import usePresistedReducer from "@/hooks/usePresistedReducer";
import useShoppingCartAction from "@/hooks/useShoppingCartAction";
import useApiData from "@/hooks/useApiData";

interface ShoppingCartProviderProps {
  children: React.ReactNode;
}

const ShoppingCartProvider = ({ children }: ShoppingCartProviderProps) => {
  const { data: shoppingCartData, fetchData } = useApiData<ShoppingCart>(
    "http://152.136.182.210:12231/api/ShoppingCart",
    { autoFetch: false },
  );
  // 1.app 启动，读取本地购物车
  const [cartItems, dispatch] = usePresistedReducer(
    shoppingCartReducer,
    "shoppingCart",
    [],
  );

  // 2. 若用户已登录，有 jwt
  const [jwt] = useState(() => localStorage.getItem("token") || "");

  // 3. 从后端获取购物车信息
  useEffect(() => {
    if (jwt) {
      fetchData({
        overrideHeaders: {
          Authorization: `Bearer ${jwt}`,
        },
      });
    }
  }, [jwt]);

  // 4. 用后端数据覆盖本地 (localStorage) 数据
  useEffect(() => {
    if (shoppingCartData) {
      //同步(覆盖)购物车
      syncCart(shoppingCartData.items);
    }
  }, [shoppingCartData]);

  // 5. 保持购物车同步: addToCart, removeFromCart, updateItem, clearCart, syncCart
  const { addToCart, removeFromCart, updateItem, clearCart, syncCart } =
    useShoppingCartAction(dispatch);

  return (
    <ShoppingCartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, updateItem, clearCart }}
    >
      {children}
    </ShoppingCartContext.Provider>
  );
};

export default ShoppingCartProvider;
