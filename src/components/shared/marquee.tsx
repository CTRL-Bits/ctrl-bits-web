import { Marquee } from "../magicui/marquee";

type MarqueeSectionProps = {
  items: string[];
};

export default function MarqueeSection({ items }: MarqueeSectionProps) {
  return (
    <div className="relative flex h-[300px] w-full flex-row items-center justify-center overflow-hidden">
      <Marquee className="[--duration:10s]" vertical>
        {items.map((item) => {
          return (
            <div key={item}>
              <h3 className="text-5xl text-center font-[500]">{item}</h3>
            </div>
          );
        })}
      </Marquee>
      <div className="pointer-events-none absolute inset-x-0 top-0 h-1/4 bg-gradient-to-b from-background"></div>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-background"></div>
    </div>
  );
}
