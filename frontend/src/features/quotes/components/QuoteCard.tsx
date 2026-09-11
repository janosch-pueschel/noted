import { FormatQuote } from "@mui/icons-material";

import Card from "@components/Card";

import type { Quote } from "../types";

interface QuoteCardProps {
  quote: Quote;
}

export default function QuoteCard({ quote }: QuoteCardProps) {
  const { text, startPage, endPage } = quote;
  return (
    <Card className="flex flex-col gap-5">
      <div className="flex gap-1">
        <FormatQuote className="text-textHighlight" />
        <p className="font-serif mt-1 italic">{text}</p>
      </div>

      <div>
        {startPage && (
          <p className="text-textSecondary text-sm">p. {startPage}</p>
        )}
        {startPage && endPage && (
          <p className="text-textSecondary text-sm">
            pp. {startPage} – {endPage}
          </p>
        )}
      </div>
    </Card>
  );
}
