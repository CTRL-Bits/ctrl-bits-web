import FeaturesHomeSection from "@/components/home/features-home";
import HeroClientsShowcase from "@/components/home/hero-clients-showcase";
import HeroSection from "@/components/home/hero-section";
import ServicesHome from "@/components/home/services-home";
// import Testimonials from "@/components/home/testimonials-section";
import { TestimonialsSection } from "@/components/home/testimonials-section";
import { Helmet } from "react-helmet-async";

const HomePage = () => {
  return (
    <>
      <Helmet>
        <title>Ctrl Bits - Custom Web and IT Solutions in Nepal</title>
        <meta
          name="description"
          content="Ctrl Bits offers next-generation web development and automation services tailored to your business needs in Nepal."
        />
      </Helmet>
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
