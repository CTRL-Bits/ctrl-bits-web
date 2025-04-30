import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Code, Cpu, ShieldCheck, BarChart3, ChevronRight } from "lucide-react";
import { useState } from "react";
// Fix for motion library import
import { AnimatePresence, motion } from "framer-motion";
import { BorderBeam } from "@/components/magicui/border-beam";
// Image imports - ensure these paths are correct for your project structure
import WebDev from "@/assets/images/WebDev.png";
import Automation from "@/assets/images/Automation.png";
import Infrastructure from "@/assets/images/Cloud.png";
import Analytics from "@/assets/images/Analytics.png";
import Design from "@/assets/images/Design.png";
import TechStack from "@/components/tech-stack";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function SolutionsPage() {
  type ImageKey = "item-1" | "item-2" | "item-3" | "item-4" | "item-5";
  const [activeItem, setActiveItem] = useState<ImageKey>("item-1");

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
    <section className="py-12 md:py-20 lg:py-32">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b sm:inset-6 sm:rounded-b-3xl dark:block dark:to-[color-mix(in_oklab,var(--color-zinc-900)_75%,var(--color-background))]"></div>
      <div className="mx-auto max-w-5xl space-y-8 px-6 md:space-y-16 lg:space-y-20 dark:[--color-border:color-mix(in_oklab,var(--color-white)_10%,transparent)]">
        <div className="relative z-10 mx-auto max-w-2xl space-y-6 text-center">
          <h2 className="text-balance text-4xl font-semibold lg:text-6xl text-primary">
            Solutions That Power Your Growth
          </h2>
          <p className="text-muted-foreground">
            At Ctrl Bits, we blend code, creativity, and cutting-edge tools to
            help businesses thrive in the digital world.
          </p>
        </div>

        <div className="grid gap-12 sm:px-12 md:grid-cols-2 lg:gap-20 lg:px-0">
          <Accordion
            type="single"
            value={activeItem}
            onValueChange={(value) => setActiveItem(value as ImageKey)}
            className="w-full"
          >
            <AccordionItem value="item-1">
              <AccordionTrigger>
                <div className="flex items-center gap-2 text-base">
                  <Code className="size-4" />
                  Custom Web Development
                </div>
              </AccordionTrigger>
              <AccordionContent>
                We craft modern, responsive websites tailored to your brand and
                business goals — built with performance and scalability in mind.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2">
              <AccordionTrigger>
                <div className="flex items-center gap-2 text-base">
                  <Cpu className="size-4" />
                  Business Process Automation
                </div>
              </AccordionTrigger>
              <AccordionContent>
                From internal workflows to client-facing systems, we automate
                repetitive tasks so your team can focus on what matters most.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3">
              <AccordionTrigger>
                <div className="flex items-center gap-2 text-base">
                  <ShieldCheck className="size-4" />
                  Secure & Scalable Infrastructure
                </div>
              </AccordionTrigger>
              <AccordionContent>
                We deploy secure, cloud-optimized backend systems that grow with
                your business — ensuring reliability and data protection.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4">
              <AccordionTrigger>
                <div className="flex items-center gap-2 text-base">
                  <BarChart3 className="size-4" />
                  Analytics & Performance Monitoring
                </div>
              </AccordionTrigger>
              <AccordionContent>
                Get clear insights into user behavior and system performance so
                you can make informed decisions with confidence.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5">
              <AccordionTrigger>
                <div className="flex items-center gap-2 text-base">
                  <Code className="size-4" />
                  Graphic Design & Video Editing
                </div>
              </AccordionTrigger>
              <AccordionContent>
                From eye-catching social media posts to polished promotional
                videos, our creative team helps bring your brand to life
                visually.
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <div className="relative flex overflow-hidden rounded-3xl border p-2 bg-background">
            <div className="absolute inset-0 right-0 ml-auto w-15 border-l bg-[repeating-linear-gradient(-45deg,var(--color-border),var(--color-border)_1px,transparent_1px,transparent_8px)]"></div>
            <div className="relative w-[calc(3/4*100%+3rem)] rounded-2xl bg-background aspect-[76/59]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${activeItem}-id`}
                  initial={{ opacity: 0, y: 6, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 6, scale: 0.98 }}
                  transition={{ duration: 0.2 }}
                  className="size-full overflow-hidden rounded-2xl border bg-zinc-900 shadow-md"
                >
                  <img
                    src={images[activeItem].image}
                    className="size-full object-cover object-left-top dark:mix-blend-lighten"
                    alt={images[activeItem].alt}
                    width={1207}
                    height={929}
                  />
                </motion.div>
              </AnimatePresence>
            </div>
            <BorderBeam
              duration={6}
              size={200}
              className="from-transparent via-yellow-700 to-transparent dark:via-white/50"
            />
          </div>
        </div>
      </div>
      <div className="mx-auto max-w-5xl px-6">
        <TechStack />
        <div className="mt-8 flex justify-center items-center">
          <Button
            asChild
            size="lg"
            className="h-12 rounded-full pl-5 pr-3 text-base"
          >
            <Link to="/works">
              <span className="text-nowrap">Our Works</span>
              <ChevronRight className="ml-1" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
