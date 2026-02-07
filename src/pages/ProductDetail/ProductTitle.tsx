import React from "react";

interface ProductTitleProps {
  name: string;
  startingPrice: number;
  installment?: number;
}

const ProductTitle = ({
  name,
  startingPrice,
  installment,
}: ProductTitleProps) => {
  return (
    <div>
      <p className="text-apple-red text-sm font-semibold">全新</p>
      <h4 className="text-4xl mt-2">购买{name}</h4>
      <p className="mt-6">
        RMB {installment}/月起或RMB{startingPrice}起
      </p>
    </div>
  );
};

export default ProductTitle;
