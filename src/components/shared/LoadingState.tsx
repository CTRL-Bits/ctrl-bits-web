type LoadingStateProps = {
  label?: string;
  count?: number;
  variant?: "cards" | "compact";
};

export default function LoadingState({
  label = "Loading content",
  count = 4,
  variant = "cards",
}: LoadingStateProps) {
  if (variant === "compact") {
    return (
      <div className="rounded-3xl border border-neutral-200 bg-white/70 p-6 text-sm text-neutral-500">
        {label}...
      </div>
    );
  }

  return (
    <div
      className="grid gap-4 md:grid-cols-2 lg:grid-cols-4"
      aria-label={label}
      aria-live="polite"
    >
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="h-56 animate-pulse rounded-[2rem] bg-white/70"
        />
      ))}
    </div>
  );
}
