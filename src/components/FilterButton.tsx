const FilterButton = ({
  filter,
  isSelected,
  onClick,
}: {
  filter: string;
  isSelected: boolean;
  onClick: () => void;
}) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 rounded-lg ${
      isSelected
        ? "bg-apple-blue text-apple-white"
        : "bg-apple-gray-100 text-apple-text"
    }`}
  >
    {filter}
  </button>
);

export default FilterButton;
