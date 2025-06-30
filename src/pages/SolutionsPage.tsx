import { useState, useRef, useEffect } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Code,
  Cpu,
  ShieldCheck,
  BarChart3,
  ChevronRight,
  Palette,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { BorderBeam } from "@/components/magicui/border-beam";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import TechStack from "@/components/tech-stack";
import { Helmet } from "react-helmet-async";

// Image imports - ensure these paths are correct for your project structure
import WebDev from "@/assets/images/WebDev.png";
import Automation from "@/assets/images/Automation.png";
import Infrastructure from "@/assets/images/Cloud.png";
import Analytics from "@/assets/images/Analytics.png";
import Design from "@/assets/images/Design.png";
import { Card } from "@/components/ui/card";

// Create a custom solution card component
type SolutionCardProps = {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  title: string;
  description: string;
  className?: string;
};

const SolutionCard = ({
  icon: Icon,
  title,
  description,
  className = "",
}: SolutionCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5 }}
    className={`relative group p-6 rounded-xl border bg-background/50 backdrop-blur-sm hover:bg-background transition-all duration-300 ${className}`}
  >
    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
      <Icon className="h-6 w-6 text-primary" />
    </div>
    <h3 className="text-xl font-medium mb-2">{title}</h3>
    <p className="text-muted-foreground">{description}</p>
  </motion.div>
);

