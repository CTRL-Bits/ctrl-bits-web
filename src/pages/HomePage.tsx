import FeaturesHomeSection from "@/components/home/features-home";
import HeroClientsShowcase from "@/components/home/hero-clients-showcase";
import HeroSection from "@/components/home/hero-section";
import ServicesHome from "@/components/home/services-home";
// import Testimonials from "@/components/home/testimonials-section";
import { TestimonialsSection } from "@/components/home/testimonials-section";
import { usePageMetadata } from "@/hooks/usePageMetadata";

const HomePage = () => {
  usePageMetadata({
    title: "Ctrl Bits",
    description:
      "Ctrl Bits offers web development, digital marketing, and development services in Nepal and internationally.",
    keywords:
      "web development company in Nepal, web development, digital marketing, software development, Nepal",
    ogTitle: "Ctrl Bits - Web Development Company in Nepal",
    ogDescription:
      "Ctrl Bits offers web development, digital marketing, and development services in Nepal and internationally.",
  });

  return (
    <>
      <HeroSection />
      <HeroClientsShowcase />
      <div className="w-full flex flex-col gap-16">
        <FeaturesHomeSection />
        <ServicesHome />
        <TestimonialsSection />
      </div>
    </>
  );
};

export default HomePage;
