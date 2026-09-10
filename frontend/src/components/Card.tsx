import type { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface CardProps {
  children: ReactNode;
  className?: string;
}

export default function Card({ children, className }: CardProps) {
  return (
    <div
      className={twMerge(
        "border-borderPrimary p-4 rounded-lg border-2",
        className,
      )}
    >
      {children}
    </div>
  );
}
