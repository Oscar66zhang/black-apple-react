import styled from "styled-components";

const colorMapping = {
  沙漠色钛金属: ["#BFA48F", "#D8C7B8"],
  原色钛金属: ["#6D6E74", "#B0B1B4"],
  白色钛金属: ["#E0E0E0", "#F5F5F5"],
  黑色钛金属: ["#1C1C1E", "#4A4A4C"],
} as const;

interface StyledCircleProps {
  $primaryColor: string;
  $secondaryColor: string;
}

const StyledCircle = styled.div<StyledCircleProps>`
  background: linear-gradient(
    to bottom,
    ${(props) => props.$primaryColor},
    ${(props) => props.$secondaryColor}
  );
`;

interface SelectCircleProps {
  color: keyof typeof colorMapping;
  isSelected?: boolean;
  onClick?: () => void;
}

const SelectCircle = ({ color, isSelected, onClick }: SelectCircleProps) => {
  const [primaryColor, secondaryColor] = colorMapping[color] || [
    "#000",
    "#FFF",
  ];
  return (
    <StyledCircle
      className={`w-6 h-6 rounded-full relative cursor-pointer 
    ${isSelected ? "ring-2 ring-apple-blue ring-offset-2" : "hover:ring-2 hover:ring-apple-blue"}`}
      $primaryColor={primaryColor}
      $secondaryColor={secondaryColor}
      onClick={onClick}
    />
  );
};

export default SelectCircle;
