import { useParams, useLoaderData } from "react-router-dom";
import type { Product, Color, ProductModel, MemorySize } from "@/types/custom";
import { product_list } from "../../assets/data/products";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import ProductTitle from "./ProductTitle";
import Button from "@/components/Button";
import ProductHero from "./ProductHero";
import SelectTitle from "./SelectTitle";
import SelectSquare from "./SelectSquare";
import SelectCircle from "./SelectCircle";
import PriceTag from "./PriceTag";
import { ShoppingCartContext } from "@/contexts/shoppingCart";
import { CartItem } from "@/types/custom";

type ParamsType = {
  id: string;
};

const ProductDetail = () => {
  const { addToCart } = useContext(ShoppingCartContext);
  const [selectedModel, setSelectedModel] = useState<ProductModel>();
  const [selectedColor, setSelectedColor] = useState<Color>();
  const [selectedMemorySize, setSelectedMemorySize] = useState<MemorySize>();
  const [totalAmount, setTotalAmount] = useState<number>(0);

  const navigate = useNavigate();
  const product = useLoaderData<Product>();
  if (!product) {
    // return <div>Product not found</div>;
    navigate("/404", { replace: true });
    return; //这里返回 undefined 或者 null，避免渲染错误
  }

  useEffect(() => {
    const total =
      product.startingPrice ??
      0 + (selectedModel?.price ?? 0) + (selectedMemorySize?.price ?? 0);
    setTotalAmount(total);
  }, [product, selectedModel, selectedMemorySize, selectedColor]);

  const handleAddToCart = () => {
    if (!product || !selectedModel || !selectedMemorySize || !selectedColor) {
      return;
    }
    const cartItem: CartItem = {
      productId: product.id,
      name: product.name,
      imageSrc: product.image,
      modelId: selectedModel.id,
      modelPrice: selectedModel.price,
      model: selectedModel.name,
      color: selectedColor,
      memorySize: selectedMemorySize.name,
      memorySizeId: selectedMemorySize.id,
      memorySizePrice: selectedMemorySize.price,
      qty: 1,
    };
    addToCart(cartItem);
  };

  return (
    <div className="min-h-screen px-4 lg:px-32 mt-4 mb-40 text-apple-text-light dark:text-apple-text-dark">
      <ProductTitle
        name={product.name}
        startingPrice={product.startingPrice}
        installment={product.installments}
      />
      <div className="flex flex-col lg:flex-row gap-6 mt-12">
        <ProductHero imageSrc={product.carouselImages[0]} />
        <div className="flex flex-col items-center justify-center">
          <div className="w-full">
            <SelectTitle text1="选择型号" text2="请选择您想要的型号" />
            <div className="mt-4 space-y-2">
              {product.models.map((model) => (
                <SelectSquare
                  key={model.name}
                  name={model.name}
                  spec={model.specification}
                  price={`RMB ${model.price}`}
                  isSelected={selectedModel?.id === model.id}
                  onClick={() => setSelectedModel(model)}
                />
              ))}
            </div>
          </div>
          <div className="w-full mt-10">
            <SelectTitle text1="外观" text2="选择你喜欢的颜色" />
            <div className="flex gap-4 mt-6 ml-6">
              {product.colors.map((colors) => (
                <SelectCircle
                  key={colors}
                  color={colors}
                  isSelected={selectedColor === colors}
                  onClick={() => setSelectedColor(colors)}
                />
              ))}
            </div>
          </div>

          <div className="w-full mt-10">
            <SelectTitle text1="储存容量" text2="你需要多大的空间?" />
            <div className="mt-4 space-y-2">
              {product.memorySizes.map((size) => (
                <SelectSquare
                  key={size.name}
                  name={size.name}
                  price={`RMB ${size.price}`}
                  isSelected={selectedMemorySize?.id === size.id}
                  onClick={() => setSelectedMemorySize(size)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <PriceTag
        modelAmount={selectedModel?.price}
        colorAmount={selectedColor ? 0 : undefined} //假设颜色不额外收费
        sizeAmount={selectedMemorySize?.price}
        totalAmount={totalAmount}
      />
      <div className="flex justify-end mt-12 mr-8">
        <Button title="加入购物车" onClick={handleAddToCart} />
      </div>
    </div>
  );
};

export default ProductDetail;
