import React from "react";
import SkuSelect from "./SkuSelect";
import { useState, useContext } from "react";
import { produce } from "immer";
import type { Product, CartItem } from "@/types/custom";
import { ShoppingCartContext } from "@/contexts/shoppingCart";
//使用函数柯里化
const updateItem = (updates: Partial<CartItem>) => {
  /*
  produce会帮你创建draft，这个draft是原始状态的代理副本，你可以随意更改
  Immer会追踪你在draft上的所有改动，最后返回一个全新的不可变的对象
  */
  // eslint-disable-next-line no-param-reassign
  return produce((draft) => {
    Object.assign(draft, updates);
  });
};

type ProductHeroProps = {
  product: Product;
  imageUrl: string;
};

const ProductHero = ({ product, imageUrl }: ProductHeroProps) => {
  const { addToCart } = useContext(ShoppingCartContext);
  const [cartItem, setCartItem] = useState<CartItem>({
    productId: product.id,
    name: product.name,
    imageSrc: product.image,
    modelId: null,
    modelPrice: null,
    model: null,
    color: null,
    memorySize: null,
    memorySizeId: null,
    memorySizePrice: null,
    qty: 1,
  });

  const handleAddToCart = () => {
    if (
      !cartItem.model ||
      !cartItem.color ||
      !cartItem.memorySize ||
      !cartItem.modelId ||
      !cartItem.memorySizeId
    ) {
      alert("请选择型号、颜色、储存容量");
      return;
    }
    addToCart(cartItem);
  };

  return (
    <div
      className="flex 
    flex-col 
    lg:flex-row-reverse
    pt-8 mt-4
    md:pt-28 lg:pt-52
    space-y-4
    text-apple-dark
    dark:text-apple-light
    "
    >
      <div className="flex-1 flex justify-center items-center">
        <img
          src={imageUrl}
          className="w-[350px] lg:-mt-32 lg:ml-19"
          title={product.name}
        />
      </div>
      <div className="flex-1 space-y-6 ml-6 md:ml-24">
        <div className="text-4xl font-black md:ml-24">购买{product.name}</div>
        <div className="font-medium md:text-xl">
          RMB{Number(product.startingPrice).toLocaleString("en-US")}
        </div>
        <div className="flex space-x-3">
          <SkuSelect
            placeholder={"型号"}
            options={product.models.map((model) => model.name)}
            onChange={(value) => {
              const selectedModel = product.models.find(
                (model) => model.name === value,
              );
              if (selectedModel)
                setCartItem(
                  updateItem({
                    modelId: selectedModel.id,
                    modelPrice: selectedModel.price,
                    model: selectedModel.name,
                  }),
                );
            }}
            value={cartItem.model}
          />

          <SkuSelect
            placeholder={"颜色"}
            options={product.colors}
            onChange={(value) => {
              setCartItem(updateItem({ color: value as string }));
              console.log(cartItem);
            }}
            value={cartItem.color}
          />

          <SkuSelect
            placeholder={"储存容量"}
            options={product.memorySizes.map((size) => size.name)}
            onChange={(value) => {
              const selectedMemorySize = product.memorySizes.find(
                (size) => size.name === value,
              );
              if (selectedMemorySize) {
                setCartItem(
                  updateItem({
                    memorySizeId: selectedMemorySize.id,
                    memorySizePrice: selectedMemorySize.price,
                    memorySize: selectedMemorySize.name,
                  }),
                );
              }
              console.log(cartItem);
            }}
            value={cartItem.memorySize}
          />
          <button
            className="
            border border-apple-blue
            px-5 py-2 bg-transparent
            rounded-md
            hover:bg-apple-blue
            hover:text-apple-gray-100
          "
            onClick={() => {
              handleAddToCart();
            }}
          >
            加入购物车
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductHero;
