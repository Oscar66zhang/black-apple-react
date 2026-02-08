import React from "react";

interface TextLineProps {
  title: string;
  amount: number;
  large?: boolean;
}

const TextLine: React.FC<TextLineProps> = ({
  title,
  amount,
  large = false,
}) => {
  return (
    <>
      <span className={`text-center ${large ? "text-2xl" : "text-base"}`}>
        {title}:
      </span>
      <span className={`text-right ${large ? "text-2xl" : "text-base"}`}>
        RMB {amount.toLocaleString("en-US")}
      </span>
    </>
  );
};

interface PriceTagProps {
  modelAmount?: number | undefined;
  colorAmount?: number | undefined;
  sizeAmount?: number | undefined;
  totalAmount?: number | undefined;
}

const PriceTag = ({
  modelAmount,
  colorAmount,
  sizeAmount,
  totalAmount,
}: PriceTagProps) => {
  return (
    <div className="mt-8 mr-4 text-b">
      <hr className="pb-4 border-apple-gray-200 dark:border-apple-gray-800 " />

      <div className="grid grid-cols-2 gap-y-4 pl-12 pt-2">
        <TextLine title={"+ 型号"} amount={modelAmount ?? 0} />
        <TextLine title={"+ 颜色"} amount={colorAmount ?? 0} />
        <TextLine title={"+ 储存空间"} amount={sizeAmount ?? 0} />
      </div>

      <hr className="mt-6 ml-24 border-t border-apple-gray-200 dark:border-apple-gray-800 " />

      <div className="grid grid-cols-2 pl-12 pt-2">
        <TextLine title={"总计"} amount={totalAmount ?? 0} large />
      </div>
    </div>
  );
};

export default PriceTag;
