import CompanyLogoCloud from "@/components/sections/CompanyLogoCloud";
import RouteHero from "@/components/sections/RouteHero";
import CompanyProfile from "@/components/sections/CompanyProfile";
import TeamDirectory from "@/components/sections/TeamDirectory";
import SchemaMarkup from "@/components/schema-markup";
import { usePageMetadata } from "@/hooks/usePageMetadata";

const AboutPage = () => {
  usePageMetadata({
    title: "About Ctrl Bits | Software, Web & Digital Product Team in Nepal",
    description:
      "Meet Ctrl Bits, a Nepal-based digital product team building websites, apps, software systems, UI/UX, SEO, automation, and digital growth systems.",
    keywords:
      "about Ctrl Bits, software company Nepal, web development team Kathmandu, digital product agency Nepal, automation team Nepal",
    ogTitle: "About Ctrl Bits",
    ogDescription:
      "The team behind Ctrl Bits: websites, apps, software systems, design, SEO, automation, and product development.",
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
      <main className="bg-[#f5f5f5]">
        <RouteHero
          eyebrow="Company"
          title="A small technical team with sharp taste and practical delivery habits."
          description="Ctrl Bits is built for companies that need digital work to feel polished, perform fast, explain clearly, rank better, and keep working after launch."
        >
          <CompanyLogoCloud compact title="Teams, brands, and companies around our work" />
        </RouteHero>
        <CompanyProfile />
        <TeamDirectory />
      </main>
    </>
  );
};

export default AboutPage;
