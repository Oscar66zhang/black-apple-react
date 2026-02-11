import { useContext, useEffect, useState } from "react";
import { ShoppingCartContext } from "@/contexts/shoppingCart";

const ShoppingCart = () => {
  const { cartItems } = useContext(ShoppingCartContext);
  const [total, setToal] = useState(0);

  useEffect(() => {
    const total = cartItems.reduce(
      (acc, item) =>
        acc +
        ((item.modelPrice ?? 0) + (item.memorySizePrice ?? 0)) *
          (item.qty ?? 0),
      0,
    );
    setToal(total);
  }, [cartItems]);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold mb-4">购物车</h1>
      <h2>购物车 ¥{total.toLocaleString()}</h2>
      <p className="text-gray-600">{JSON.stringify(cartItems)}</p>
    </div>
  );
};

export default ShoppingCart;
