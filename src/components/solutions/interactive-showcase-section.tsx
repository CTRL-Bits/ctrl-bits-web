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
  Palette,
  LucideIcon,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { BorderBeam } from "@/components/magicui/border-beam";
import { useRef, useState } from "react";

import WebDev from "@/assets/images/WebDev.png";
import Automation from "@/assets/images/Automation.png";
import Infrastructure from "@/assets/images/Cloud.png";
import Analytics from "@/assets/images/Analytics.png";
import Design from "@/assets/images/Design.png";

interface ServiceItem {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  image: string;
  alt: string;
}

export default function InteractiveShowcaseSection() {
  const services: ServiceItem[] = [
    {
      id: "item-1",
      title: "Custom Web Development",
      description:
        "At Ctrl Bits, we specialize in custom web development in Nepal — crafting fast, SEO-optimized, and mobile-responsive websites that drive real business results. From corporate portals and e-commerce platforms to full-scale web applications built with React, Django, or Next.js, we deliver performance, scalability, and design precision that align with your brand’s digital vision.",
      icon: Code,
      image: WebDev,
      alt: "Custom web development in Nepal by Ctrl Bits",
    },
    {
      id: "item-2",
      title: "Business Process Automation",
      description:
        "Ctrl Bits provides business process automation (BPA) in Nepal to streamline repetitive tasks, minimize human error, and increase productivity. We build intelligent workflow systems, form automation, and AI-assisted decision platforms that integrate with your existing tools — helping businesses save time, reduce costs, and focus on growth. Our automation tools are designed for scalability and real-world efficiency.",
      icon: Cpu,
      image: Automation,
      alt: "Automation services Nepal by Ctrl Bits",
    },
    {
      id: "item-3",
      title: "Secure & Scalable Infrastructure",
      description:
        "We design and manage secure, scalable cloud infrastructures tailored for Nepalese businesses. From cloud hosting setup and data backups to DevOps pipelines and load balancing, Ctrl Bits ensures your digital foundation is reliable, fast, and future-proof. Our infrastructure solutions are powered by AWS, Google Cloud, or DigitalOcean — optimized for uptime, security, and compliance.",
      icon: ShieldCheck,
      image: Infrastructure,
      alt: "Secure cloud infrastructure and DevOps services in Nepal by Ctrl Bits agency",
    },
    {
      id: "item-4",
      title: "Digital Marketing & Analytics",
      description:
        "Grow visibility with SEO, paid ads, and conversion-focused campaigns. Ctrl Bits combines analytics dashboards and performance tracking to improve rankings, leads, and ROI.",
      icon: BarChart3,
      image: Analytics,
      alt: "Digital marketing and analytics services in Nepal by Ctrl Bits",
    },
    {
      id: "item-5",
      title: "Graphic Design & Video Editing",
      description:
        "Ctrl Bits provides graphic design, motion graphics, and video editing in Nepal. From brand identity to social media visuals and promotional videos, we craft content that strengthens your digital presence.",
      icon: Palette,
      image: Design,
      alt: "Creative design supporting digital marketing Nepal by Ctrl Bits",
    },
  ];

  const [activeItem, setActiveItem] = useState<string>(services[0].id);
  const showcaseRef = useRef(null);

  const currentService =
    services.find((service) => service.id === activeItem) || services[0];

  return (
    <section
      id="services"
      className="py-12 md:py-16"
      ref={showcaseRef}
      aria-labelledby="core-services-heading"
    >
      <div className="mx-auto max-w-6xl px-6">
        <h2
          id="core-services-heading"
          className="text-3xl text-center mb-8 font-bold tracking-tight"
        >
          Our Core Services
        </h2>

        <p className="max-w-3xl mx-auto text-center text-muted-foreground mb-12">
          Ctrl Bits delivers web development, digital marketing, SEO, video
          editing, graphic design, automation, and software solutions to help
          businesses grow faster in Kathmandu and beyond.
        </p>

        <div className="grid gap-12 md:grid-cols-2 lg:gap-16">
          {/* Accordion Section */}
          <div className="relative">
            <Accordion
              type="single"
              value={activeItem}
              onValueChange={(value) => setActiveItem(value || services[0].id)}
              className="w-full"
            >
              {services.map((service) => {
                const IconComponent = service.icon;
                return (
                  <AccordionItem
                    key={service.id}
                    value={service.id}
                    className="border-muted/50 cursor-target"
                  >
                    <AccordionTrigger
                      className="py-5 cursor-pointer hover:no-underline group"
                      aria-label={`Learn more about ${service.title}`}
                    >
                      <div className="flex items-center gap-3 text-base">
                        <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                          <IconComponent
                            className="h-5 w-5 text-primary"
                            aria-hidden="true"
                          />
                        </div>
                        <h3 className="text-lg font-medium">{service.title}</h3>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-4 pb-6 pt-2 text-muted-foreground leading-relaxed">
                      {service.description}
                    </AccordionContent>
                  </AccordionItem>
                );
              })}
            </Accordion>
          </div>

          {/* Image Showcase Section */}
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
                    src={currentService.image}
                    className="size-full object-cover object-center dark:mix-blend-lighten hover:scale-105 transition-transform duration-700"
                    alt={`${currentService.alt || 'Service'} - Web development, marketing, and software services by Ctrl Bits agency in Kathmandu`}
                    width={1207}
                    height={929}
                    loading="lazy"
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
  );
}
