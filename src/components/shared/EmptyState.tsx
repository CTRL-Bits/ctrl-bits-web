type EmptyStateProps = {
  message: string;
};

export default function EmptyState({ message }: EmptyStateProps) {
  return (
    <div className="rounded-[2rem] border border-neutral-200 bg-white/70 p-6 text-sm text-neutral-500">
      {message}
    </div>
  );
}
