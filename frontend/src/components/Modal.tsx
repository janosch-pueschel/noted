import { Close } from "@mui/icons-material";
import type { ReactNode } from "react";

interface ModalProps {
  isOpen: boolean;
  onClick: () => void;
  children: ReactNode;
}

export default function Modal({ isOpen, onClick, children }: ModalProps) {
  return (
    <div
      className={
        isOpen
          ? "fixed inset-0 z-50 flex items-start justify-center p-4"
          : "hidden"
      }
      role="dialog"
      aria-modal="true"
      aria-labelledby="search-book-title"
    >
      <button
        type="button"
        className="absolute inset-0 bg-textPrimary/50"
        aria-label="Close dialog"
        onClick={onClick}
      />

      <div className="relative w-full max-w-md rounded-lg border-2 border-borderPrimary bg-bgPrimary p-6 shadow-lg">
        <button
          type="button"
          className="text-textSecondary hover:text-textPrimary cursor-pointer absolute top-6 right-6 z-20"
          aria-label="Close"
          onClick={onClick}
        >
          <Close />
        </button>

        {children}
      </div>
    </div>
  );
}
