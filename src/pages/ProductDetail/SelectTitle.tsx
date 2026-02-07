interface SelectTitleProps {
  text1: string;
  text2: string;
}

const SelectTitle = ({ text1, text2 }: SelectTitleProps) => {
  return (
    <div className="flex">
      <h2 className="text-2xl font-semibold">{text1}</h2>
      <p className="text-lg text-gray-600 font-semibold ml-2">{text2}</p>
    </div>
  );
};

export default SelectTitle;
