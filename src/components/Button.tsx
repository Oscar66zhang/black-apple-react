interface ButtonProps {
  title?: string;
  variant: "primary" | "outline";
  disabled: boolean;
  onClick?: () => void;
}

const Button = ({
  title,
  variant = "primary",
  disabled,
  onClick,
}: ButtonProps) => {
  let className = `
  px-5 py-2 rounded-md border
    transition-colors duration-200`;
};

export default Button;
