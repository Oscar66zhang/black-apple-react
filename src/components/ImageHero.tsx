import IconButton from "./IconButton";
import hero_image from "@/assets/images/hero.jpg";
import hero_small_image from "@/assets/images/hero_small.jpg";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { MdOutlineNavigateNext } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const ImageHero = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  function sleepSync(milliseconds: number) {
    // const start=Date.now();
    // while(Date.now()-start<milliseconds){
    //   //do nothing
    // }
    return new Promise((resolve) => {
      setTimeout(resolve, milliseconds);
    });
  }

  const fakeFetchData = () => {
    sleepSync(10000).then(() => {
      console.log("数据获取完成");
      navigate("/product-detail/1");
    }); //阻塞10秒
  };

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
        <div className="text-4xl md:text-6xl font-bold">
          {t(`home_page.image_hero.product_name`)}
        </div>
        <div className="mt-4 flex space-x-4">
          <IconButton
            icon={<MdOutlineNavigateNext />}
            iconPosition="right"
            title={t(`home_page.image_hero.learn_more`)}
            variant="primary"
            onClick={() => {
              fakeFetchData();
              navigate("/product-detail/1");
            }}
          />
          <IconButton
            icon={<AiOutlineShoppingCart />}
            title={t(`home_page.image_hero.buy`)}
            variant="outline"
          />
        </div>
      </div>
    </div>
  );
};

export default ImageHero;
