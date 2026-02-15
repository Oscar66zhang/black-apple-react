import { useState } from "react";
import { FiPlus, FiMinus, FiRefreshCw } from "react-icons/fi";

type ToggleButtonsProps = {
  onAdd: () => void;
  onRemove: () => void;
  onReset: () => void;
};

export const ToggleButtons = ({
  onAdd,
  onRemove,
  onReset,
}: ToggleButtonsProps) => {
  const [selected, setSelected] = useState("add");

  return (
    <div className="flex border border-apple-gray-200 rounded-md overflow-hidden text-apple-gray-900">
      <button
        title="添加商品"
        className={`px-3 py-2 hover:bg-apple-blue ${
          selected === "add" ? "bg-apple-gray-200" : "bg-white"
        }`}
        onClick={() => {
          setSelected("add");
          onAdd();
        }}
      >
        <FiPlus size={16} />
      </button>
      <button
        title="删除商品"
        className={`px-3 py-2 hover:bg-apple-blue ${
          selected === "remove" ? "bg-apple-gray-200" : "bg-white"
        }`}
        onClick={() => {
          setSelected("remove");
          onRemove();
        }}
      >
        <FiMinus size={16} />
      </button>
      <button
        title="重置购物车"
        className={`px-3 py-2 hover:bg-apple-blue ${
          selected === "reset" ? "bg-apple-gray-200" : "bg-white"
        }`}
        onClick={() => {
          setSelected("reset");
          onReset();
        }}
      >
        <FiRefreshCw size={16} />
      </button>
    </div>
  );
};
