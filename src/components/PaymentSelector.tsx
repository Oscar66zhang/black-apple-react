import { ReactNode } from "react";

interface PaymentSelectorProps {
  name: string;
  icon: ReactNode; // 新增：接收一个图标组件
  isSelected?: boolean;
  onClick?: () => void;
}

const PaymentSelector = ({
  name,
  icon,
  isSelected = false,
  onClick,
}: PaymentSelectorProps) => {
  return (
    <div className="w-full flex justify-center" onClick={onClick}>
      <div
        className={`
          w-[500px] h-20 
          rounded-xl 
          ${
            isSelected
              ? "border-3 border-apple-blue"
              : "border border-apple-gray-300 hover:ring-2 hover:ring-apple-blue"
          }
        `}
      >
        <div className="flex flex-col justify-center h-full px-4">
          <div className="flex items-center">
            {icon}
            <p className="ml-2">{name}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentSelector;
