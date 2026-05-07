import type { ReactNode } from "react";

type RouteHeroProps = {
  eyebrow: string;
  title: string;
  description: string;
  children?: ReactNode;
};

export default function RouteHero({
  eyebrow,
  title,
  description,
  children,
}: RouteHeroProps) {
  return (
    <section className="relative overflow-hidden bg-[#f5f5f5] px-4 pb-14 pt-32 md:px-8 md:pb-20 md:pt-40">
      <div className="relative mx-auto max-w-[88rem]">
        <div className="max-w-5xl">
          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.22em] text-[#0058fc]">
            {eyebrow}
          </p>
          <h1 className="max-w-5xl text-5xl font-semibold leading-[0.94] tracking-[-0.075em] text-neutral-950 md:text-7xl lg:text-8xl">
            {title}
          </h1>
          <p className="mt-7 max-w-3xl text-lg leading-8 text-neutral-600 md:text-xl">
            {description}
          </p>
        </div>
        {children && <div className="mt-10">{children}</div>}
      </div>
    </section>
  );
}
