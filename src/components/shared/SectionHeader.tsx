type SectionHeaderProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  inverse?: boolean;
};

export default function SectionHeader({
  eyebrow,
  title,
  description,
  align = "left",
  inverse = false,
}: SectionHeaderProps) {
  return (
    <div
      className={`max-w-3xl ${
        align === "center" ? "mx-auto text-center" : "text-left"
      }`}
    >
      {eyebrow && (
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-[#0058fc]">
          {eyebrow}
        </p>
      )}
      <h2
        className={`text-4xl font-semibold tracking-[-0.055em] md:text-6xl ${
          inverse ? "text-white" : "text-neutral-950"
        }`}
      >
        {title}
      </h2>
      {description && (
        <p
          className={`mt-5 text-base leading-7 md:text-lg ${
            inverse ? "text-white/60" : "text-neutral-600"
          }`}
        >
          {description}
        </p>
      )}
    </div>
  );
}
