type LogoIconProps = {
  className?: string;
  invert?: boolean;
};

export default function LogoIcon({
  className = "",
  invert = true,
}: LogoIconProps) {
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <img
        src="/fulllogo.png"
        alt=""
        // width={32}
        // height={32}
        className={`h-8 ${invert ? "invert" : ""}`}
      />
    </span>
  );
}
