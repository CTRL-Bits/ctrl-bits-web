import Features from "@/components/features-section";
import HeroSection from "@/components/hero-section";
import Testimonials from "@/components/testimonials-section";
import { Card } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
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
      <Features />
      <Testimonials />
      <div className="w-full flex justify-center">
        <Card className="rounded-4xl w-2/3 bg-gradient-to-r from-[#007bff48] to-transparent backdrop:blur-2xl flex justify-center items-center mt-4">
          <h2 className="text-nowrap flex items-center text-3xl font-bold">
            Ready to Join these Happy Clients?
          </h2>
          <p>
            Let's build your next project with performance, security &
            creativity.
          </p>
          <Link className="flex items-center hover:underline" to="/contact">
            Contact Us Now
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Card>
      </div>
    </>
  );
};

export default HomePage;
