import { useRef, useEffect, useState } from "react";
import { Cpu, Zap, ArrowRight, Shield, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import VariableProximity from "./variable-proximity-text";

export default function ContentSection() {
  const containerRef = useRef(null);
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

  // Feature grid item component
  type FeatureItemProps = {
    icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
    title: string;
    description: string;
  };

  const FeatureItem = ({
    icon: Icon,
    title,
    description,
  }: FeatureItemProps) => (
    <div className="space-y-3 group hover:scale-105 transition-all duration-300">
      <div className="flex items-center gap-2">
        <div className="flex items-center justify-center h-8 w-8 rounded-full bg-primary/10 ring-1 ring-primary/20 group-hover:bg-primary/20 transition-all">
          <Icon className="size-4 text-primary" />
        </div>
        <h3 className="text-sm font-medium">{title}</h3>
      </div>
      <p className="text-muted-foreground text-sm leading-relaxed">
        {description}
      </p>
    </div>
  );

  return (
    <section className="py-16 md:py-32 relative overflow-hidden">
      {/* Background gradients */}
      <div
        className="absolute -top-64 right-0 h-96 w-96 rounded-full bg-primary/10 blur-3xl transform-gpu"
        style={{ transform: `translateY(${scrollY * 0.08}px)` }}
      />
      <div
        className="absolute bottom-24 -left-48 h-64 w-64 rounded-full bg-secondary/10 blur-3xl transform-gpu"
        style={{ transform: `translateY(${scrollY * -0.12}px)` }}
      />

      <div
        ref={containerRef}
        className="mx-auto max-w-5xl space-y-8 px-6 md:space-y-16 relative"
      >
        {/* Section header with improved styling */}
        <div className="flex flex-col space-y-4">
          <div className="flex items-center space-x-2 mb-2 transition-all duration-700">
            <span className="inline-flex items-center rounded-full bg-secondary/10 px-3 py-1.5 text-sm font-medium text-secondary ring-1 ring-secondary/20 backdrop-blur-sm">
              <Shield className="mr-1.5 h-3.5 w-3.5" />
              Our Mission
            </span>
          </div>

          <div className="variable-font-container transition-all duration-700">
            <h1 className="relative z-10 max-w-xl text-4xl font-medium lg:text-5xl">
              <VariableProximity
                label="About Ctrl Bits – Empowering Businesses with Technology"
                fromFontVariationSettings="'wght' 400, 'wdth' 100"
                toFontVariationSettings="'wght' 700, 'wdth' 120"
                containerRef={containerRef}
                radius={200}
                falloff="gaussian"
                className="font-bold transition-all duration-100 variable-font bg-clip-text text-transparent bg-gradient-to-r from-secondary via-foreground to-primary"
              />
            </h1>
          </div>
        </div>

        {/* Main content grid with improved layout and animations */}
        <div className="grid gap-10 sm:grid-cols-2 md:gap-12 lg:gap-24">
          {/* Left text content column */}
          <div className="relative space-y-6 transition-all duration-700">
            <p className="text-lg text-muted-foreground leading-relaxed">
              At Ctrl Bits, we strive to build more than just software.{" "}
              <span className="font-medium text-foreground relative">
                We empower businesses
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary/40 rounded-full"></span>
              </span>{" "}
              with cutting-edge solutions, offering tools to innovate, optimize,
              and scale operations.
            </p>

            <p className="text-muted-foreground leading-relaxed">
              We believe in creating an entire ecosystem that supports
              businesses — from seamless integrations to the tools and platforms
              developers need to push boundaries and stay ahead in the digital
              world.
            </p>

            {/* Feature grid with enhanced styling */}
            <div className="grid grid-cols-1 gap-6 pt-6 sm:grid-cols-2 sm:gap-8">
              <FeatureItem
                icon={Zap}
                title="Speed & Efficiency"
                description="Our solutions are designed to accelerate processes, ensuring faster delivery and more responsive systems."
              />

              <FeatureItem
                icon={Cpu}
                title="Performance"
                description="With powerful tech stacks, we deliver high-performing applications that scale with your business needs."
              />

              <FeatureItem
                icon={Shield}
                title="Security"
                description="Enterprise-grade protection built into every layer of our solutions to safeguard your business data."
              />

              <FeatureItem
                icon={Globe}
                title="Global Scale"
                description="Solutions designed to work seamlessly across regions with multi-language and compliance support."
              />
            </div>

            {/* Added CTA button */}
            <div className="pt-4">
              <Button
                size="lg"
                className="h-11 rounded-full pl-6 pr-5 text-base font-medium shadow-lg shadow-primary/20 hover:shadow-primary/30 hover:scale-105 transition-all group overflow-hidden relative"
              >
                <span className="relative z-10 flex items-center">
                  Learn More About Our Approach
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
                <span className="absolute inset-0 bg-gradient-to-r from-primary to-primary/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Button>
            </div>
          </div>

          {/* Right image column with improved styling */}
          <div className="relative mt-6 sm:mt-0 transition-all duration-700 delay-200">
            <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-background/80 via-background/60 to-muted/40 backdrop-blur-lg p-1.5 shadow-2xl ring-1 ring-white/20">
              {/* Image container with responsive design */}
              <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
                <img
                  src="https://images.unsplash.com/photo-1537498425277-c283d32ef9db"
                  className="h-full w-full object-cover object-center hidden dark:block transition-transform hover:scale-105 duration-700"
                  alt="tech solutions illustration dark"
                  width={600}
                  height={450}
                  loading="lazy"
                />
                <img
                  src="https://images.unsplash.com/photo-1453928582365-b6ad33cbcf64"
                  className="h-full w-full object-cover object-center block dark:hidden transition-transform hover:scale-105 duration-700"
                  alt="tech solutions illustration light"
                  width={600}
                  height={450}
                  loading="lazy"
                />

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent"></div>

                {/* Floating stats with glassmorphism */}
                <div className="absolute bottom-4 left-4 right-4 rounded-lg bg-background/70 backdrop-blur-md p-4 ring-1 ring-white/10 shadow-lg">
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <p className="text-xs text-muted-foreground">
                        Client Satisfaction
                      </p>
                      <p className="text-2xl font-bold">98%</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">
                        Projects Completed
                      </p>
                      <p className="text-2xl font-bold">200+</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute -top-6 -right-6 h-20 w-20 rounded-full bg-primary/10 blur-xl"></div>
            <div className="absolute -bottom-4 -left-4 h-16 w-16 rounded-full bg-secondary/10 blur-xl"></div>
          </div>
        </div>
      </div>

      {/* Add keyframe animations */}
      <style>{`
        @keyframes tech-scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-tech-scroll {
          animation: tech-scroll 20s linear infinite;
        }
      `}</style>
    </section>
  );
}
