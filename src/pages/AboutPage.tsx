import ContentSection from "@/components/about-us-content-section";
import TeamSection from "@/components/team-section";
import { usePageMetadata } from "@/hooks/usePageMetadata";

const AboutPage = () => {
  usePageMetadata({
    title: "About Us",
    description:
      "Discover more about CtrlBits, Nepal's best next-generation software development Company, delivering powerful digital solutions.",
    keywords:
      "about us, software development company, Nepal, digital solutions, custom development",
    ogTitle: "About Us | Web App Development With CtrlBits",
    ogDescription:
      "Learn about CtrlBits, Nepal's leading software development company.",
  });

  return (
    <>
      <ContentSection />
      <TeamSection />
    </>
  );
};

export default AboutPage;
