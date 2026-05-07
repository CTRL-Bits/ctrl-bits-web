import { AppWindow, Bot, ChartNoAxesCombined, Code2, Layers3, Palette, SearchCheck, Workflow } from "lucide-react";
import SectionHeader from "@/components/shared/SectionHeader";

const services = [
  {
    title: "Web Development",
    keyword: "web development agency Kathmandu",
    description:
      "High-performance business websites, web apps, CMS builds, and e-commerce systems designed to convert visitors into qualified leads.",
    icon: Code2,
  },
  {
    title: "App Development",
    keyword: "app development Nepal",
    description:
      "Usable mobile and web applications with clean flows, resilient architecture, and product decisions made for real users.",
    icon: AppWindow,
  },
  {
    title: "Custom Software",
    keyword: "custom software development Kathmandu",
    description:
      "Internal tools, dashboards, CRM systems, integrations, and software platforms built to reduce manual work and scale operations.",
    icon: Layers3,
  },
  {
    title: "UI/UX Design",
    keyword: "UI UX design services Nepal",
    description:
      "Product interfaces, design systems, wireframes, and interaction flows that make digital products easier to trust and use.",
    icon: Palette,
  },
  {
    title: "Branding",
    keyword: "branding agency Nepal",
    description:
      "Identity systems, visual direction, pitch assets, social templates, and digital brand foundations for growth-stage teams.",
    icon: ChartNoAxesCombined,
  },
  {
    title: "SEO",
    keyword: "SEO services Kathmandu",
    description:
      "Technical SEO, local search, content structure, speed improvements, and search-friendly pages built around commercial intent.",
    icon: SearchCheck,
  },
  {
    title: "Automation",
    keyword: "business automation Nepal",
    description:
      "Workflow automation, API connections, form pipelines, reporting flows, and operational systems that save hours every week.",
    icon: Workflow,
  },
  {
    title: "AI-assisted Systems",
    keyword: "digital product development Nepal",
    description:
      "Practical AI-assisted tooling, content workflows, and product features where automation can improve delivery and decisions.",
    icon: Bot,
  },
];

export default function ServicesMatrix({ preview = false }: { preview?: boolean }) {
  const visibleServices = preview ? services.slice(0, 4) : services;

  return (
    <section className="bg-[#f5f5f5] px-4 py-20 md:px-8 md:py-28">
      <div className="mx-auto max-w-[88rem]">
        <SectionHeader
          eyebrow="Services"
          title={preview ? "What we build best" : "Services built for search, speed, and scale"}
          description="Focused digital services for Nepali and global businesses that need websites, apps, systems, content, automation, and digital growth handled with senior judgment."
        />
        <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
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
                <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-[#0058fc]">
                  {service.keyword}
                </p>
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
