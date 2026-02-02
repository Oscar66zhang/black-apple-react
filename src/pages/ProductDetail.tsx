import { useParams, useLoaderData } from "react-router-dom";
import type { Product } from "@/types/custom";
import { product_list } from "../assets/data/products";
import { useNavigate } from "react-router-dom";
type ParamsType = {
  id: string;
};

const ProductDetail = () => {
  const navigate = useNavigate();
  const product = useLoaderData<Product>();
  if (!product) {
    // return <div>Product not found</div>;
    navigate("/404", { replace: true });
    return; //这里返回 undefined 或者 null，避免渲染错误
  }
  return (
    <div>
      <h1>Product Detail</h1>
      <p>This is the product detail page</p>
      <p>{JSON.stringify(product.features)}</p>
    </div>
  );
};

export default ProductDetail;
