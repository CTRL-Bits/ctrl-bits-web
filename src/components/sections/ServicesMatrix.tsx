import { AppWindow, Blocks, Code2, PenTool, SearchCheck, Palette } from "lucide-react";
import SectionHeader from "@/components/shared/SectionHeader";

const services = [
  {
    title: "Web Development",
    description:
      "Business websites, landing pages, and SEO-ready builds made for speed and clarity.",
    icon: Code2,
  },
  {
    title: "App Development",
    description:
      "Mobile and web apps with clean architecture, secure APIs, and simple user flows.",
    icon: AppWindow,
  },
  {
    title: "Custom Software",
    description:
      "Internal tools, dashboards, portals, and workflow systems tailored to how your team works.",
    icon: Blocks,
  },
  {
    title: "UI/UX Design",
    description:
      "Research-led interfaces, wireframes, design systems, and user flows that make products easier to use.",
    icon: PenTool,
  },
  {
    title: "Digital Marketing",
    description:
      "SEO, local SEO, content, and paid campaigns focused on qualified traffic and measurable growth.",
    icon: SearchCheck,
  },
  {
    title: "Creative Services",
    description:
      "Video production, graphic design, branding, animation, and illustration that bring your ideas to life.",
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
          title={preview ? "What we build best" : "Services built for search, speed, and scale"}
          description="Clear services for web development, app development, custom software, UI/UX design, digital marketing, and creative services."
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
