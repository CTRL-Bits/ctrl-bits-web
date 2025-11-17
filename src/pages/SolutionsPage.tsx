import { Helmet } from "react-helmet-async";
import SolutionsHero from "@/components/solutions/hero-section";
import InteractiveShowcaseSection from "@/components/solutions/interactive-showcase-section";
import SolutionCardSection from "@/components/solutions/solution-card-section";
import TechStackSection from "@/components/solutions/tech-stack-section";

export default function SolutionsPage() {
  return (
    <>
      <Helmet>
        <title>Smart Web & IT Solutions in Nepal | CtrlBits</title>
        <meta
          name="description"
          content={
            "CtrlBits is a performance-driven custom web development company in Nepal. We build scalable websites, automate workflows, and secure your infrastructure for growth."
          }
        />
      </Helmet>
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
