import SolutionCard from "./solution-card";
import {
  Code,
  Cpu,
  ShieldCheck,
  BarChart3,
  Palette,
  Sparkles,
} from "lucide-react";

import { motion } from "framer-motion";

export default function SolutionCardSection() {
  return (
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
            Our comprehensive approach ensures that every aspect of your digital
            presence is optimized for growth and performance.
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
  );
}
