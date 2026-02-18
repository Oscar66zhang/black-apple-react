import React from "react";
import { Link } from "react-router-dom";
import { ProductInCategory } from "../types/custom";

const CompareTableCard: React.FC<ProductInCategory> = ({
  id,
  image,
  name,
  title,
  startingPrice,
  installments,
  features,
}) => (
  <div className="w-96 flex-none flex flex-col items-center p-5 shadow-lg">
    <img src={image} alt={title} className="block mx-auto h-72" />
    <h3 className="mt-5 text-center text-xl font-semibold">{name}</h3>
    <p className="mt-2 text-center">{title}</p>
    <p className="mt-2 text-center text-lg font-semibold">
      RMB {installments} /月起或 RMB {startingPrice} 起
    </p>
    <div className="mt-6 flex justify-center items-center gap-2">
      <button className="w-32 bg-blue-600 text-white py-2 px-4 rounded-md">
        进一步了解
      </button>
      <Link to={`/products/${id}`} className="text-blue-600">
        购买
      </Link>
    </div>
    <div className="mt-6 mb-6 border-t-2" />
    {features.map((feature, index) => (
      <p
        key={`${name}-${feature}-${id}-${index}`}
        className="mt-4 text-center text-sm"
      >
        {feature}
      </p>
    ))}
  </div>
);

type CompareTableProps = {
  products: ProductInCategory[];
};

const CompareTable: React.FC<CompareTableProps> = ({ products }) => (
  <>
    <h2 className="pt-10 pl-4 text-3xl md:text-6xl font-extrabold">
      全系产品细细看
    </h2>
    <div className="pt-5 px-4 md:px-14 pb-10 flex gap-x-5 overflow-x-auto no-scrollbar">
      {products.map((product) => (
        <CompareTableCard
          key={product.id}
          id={product.id}
          image={product.image}
          name={product.name}
          title={product.title}
          startingPrice={product.startingPrice}
          installments={product.installments}
          features={product.features}
        />
      ))}
    </div>
  </>
);

export default CompareTable;
