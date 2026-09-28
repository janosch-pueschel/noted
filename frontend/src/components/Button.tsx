import type { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

export default function Button({
  children,
  onClick,
  type = "button",
  disabled = false,
}: ButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled}
      className={`inline-flex items-center rounded-lg bg-buttonPrimary px-5 py-3 text-textTertiary transition-colors duration-200 hover:bg-buttonPrimaryHover ${
        disabled ? "pointer-events-none opacity-50" : "cursor-pointer"
      }`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
