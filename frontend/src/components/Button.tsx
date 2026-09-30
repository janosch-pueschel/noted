import type { ReactNode } from "react";
import { cva } from "class-variance-authority";

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
  variant?: "primary" | "secondary";
}

const buttonVariants = cva(
  "inline-flex items-center rounded-lg px-10 py-3 transition-colors duration-200",
  {
    variants: {
      variant: {
        primary:
          "bg-buttonPrimary text-textTertiary hover:bg-buttonPrimaryHover",
        secondary: "border-2 border-borderPrimary bg-bgPrimary",
      },
      disabled: {
        false: "cursor-pointer",
        true: "pointer-events-none opacity-50",
      },
    },
  },
);

export default function Button({
  children,
  onClick,
  type = "button",
  disabled = false,
  variant = "primary",
}: ButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled}
      className={buttonVariants({ variant, disabled })}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
