interface ButtonProps {
  title?: string;
  variant: "primary" | "outline";
  disabled: boolean;
  onClick?: () => void;
}

const Button = () => {
  return <div>Button</div>;
};

export default Button;
