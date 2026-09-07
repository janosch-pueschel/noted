export default function LoadingSpinner(screenReaderText: string = "Loading") {
  return (
    <div
      className="flex items-center justify-center py-16"
      role="status"
      aria-live="polite"
    >
      <span className="sr-only">{screenReaderText}</span>
      <span
        className="h-8 w-8 animate-spin rounded-full border-2 border-borderPrimary border-t-textPrimary"
        aria-hidden="true"
      />
    </div>
  );
}
