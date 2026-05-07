import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import RouteHero from "@/components/sections/RouteHero";
import ServicesMatrix from "@/components/sections/ServicesMatrix";
import SectionHeader from "@/components/shared/SectionHeader";
import SchemaMarkup from "@/components/schema-markup";
import { usePageMetadata } from "@/hooks/usePageMetadata";

const process = [
  ["01", "Audit", "We inspect goals, traffic, users, workflows, competitors, and the current digital stack."],
  ["02", "Map", "We shape the product architecture, search intent, conversion paths, UX flows, and delivery plan."],
  ["03", "Build", "We design and develop with performance, maintainability, accessibility, and business outcomes in mind."],
  ["04", "Improve", "We launch, measure, iterate, and keep systems useful after the first release."],
];

export default function SolutionsPage() {
  usePageMetadata({
    title: "Web Development, App Development, SEO & Automation Services in Nepal",
    description:
      "Ctrl Bits provides web development, app development, custom software, UI/UX, branding, SEO, automation, and digital product development services from Nepal.",
    keywords:
      "web development services Kathmandu, app development Nepal, custom software development Kathmandu, SEO services Kathmandu, UI UX design Nepal, business automation Nepal",
    ogTitle: "Services | Ctrl Bits",
    ogDescription:
      "Digital services for websites, apps, systems, SEO, branding, automation, and product development.",
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
          title="Services for businesses that need more than a pretty website."
          description="Ctrl Bits works across strategy, design, engineering, SEO, automation, and digital growth so your digital product can be found, trusted, used, and improved."
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
              title="A clean build process, without theatre"
              description="Every project needs enough structure to move fast without guessing. This is the operating rhythm we use for websites, apps, software systems, SEO foundations, and automation work."
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
