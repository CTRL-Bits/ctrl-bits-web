import CompanyLogoCloud from "@/components/sections/CompanyLogoCloud";
import RouteHero from "@/components/sections/RouteHero";
import CompanyProfile from "@/components/sections/CompanyProfile";
import TeamDirectory from "@/components/sections/TeamDirectory";
import SchemaMarkup from "@/components/schema-markup";
import { usePageMetadata } from "@/hooks/usePageMetadata";

const AboutPage = () => {
  usePageMetadata({
    title: "About Ctrl Bits | Web, App, Software, UI/UX, Creative, and Marketing Team",
    description:
      "Meet Ctrl Bits, a Nepal-based agency delivering web development, app development, custom software, UI/UX design, creative services, and digital marketing.",
    keywords:
      "about Ctrl Bits, about control bits, web development agency Nepal team, app development Nepal team, custom software Nepal, UI/UX design Nepal, creative services Nepal, digital marketing agency Nepal team",
    ogTitle: "About Ctrl Bits",
    ogDescription:
      "The team behind Ctrl Bits: web development, app development, custom software, UI/UX design, creative services, and digital marketing.",
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
          title="A delivery team for web development, app development, custom software, UI/UX design, creative services, and digital marketing."
          description="Ctrl Bits helps businesses plan, build, and scale websites, apps, software systems, user experiences, creative assets, and growth campaigns with clear execution standards."
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
