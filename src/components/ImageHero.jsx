import React from "react";
import hero_image from "@/assets/images/hero.jpg";
import hero_small_image from "@/assets/images/hero_small.jpg";

const ImageHero = () => {
  return (
    <div className="relative bg-black text-white mb-2">
      <img
        src={hero_small_image}
        className="w-full h-[480px] block md:hidden"
      />
      <img
        src={hero_image}
        className="w-full h-[480px] object-cover hidden md:block"
      />
      <div className="absolute inset-4 flex flex-col p-2 items-center justify-end text-center md:justify-start">
        <div className="text-4xl md:text-6xl font-bold">iPhone 14 Pro</div>
        <div className="mt-4 flex space-x-4">
          <button className="px-6 py-2 border border-blue-600 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">进一步了解</button>
          <button className="px-6 py-2 border border-blue-600 bg-transparent text-white rounded-md hover:bg-blue-700 transition">购买</button>
        </div>
      </div>
    </div>
  );
};

export default ImageHero;
