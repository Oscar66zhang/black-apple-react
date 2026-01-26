import Button from "./Button";
import type { ButtonProps } from "./Button";

export interface IconButtonProps extends ButtonProps {
  icon: React.ReactNode;
  iconPosition?: "left" | "right";
}

const IconButton = ({
  icon,
  iconPosition = "left",
  title,
  ...rest
}: IconButtonProps) => {
  return (
    <Button
      title={
        <span className="flex items-center gap-2">
          {iconPosition === "left" && icon}
          <span>{title}</span>
          {iconPosition === "right" && icon}
        </span>
      }
      {...rest}
    />
  );
};

export default IconButton;
