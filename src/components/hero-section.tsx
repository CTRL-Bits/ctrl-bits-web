import { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { InfiniteSlider } from "@/components/ui/infinite-slider";
import { ProgressiveBlur } from "@/components/ui/progressive-blur";
import {
  ArrowRight,
  Zap,
  Code,
  Globe,
  Sparkles,
  Star,
  Rocket,
  Shield,
} from "lucide-react";
import { Company, CompanyResponse } from "@/types";
import axios from "axios";
import "@/fonts.css";
import VariableProximity from "./variable-proximity-text";

// Define reusable badge components
interface FloatingBadgeProps {
  icon: React.ElementType;
  text: string;
  className?: string;
}

const FloatingBadge = ({
  icon: Icon,
  text,
  className = "",
}: FloatingBadgeProps) => (
  <div
    className={`absolute rounded-full bg-background/80 backdrop-blur-md px-3 py-1.5 text-xs font-medium flex items-center space-x-1 ring-1 shadow-lg ${className}`}
  >
    <Icon className="h-3.5 w-3.5 mr-1" />
    <span>{text}</span>
  </div>
);

export default function HeroSection() {
  const containerRef = useRef(null);
  const [companies, setCompanies] = useState<Company[]>([]);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    // Parallax effect on scroll
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const fetchCompanies = async () => {
    try {
      const response = await axios.get<CompanyResponse>(
        "https://api.ctrlbits.xyz/api/companies"
      );
      setCompanies(response.data.results);
    } catch (error) {
      console.error("Failed to fetch companies:", error);
      // Fallback data with improved logos
      setCompanies([
        {
          id: 1,
          name: "TechCorp",
          logo: "/logos/tech-corp.svg",
          invert: false,
        },
        {
          id: 2,
          name: "InnovateLabs",
          logo: "/logos/innovate-labs.svg",
          invert: false,
        },
        {
          id: 3,
          name: "FutureSoft",
          logo: "/logos/future-soft.svg",
          invert: false,
        },
        { id: 4, name: "WebNest", logo: "/logos/web-nest.svg", invert: false },
        {
          id: 5,
          name: "CodeMasters",
          logo: "/logos/code-masters.svg",
          invert: false,
        },
      ]);
    }
  };

  useEffect(() => {
    fetchCompanies();
  }, []);

  return (
    <main className="relative overflow-hidden transition-all duration-700 ease-out">
      {/* Background gradients */}
      <div className="absolute inset-0 bg-mesh-gradient pointer-events-none" />
      <div
        className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-primary/20 blur-3xl transform-gpu"
        style={{ transform: `translateY(${scrollY * 0.1}px)` }}
      />
      <div
        className="absolute top-1/2 -right-48 h-96 w-96 rounded-full bg-secondary/20 blur-3xl transform-gpu"
        style={{ transform: `translateY(${scrollY * -0.15}px)` }}
      />
      <div
        className="absolute bottom-24 left-1/3 h-64 w-64 rounded-full bg-accent/15 blur-3xl transform-gpu"
        style={{ transform: `translateY(${scrollY * 0.05}px)` }}
      />

      <section className="relative">
        <div className="py-24 md:py-32 lg:py-40">
          <div
            ref={containerRef}
            className="relative mx-auto flex max-w-7xl flex-col px-6 lg:grid lg:grid-cols-12 lg:gap-12 lg:px-8"
          >
            {/* Left content column */}
            <div className="lg:col-span-7 flex flex-col justify-center">
              <div
                className={`flex items-center space-x-2 mb-6 transition-all duration-700 delay-100 `}
              >
                <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1.5 text-sm font-medium text-primary ring-1 ring-primary/20 backdrop-blur-sm">
                  <Sparkles className="mr-1.5 h-3.5 w-3.5 animate-pulse" />
                  Next-Gen Development
                </span>
              </div>

              <div
                className={`variable-font-container transition-all duration-700 delay-200 `}
              >
                <h1 className="mt-6 max-w-2xl text-balance text-5xl md:text-6xl lg:mt-12 xl:text-7xl">
                  <VariableProximity
                    label="Build Smarter with CtrlBits"
                    fromFontVariationSettings="'wght' 400, 'wdth' 100"
                    toFontVariationSettings="'wght' 800, 'wdth' 125"
                    containerRef={containerRef}
                    radius={200}
                    falloff="gaussian"
                    className="font-bold transition-all duration-100 variable-font bg-clip-text text-transparent bg-gradient-to-r from-primary via-foreground to-secondary"
                  />
                </h1>
              </div>

              <p
                className={`mt-6 max-w-2xl text-lg text-muted-foreground leading-relaxed transition-all duration-700 delay-300
                  `}
              >
                We craft powerful, scalable, and future-ready digital solutions
                that transform businesses —{" "}
                <span className="font-medium text-foreground relative">
                  bit by bit
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary/40 rounded-full"></span>
                </span>
                .
              </p>

              <div
                className={`mt-10 flex flex-col sm:flex-row gap-4 transition-all duration-700 delay-400`}
              >
                <Button
                  asChild
                  size="lg"
                  className="h-12 rounded-full pl-6 pr-5 text-base font-medium shadow-lg shadow-primary/20 hover:shadow-primary/30 hover:scale-105 transition-all group overflow-hidden relative"
                >
                  <Link to="/solutions">
                    <span className="relative z-10 flex items-center">
                      Explore Our Services
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </span>
                    <span className="absolute inset-0 bg-gradient-to-r from-primary to-primary/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="h-12 rounded-full px-6 text-base font-medium border-primary/20 hover:border-primary/50 hover:bg-primary/5 transition-all group"
                >
                  <Link to="/contact">
                    <span className="relative z-10 flex items-center">
                      Let's Talk
                    </span>
                  </Link>
                </Button>
              </div>

              <div
                className={`mt-10 grid grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-3 lg:mt-16 transition-all duration-700 delay-500`}
              >
                {[
                  {
                    icon: <Code className="h-5 w-5 text-primary" />,
                    text: "Modern Stack",
                  },
                  {
                    icon: <Globe className="h-5 w-5 text-primary" />,
                    text: "Global Reach",
                  },
                  {
                    icon: <Zap className="h-5 w-5 text-primary" />,
                    text: "Rapid Delivery",
                  },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-x-2.5 text-sm font-medium text-foreground group hover:scale-105 transition-all"
                  >
                    <div className="flex items-center justify-center h-8 w-8 rounded-full bg-primary/10 ring-1 ring-primary/20 group-hover:bg-primary/20 transition-all">
                      {item.icon}
                    </div>
                    {item.text}
                  </div>
                ))}
              </div>
            </div>

            {/* Right visual column */}
            <div className="hidden lg:col-span-5 lg:flex lg:items-center transition-all duration-700 delay-300">
              <div className="relative size-full rounded-2xl overflow-hidden bg-gradient-to-br from-background/80 via-background/60 to-muted/40 backdrop-blur-lg p-1.5 shadow-2xl ring-1 ring-white/20">
                {/* Image container with better optimization */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="h-full w-full overflow-hidden rounded-xl">
                    <img
                      src="/logo.png"
                      alt="Digital solutions illustration"
                      width={600}
                      height={600}
                      loading="eager"
                      className="h-full w-full object-cover object-center opacity-90 dark:opacity-70 transition-transform hover:scale-105 duration-700"
                    />
                  </div>
                </div>

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent"></div>

                {/* Floating badges with improved positioning and animations */}
                <FloatingBadge
                  icon={Star}
                  text="Premium Quality"
                  className="top-8 right-8 text-primary ring-primary/20 animate-float"
                />
                <FloatingBadge
                  icon={Zap}
                  text="Cutting Edge Tech"
                  className="bottom-8 left-8 text-primary ring-primary/20 animate-float-delay"
                />
                <FloatingBadge
                  icon={Rocket}
                  text="Innovation"
                  className="top-24 left-8 text-muted-foreground ring-accent/20 animate-float"
                />
                <FloatingBadge
                  icon={Shield}
                  text="Reliable Security"
                  className="bottom-24 right-8 text-muted-foreground ring-secondary/20 animate-float-delay"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced trusted by section with glassmorphism */}
      <section
        className={`bg-muted/30 py-14 backdrop-blur-md relative border-y border-muted/50 transition-all duration-700 delay-600`}
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="md:w-auto md:min-w-48">
              <p className="text-center md:text-start font-medium flex items-center">
                <span className="hidden md:inline-block h-0.5 w-6 bg-primary/60 mr-3"></span>
                Trusted by innovative teams
              </p>
            </div>

            <div className="relative flex-1 overflow-hidden rounded-xl py-4">
              <InfiniteSlider speedOnHover={20} speed={40} gap={100}>
                {companies.map((company, index) => (
                  <div
                    className="flex items-center group"
                    key={company.id || index}
                  >
                    <img
                      className={`mx-auto h-7 w-auto transition-all group-hover:scale-110 duration-300 ${
                        company.invert ? "invert dark:invert-0" : ""
                      }`}
                      src={company.logo}
                      alt={`${company.name} Logo`}
                      height="28"
                      width="auto"
                    />
                  </div>
                ))}
              </InfiniteSlider>

              <ProgressiveBlur
                className="pointer-events-none absolute left-0 top-0 h-full w-24"
                direction="left"
                blurIntensity={1.5}
              />
              <ProgressiveBlur
                className="pointer-events-none absolute right-0 top-0 h-full w-24"
                direction="right"
                blurIntensity={1.5}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Add keyframe animations for floating badges */}
      <style>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        @keyframes float-delay {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
        .animate-float-delay {
          animation: float-delay 5s ease-in-out infinite;
          animation-delay: 1s;
        }
      `}</style>
    </main>
  );
}
