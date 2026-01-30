import IconButton from "./IconButton";
import hero_image from "@/assets/images/hero.jpg";
import hero_small_image from "@/assets/images/hero_small.jpg";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { MdOutlineNavigateNext } from "react-icons/md";
import { useNavigate } from "react-router-dom";
const ImageHero = () => {
  const navigate = useNavigate();
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
          <IconButton
            icon={<MdOutlineNavigateNext />}
            ioconPosition="right"
            title="进一步了解"
            variant="primary"
            onClick={() => navigate("/product-detail/1")}
          />
          <IconButton
            icon={<AiOutlineShoppingCart />}
            title="购买"
            variant="outline"
          />
        </div>
      </div>
    </div>
  );
};

export default ImageHero;