export default function SolutionsPage() {
  type ImageKey = "item-1" | "item-2" | "item-3" | "item-4" | "item-5";
  const [activeItem, setActiveItem] = useState<ImageKey>("item-1");
  const [scrollY, setScrollY] = useState(0);
  const showcaseRef = useRef(null);

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

  const images = {
    "item-1": {
      image: WebDev,
      alt: "Custom Web Development",
    },
    "item-2": {
      image: Automation,
      alt: "Automation Process Flow",
    },
    "item-3": {
      image: Infrastructure,
      alt: "Cloud Infrastructure and Security",
    },
    "item-4": {
      image: Analytics,
      alt: "Analytics Dashboard",
    },
    "item-5": {
      image: Design,
      alt: "Creative Design & Video Editing",
    },
  };

  return (
    <>
      <Helmet>
        <title>Smart Web & IT Solutions in Nepal | CtrlBits</title>
        <meta
          name="description"
          content={
            "CtrlBits is a performance-driven custom web development company in Nepal. We build scalable websites, automate workflows, and secure your infrastructure for growth."
          }
        />
      </Helmet>
      <main className="relative overflow-hidden bg-background transition-all duration-700 ease-out">
        {/* Background gradients inspired by HeroSection */}
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-primary/10 blur-3xl transform-gpu"
            style={{ transform: `translateY(${scrollY * 0.1}px)` }}
          />
          <div
            className="absolute top-1/2 -left-48 h-96 w-96 rounded-full bg-secondary/10 blur-3xl transform-gpu"
            style={{ transform: `translateY(${scrollY * -0.15}px)` }}
          />
          <div
            className="absolute bottom-24 left-1/3 h-64 w-64 rounded-full bg-accent/10 blur-3xl transform-gpu"
            style={{ transform: `translateY(${scrollY * 0.05}px)` }}
          />
        </div>

        {/* Hero Section */}
        <section className="py-24 md:py-32 lg:py-40">
          <div className="mx-auto max-w-5xl px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="relative z-10 mx-auto max-w-3xl space-y-6 text-center"
            >
              <div className="flex items-center justify-center space-x-2 mb-6">
                <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1.5 text-sm font-medium text-primary ring-1 ring-primary/20 backdrop-blur-sm">
                  <Sparkles className="mr-1.5 h-3.5 w-3.5 animate-pulse" />
                  Transformative Tech Solutions
                </span>
              </div>

              <h1 className="text-balance text-4xl font-bold lg:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-primary via-foreground to-secondary">
                Solutions That Power Your Growth
              </h1>

              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                At Ctrl Bits, we blend code, creativity, and cutting-edge tools,
                helping businesses thrive in the digital era— bit by{" "}
                <span className="font-medium text-foreground relative">
                  bit
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary/40 rounded-full"></span>
                </span>
                .
              </p>
            </motion.div>
          </div>
        </section>

        {/* Interactive Showcase */}
        <section className="py-12 md:py-16" ref={showcaseRef}>
          <div className="mx-auto max-w-6xl px-6">
            <h2 className="text-3xl text-center mb-8 font-bold">
              Our Core Services
            </h2>
            <div className="grid gap-12 md:grid-cols-2 lg:gap-16">
              <div className="relative">
                <Accordion
                  type="single"
                  value={activeItem}
                  onValueChange={(value) => setActiveItem(value as ImageKey)}
                  className="w-full"
                >
                  <AccordionItem value="item-1" className="border-muted/50">
                    <AccordionTrigger className="py-5 hover:no-underline group">
                      <div className="flex items-center gap-3 text-base">
                        <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                          <Code className="h-5 w-5 text-primary" />
                        </div>
                        <h3 className="text-lg">Custom Web Development</h3>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-4 pb-6 pt-2 text-muted-foreground">
                      We offer top-tier custom web development in Nepal,
                      combining cutting-edge technologies with business-first
                      strategies.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-2" className="border-muted/50">
                    <AccordionTrigger className="py-5 hover:no-underline group">
                      <div className="flex items-center gap-3 text-base">
                        <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                          <Cpu className="h-5 w-5 text-primary" />
                        </div>
                        <h3 className="text-lg">Business Process Automation</h3>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-4 pb-6 pt-2 text-muted-foreground">
                      We provide business process automation services in Nepal
                      that reduce manual tasks, boost operational efficiency,
                      and leverage the power of AI./From smart workflow systems
                      to intelligent decision engines, we help businesses run
                      smarter and faster.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-3" className="border-muted/50">
                    <AccordionTrigger className="py-5 hover:no-underline group">
                      <div className="flex items-center gap-3 text-base">
                        <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                          <ShieldCheck className="h-5 w-5 text-primary" />
                        </div>
                        <h3 className="text-lg">
                          Secure & Scalable Infrastructure
                        </h3>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-4 pb-6 pt-2 text-muted-foreground">
                      Protect your digital assets with secure, scalable
                      infrastructure in Nepal. We configure reliable cloud
                      hosting with enterprise-grade encryption, automated
                      backups, and performance optimization to support growing
                      businesses in Nepal.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-4" className="border-muted/50">
                    <AccordionTrigger className="py-5 hover:no-underline group">
                      <div className="flex items-center gap-3 text-base">
                        <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                          <BarChart3 className="h-5 w-5 text-primary" />
                        </div>
                        <h3 className="text-lg">
                          Analytics & Performance Monitoring
                        </h3>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-4 pb-6 pt-2 text-muted-foreground">
                      Track every key metric with our custom analytics
                      dashboards and performance monitoring tools. From user
                      engagement to uptime and KPIs, we provide real-time,
                      actionable insights to fuel data-driven decisions.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-5" className="border-muted/50">
                    <AccordionTrigger className="py-5 hover:no-underline group">
                      <div className="flex items-center gap-3 text-base">
                        <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                          <Palette className="h-5 w-5 text-primary" />
                        </div>
                        <h3 className="text-lg">
                          Graphic Design & Video Editing
                        </h3>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-4 pb-6 pt-2 text-muted-foreground">
                      We offer graphic designs and video editing in Nepal. From
                      brand identity creation or social media content, our
                      creative team has got you covered with visually striking
                      assets that resonate with your audience and brand value..
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>

              <div className="relative flex overflow-hidden rounded-3xl border p-3 bg-background/70 backdrop-blur-sm shadow-xl">
                <div className="absolute inset-0 right-0 ml-auto w-15 border-l bg-[repeating-linear-gradient(-45deg,var(--color-border),var(--color-border)_1px,transparent_1px,transparent_8px)]"></div>
                <div className="relative w-full rounded-2xl bg-background/40 aspect-[76/59]">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={`${activeItem}-id`}
                      initial={{ opacity: 0, y: 6, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 6, scale: 0.98 }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                      className="size-full overflow-hidden rounded-2xl border bg-zinc-900 shadow-md"
                    >
                      <img
                        src={images[activeItem].image}
                        className="size-full object-cover object-left-top dark:mix-blend-lighten hover:scale-105 transition-transform duration-700"
                        alt={images[activeItem].alt}
                        width={1207}
                        height={929}
                      />
                    </motion.div>
                  </AnimatePresence>
                </div>
                <BorderBeam
                  duration={8}
                  size={200}
                  className="from-transparent via-primary/40 to-transparent dark:via-white/30"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Solution Cards Section */}
        <section className="py-16 md:py-24">
          <div className="mx-auto max-w-6xl px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-semibold mb-4">
                How We Power Your Success
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Our comprehensive approach ensures that every aspect of your
                digital presence is optimized for growth and performance.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <SolutionCard
                icon={Code}
                title="Modern Technology Stack"
                description="Fast, scalable, and future-ready web applications"
              />
              <SolutionCard
                icon={ShieldCheck}
                title="Enterprise-Grade Security"
                description="SSL, encryption, secure coding standards"
              />
              <SolutionCard
                icon={Cpu}
                title="Intelligent Automation"
                description="Smarter systems with intelligent workflows"
              />
              <SolutionCard
                icon={BarChart3}
                title="Data-Driven Insights"
                description="Real-time analytics and dashboard development"
              />
              <SolutionCard
                icon={Palette}
                title="Engaging Design"
                description="Stunning visuals, intuitive UI/UX"
              />
              <SolutionCard
                icon={Sparkles}
                title="Continuous Innovation"
                description="Future-ready digital strategy"
              />
            </div>
          </div>
        </section>

        {/* Tech Stack Section */}
        <section className="py-16 md:py-24 bg-muted/20">
          <div className="mx-auto max-w-6xl px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl font-semibold mb-4">
                Technologies We Master
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                A 360° Approach to Digital Growth
              </p>
            </motion.div>

            <TechStack />

            <div className="mt-16 flex flex-col md:flex-row gap-6 justify-center items-center">
              <Button
                asChild
                size="lg"
                className="h-12 rounded-full pl-6 pr-5 text-base shadow-lg shadow-primary/10 hover:shadow-primary/20 transition-all group"
              >
                <Link to="/portfolio">
                  <span className="text-nowrap flex items-center">
                    View Our Projects
                    <ChevronRight className="ml-1 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Link>
              </Button>
            </div>
            <Card className="rounded-4xl bg-gradient-to-r from-[#007bff48] to-transparent backdrop:blur-2xl flex justify-center items-center mt-4">
              <h2 className="text-nowrap flex items-center text-3xl font-bold">
                Ready to Transform Your Business?
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
        </section>
      </main>
    </>
  );
}
