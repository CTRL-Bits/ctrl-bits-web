import ContentSection from "@/components/about-us-content-section";
import TeamSection from "@/components/team-section";
import { usePageMetadata } from "@/hooks/usePageMetadata";

const AboutPage = () => {
  usePageMetadata({
    title: "About Us",
    description:
      "Discover more about Ctrl Bits, Nepal's best next-generation software development Company, delivering powerful digital solutions.",
    keywords:
      "about us, software development company, Nepal, digital solutions, custom development",
    ogTitle: "About Us | Web App Development With Ctrl Bits",
    ogDescription:
      "Learn about Ctrl Bits, Nepal's leading software development company.",
  });

  return (
    <>
      <ContentSection />
      <TeamSection />
    </>
  );
};

export default AboutPage;
