interface SquareInputProps {
  subTitle: string;
  title: string;
  value: string; // 输入框的值
  onChange: (value: string) => void; // 值变化回调
}

const SquareInput = ({
  subTitle,
  title,
  value,
  onChange,
}: SquareInputProps) => {
  return (
    <div className="w-full flex justify-center">
      <div
        className={`
            w-[500px] h-20 
            rounded-xl 
            border border-apple-gray-300 
            hover:ring-2 hover:ring-apple-blue
        `}
      >
        <div className="flex flex-col justify-center h-full px-4">
          <label className="text-xs text-gray-500 mb-1">{subTitle}</label>
          <input
            type="text"
            className="bg-transparent outline-none text-lg"
            placeholder={title}
            value={value}
            onChange={(e) => onChange(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default SquareInput;
