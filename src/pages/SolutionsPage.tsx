import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import RouteHero from "@/components/sections/RouteHero";
import ServicesMatrix from "@/components/sections/ServicesMatrix";
import SectionHeader from "@/components/shared/SectionHeader";
import SchemaMarkup from "@/components/schema-markup";
import { usePageMetadata } from "@/hooks/usePageMetadata";

const process = [
  ["01", "Audit", "We inspect the goals, users, and current stack."],
  ["02", "Map", "We shape the route, flow, and delivery plan."],
  ["03", "Build", "We design and develop with speed and clarity."],
  ["04", "Improve", "We launch, measure, and keep improving."],
];

export default function SolutionsPage() {
  usePageMetadata({
    title: "Ctrl Bits Services | Web & Digital Marketing",
    description:
      "Ctrl Bits provides web development, app development, custom software, UI/UX design, creative services, and digital marketing for businesses across Nepal.",
    keywords:
      "web development agency Nepal, app development company Nepal, custom software development Nepal, UI/UX design Nepal, creative services Nepal, digital marketing agency Nepal, control bits services",
    ogTitle: "Ctrl Bits Services | Web & Digital Marketing",
    ogDescription:
      "Web development, app development, custom software, UI/UX design, creative services, and digital marketing from Ctrl Bits.",
    ogUrl: "https://www.ctrlbits.com/solutions",
    canonical: "https://www.ctrlbits.com/solutions",
    twitterCard: "summary_large_image",
  });

  return (
    <>
      <SchemaMarkup
        type="service"
        pageName="Solutions"
        pageUrl="https://www.ctrlbits.com/solutions"
      />
      <main className="bg-[#f5f5f5]">
        <RouteHero
          eyebrow="Services"
          title="Websites, software, design, and marketing built to move."
          description="Practical services for teams that need sharper digital presence, cleaner systems, and better growth paths."
        >
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 rounded-full bg-[#0058fc] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#001ea2]"
          >
            Discuss a project
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </RouteHero>
        <ServicesMatrix />
        <section id="process" className="px-4 py-20 md:px-8 md:py-28">
          <div className="mx-auto max-w-[88rem]">
            <SectionHeader
              eyebrow="Process"
              title="A clean build process"
              description="Enough structure to move fast without guessing."
            />
            <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {process.map(([number, title, description]) => (
                <article key={title} className="rounded-[2rem] bg-white p-6">
                  <p className="text-sm font-semibold text-[#0058fc]">{number}</p>
                  <h3 className="mt-16 text-3xl font-semibold tracking-[-0.055em]">
                    {title}
                  </h3>
                  <p className="mt-4 text-sm leading-6 text-neutral-600">
                    {description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
