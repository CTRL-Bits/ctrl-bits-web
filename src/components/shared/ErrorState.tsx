type ErrorStateProps = {
  message: string;
};

export default function ErrorState({ message }: ErrorStateProps) {
  return (
    <div
      role="status"
      className="rounded-[2rem] border border-[#0058fc]/10 bg-white/70 p-6 text-sm text-neutral-600"
    >
      {message}
    </div>
  );
}
