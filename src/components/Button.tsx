import React, { type ReactNode } from "react";
export interface ButtonProps {
  title?: ReactNode;
  variant: "primary" | "outline";
  disabled?: boolean;
  onClick?: () => void;
}

const Button = ({
  title,
  variant = "primary",
  disabled = false,
  onClick,
}: ButtonProps) => {
  let className = `
    px-5 py-2 rounded-md border
    transition-colors duration-200
    inline-flex items-center justify-center gap-2
    `;
  if (variant === "primary") {
    className +=
      "bg-apple-blue text-white border-apple-blue hover:bg-apple-blue/90";
  } else if (variant === "outline") {
    className +=
      " bg-transparent text-apple-blue border-apple-blue hover:bg-apple-blue hover:text-white";
  }
  if (disabled) {
    className += " opacity-50 cursor-not-allowed pointer-events-none";
  }
  return (
    <button className={className} disabled={disabled} onClick={onClick}>
      {title}
    </button>
  );
};

export default Button;
