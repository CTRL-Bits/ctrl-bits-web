import ContentSection from "@/components/about-us-content-section";
import TeamSection from "@/components/team-section";
import SchemaMarkup from "@/components/schema-markup";
import { usePageMetadata } from "@/hooks/usePageMetadata";

const AboutPage = () => {
  usePageMetadata({
    title: "About Us",
    description:
      "Learn about Ctrl Bits, a Kathmandu-based digital team delivering web development, digital marketing, SEO, video editing, graphic design, and custom software solutions.",
    keywords:
      "about Ctrl Bits agency, Kathmandu digital agency, web development Kathmandu, digital marketing Kathmandu, SEO Kathmandu",
    ogTitle: "About Ctrl Bits | Kathmandu Digital Team",
    ogDescription:
      "Meet the Kathmandu team behind web development, digital marketing, SEO, video editing, graphic design, and custom software delivery.",
    ogUrl: "https://www.ctrlbits.com/about",
    canonical: "https://www.ctrlbits.com/about",
    twitterCard: "summary_large_image",
  });

  return (
    <>
      <SchemaMarkup
        type="webpage"
        pageName="About"
        pageUrl="https://www.ctrlbits.com/about"
      />
      <ContentSection />
      <TeamSection />
    </>
  );
};

export default AboutPage;
