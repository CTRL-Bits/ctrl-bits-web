import FeaturesHomeSection from "@/components/home/features-home";
import HeroClientsShowcase from "@/components/home/hero-clients-showcase";
import HeroSection from "@/components/home/hero-section";
import ServicesHome from "@/components/home/services-home";
// import Testimonials from "@/components/home/testimonials-section";
import { TestimonialsSection } from "@/components/home/testimonials-section";
import SchemaMarkup from "@/components/schema-markup";
import { usePageMetadata } from "@/hooks/usePageMetadata";

const HomePage = () => {
  usePageMetadata({
    title: "Ctrl Bits — Web Development & Digital Marketing Agency in Kathmandu, Nepal",
    description:
      "Ctrl Bits is a Kathmandu-based agency offering web development, digital marketing, SEO, video editing, graphic design, and custom software development services for Nepal and international clients.",
    keywords:
      "Ctrl Bits, ctrl bits, Ctrl Bits Nepal, web development agency Kathmandu, digital marketing agency Kathmandu, SEO services Kathmandu, video editing Kathmandu, graphic design Kathmandu, software development Kathmandu",
    ogTitle:
      "Kathmandu Web Development & Digital Marketing Agency | Ctrl Bits",
    ogDescription:
      "Kathmandu-based services in web development, digital marketing, SEO, video editing, graphic design, and custom software development.",
    ogUrl: "https://www.ctrlbits.com/",
    canonical: "https://www.ctrlbits.com/",
    twitterCard: "summary_large_image",
  });

  return (
    <>
      <SchemaMarkup type="localBusiness" />
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
