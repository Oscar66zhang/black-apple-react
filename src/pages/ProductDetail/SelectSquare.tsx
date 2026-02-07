interface SelectSquareProps {
  name: string;
  spec?: String;
  price: string;
  isSelected?: boolean;
  onClick?: () => void;
}

const SelectSquare = ({
  name,
  spec,
  price,
  isSelected,
  onClick,
}: SelectSquareProps) => {
  return (
    <div className="w-full flex justify-center">
      <div
        className={`
      w-[370px]
      h-20 
      rounded-xl
      cursor-pointer
      ${
        isSelected
          ? "border-3 border-apple-blue"
          : "border border-apple-gray-300 hover:ring-2 hover:ring-apple-blue "
      }
    `}
        onClick={onClick}
      >
        <div className="flex items-center justify-between mt-2 px-2">
          <div className="ml-2 mt-2">
            <p>{name}</p> {spec && <span className="text-xs">({spec})</span>}
          </div>
          <p className="text-sm mt-1 mr-2">{price}</p>
        </div>
      </div>
      

      
    </div>
  );
};

export default SelectSquare;
