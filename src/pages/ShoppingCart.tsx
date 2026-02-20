import { useContext, useEffect, useState } from "react";
import { ShoppingCartContext } from "@/contexts/shoppingCart";
import { Button, CartItem } from "@/components";
import { useNavigate } from "react-router-dom";



const ShoppingCart = () => {
  const navigate = useNavigate();
  const { cartItems, updateItem, removeFromCart } =
    useContext(ShoppingCartContext);

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

  const shoppingFee = 150; //假设运费为0，实际应用中可以根据条件计算

  return (
    <div
      className="min-h-screen p-6 pt-30
    max-w-4xl mx-auto bg-apple-light dark:bg-apple-dark
    font-light
    "
    >
      <h2 className="text-4xl">购物车总价¥{total.toLocaleString()}</h2>
      {/*商品列表 */}
      <div className="mb-6">
        {cartItems.map((item, index) => (
          <CartItem
            item={item}
            key={item.productId}
            onItemUpdate={(qty) => {
              const newItem = { ...item, qty };
              updateItem(index, newItem);
            }}
            onItemRemove={() => removeFromCart(index)}
          />
        ))}
      </div>
      {/* 结算区域*/}
      <div className="ml-12 pt-2 space-y-4">
        <div className="grid grid-cols-2 items-center">
          <p className="text-center">小计:</p>
          <p className="text-right">RMB {total.toLocaleString()}</p>
          <p className="text-center">运费:</p>
          <p className="text-right">RMB {shoppingFee.toLocaleString()}</p>
        </div>
        <hr
          className="ml-8 border-t 
        border-apple-gray-200 dark:border-apple-gray-800"
        />
        <div className="grid grid-cols-2 items-center">
          <p className="text-center text-2xl">总计:</p>
          <p className="text-right text-2xl">
            RMB {(total + shoppingFee).toLocaleString()}
          </p>
          <div className="col-span-2 flex justify-end mt-12">
            <Button title="结账" onClick={() => navigate("/checkout")} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;
