type LogoIconProps = {
  className?: string;
  showText?: boolean;
};

export default function LogoIcon({
  className = "",
  showText = true,
}: LogoIconProps) {
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <img
        src="/favicon.png"
        alt=""
        width={32}
        height={32}
        className="h-8 w-8"
      />
      {showText && (
        <span className="text-lg font-semibold tracking-[-0.02em]">
          Ctrl Bits
        </span>
      )}
    </span>
  );
}
