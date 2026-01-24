import React from "react";
import SkuSelect from "./SkuSelect";
import { useState } from "react";
const ProductHero = ({ product, imageUrl }) => {
  const [selectedModel, setSelectedModel] = useState();
  const [selectedColor, setSelectedColor] = useState();
  const [selectedMemorySize, setSelectedMemorySize] = useState();
  console.log("ProductHero", selectedColor, selectedColor, selectedMemorySize);
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
        <img src={imageUrl} className="w-[350px] lg:-mt-32 lg:ml-19" />
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
            onChange={setSelectedModel}
            value={selectedModel}
          />

          <SkuSelect
            placeholder={"颜色"}
            options={product.colors}
            onChange={setSelectedColor}
            value={selectedColor}
          />

          <SkuSelect
            placeholder={"储存容量"}
            options={product.memorySizes.map((size) => size.name)}
            onChange={setSelectedMemorySize}
            value={selectedMemorySize}
          />

          <button
            className="
            border
           border-apple-blue
            px-5
            py-2
            bg-transparent
            rounded-md
            hover:bg-apple-blue
            hover:text-apple-gray-100"
          >
            加入购物车
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductHero;
