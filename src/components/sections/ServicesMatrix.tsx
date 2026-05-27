import { AppWindow, Blocks, Code2, PenTool, SearchCheck, Palette } from "lucide-react";
import SectionHeader from "@/components/shared/SectionHeader";

const services = [
  {
    title: "Web Development",
    description:
      "Fast, clear websites built to convert.",
    icon: Code2,
  },
  {
    title: "App Development",
    description:
      "Useful apps with simple flows.",
    icon: AppWindow,
  },
  {
    title: "Custom Software",
    description:
      "Tools that fit how your team works.",
    icon: Blocks,
  },
  {
    title: "UI/UX Design",
    description:
      "Interfaces that feel clear and usable.",
    icon: PenTool,
  },
  {
    title: "Digital Marketing",
    description:
      "Search and campaigns built for growth.",
    icon: SearchCheck,
  },
  {
    title: "Creative Services",
    description:
      "Brand visuals, video, and motion.",
    icon: Palette,
  },
];

export default function ServicesMatrix({ preview = false }: { preview?: boolean }) {
  const visibleServices = services;

  return (
    <section className="bg-[#f5f5f5] px-4 py-20 md:px-8 md:py-28">
      <div className="mx-auto max-w-[88rem]">
        <SectionHeader
          eyebrow="Services"
          title={preview ? "What we build best" : "Services built to move"}
          description="Focused work across build, design, creative, and growth."
        />
        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {visibleServices.map((service) => {
            const Icon = service.icon;
            return (
              <article
                key={service.title}
                className="group min-h-72 rounded-[2rem] border border-neutral-200/70 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#0058fc]/30 hover:shadow-[0_24px_80px_rgba(0,88,252,0.12)]"
              >
                <div className="mb-12 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#0058fc] text-white">
                  <Icon className="h-6 w-6" aria-hidden="true" />
                </div>
                <h3 className="text-2xl font-semibold tracking-[-0.045em] text-neutral-950">
                  {service.title}
                </h3>
                <p className="mt-4 text-sm leading-6 text-neutral-600">
                  {service.description}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
