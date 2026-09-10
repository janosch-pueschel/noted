import type { ReactNode } from "react";
import { ErrorOutlined } from "@mui/icons-material";

interface ErrorMessageProps {
  children: ReactNode;
}

export default function ErrorMessage({ children }: ErrorMessageProps) {
  return (
    <div
      role="alert"
      className="flex items-center gap-3 rounded-lg border-2 border-danger/20 bg-danger/5 p-4"
    >
      <ErrorOutlined className="shrink-0 text-danger" />
      <p className="font-medium">{children}</p>
    </div>
  );
}
