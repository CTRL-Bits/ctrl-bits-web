import ContentSection from "@/components/about-us-content-section";
import TeamSection from "@/components/team-section";
import { Helmet } from "react-helmet-async";

const AboutPage = () => {
  return (
    <>
      <Helmet>
        <title>About Us | Web App Development With CtrlBits</title>
        <meta
          name="description"
          content="Discover more about CtrlBits, Nepal's best next-generation software development Company, delivering powerful digital solutions for Nepal and beyond."
        />
      </Helmet>
      <ContentSection />
      <TeamSection />
    </>
  );
};

export default AboutPage;
