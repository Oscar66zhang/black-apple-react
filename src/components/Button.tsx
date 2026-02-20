import React, { ReactNode } from "react";
import { AiOutlineLoading } from "react-icons/ai";

export interface ButtonProps {
  title?: ReactNode;
  variant?: "primary" | "outline";
  disabled?: boolean;
  onClick?: () => void;
  loading?: boolean;
}

const Button = ({
  title,
  variant = "primary",
  disabled = false,
  onClick,
  loading = false,
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
  if (disabled || loading) {
    className += " opacity-50 cursor-not-allowed pointer-events-none";
  }
  return (
    <button
      className={className}
      disabled={disabled || loading}
      onClick={onClick}
    >
      {loading && <AiOutlineLoading className="animate-spin h-5 w-5" />}
     <span> {title}</span>
    </button>
  );
};

export default Button;
