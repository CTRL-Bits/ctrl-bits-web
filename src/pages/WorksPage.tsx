import CaseStudiesGrid from "@/components/sections/CaseStudiesGrid";
import RouteHero from "@/components/sections/RouteHero";
import SchemaMarkup from "@/components/schema-markup";
import { usePageMetadata } from "@/hooks/usePageMetadata";

export default function WorksPage() {
  usePageMetadata({
    title: "Portfolio & Case Studies | Ctrl Bits",
    description:
      "Explore Ctrl Bits portfolio and case studies across web development, app development, custom software, UI/UX design, creative services, and digital marketing work.",
    keywords:
      "Ctrl Bits portfolio, web development portfolio Nepal, app development case studies, custom software case studies Kathmandu, UI/UX design case studies Nepal, creative services portfolio Nepal, digital marketing case studies Nepal",
    ogTitle: "Portfolio & Case Studies | Ctrl Bits",
    ogDescription:
      "Case studies from Ctrl Bits across websites, apps, custom software, UI/UX, creative work, and digital marketing delivery.",
    ogUrl: "https://www.ctrlbits.com/portfolio",
    canonical: "https://www.ctrlbits.com/portfolio",
    twitterCard: "summary_large_image",
  });

  return (
    <>
      <SchemaMarkup
        type="webpage"
        pageName="Portfolio"
        pageUrl="https://www.ctrlbits.com/portfolio"
      />
      <main className="bg-[#f5f5f5]">
        <RouteHero
          eyebrow="Portfolio"
          title="Case studies from the systems we have shipped."
          description="A searchable portfolio of websites, apps, custom software, UI/UX systems, creative work, and digital marketing projects built for clients in Nepal and beyond."
        />
        <CaseStudiesGrid />
      </main>
    </>
  );
}
