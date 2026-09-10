import type { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  onClick: () => void;
}

export default function Button({ children, onClick }: ButtonProps) {
  return (
    <button
      type="button"
      className="inline-flex items-center rounded-lg bg-buttonPrimary px-5 py-3 text-textTertiary cursor-pointer transition-colors duration-200 hover:bg-buttonPrimaryHover"
      onClick={onClick}
    >
      {children}
    </button>
  );
}
