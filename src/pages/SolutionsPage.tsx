import { usePageMetadata } from "@/hooks/usePageMetadata";
import SolutionsHero from "@/components/solutions/hero-section";
import InteractiveShowcaseSection from "@/components/solutions/interactive-showcase-section";
import SolutionCardSection from "@/components/solutions/solution-card-section";
import TechStackSection from "@/components/solutions/tech-stack-section";
import SchemaMarkup from "@/components/schema-markup";

export default function SolutionsPage() {
  usePageMetadata({
    title: "Our Services in Kathmandu, Nepal",
    description:
      "Explore Ctrl Bits services in Kathmandu: web development, digital marketing, SEO, video editing, graphic design, and custom software development for growth-focused brands.",
    keywords:
      "web development services Kathmandu, digital marketing services Kathmandu, SEO services Kathmandu, video editing Kathmandu, graphic design Kathmandu, custom software development Kathmandu",
    ogTitle: "Our Services in Kathmandu | Ctrl Bits",
    ogDescription:
      "Web development, digital marketing, SEO, video editing, graphic design, and custom software services tailored to Kathmandu and global businesses.",
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
      <main className="relative flex flex-col justify-center items-center overflow-hidden bg-background transition-all duration-700 ease-out">
        <SolutionsHero />
        {/* Interactive Showcase */}

        <InteractiveShowcaseSection />
        {/* Solution Cards Section */}
        <SolutionCardSection />
        {/* Tech Stack Section */}
        <TechStackSection />
      </main>
    </>
  );
}
