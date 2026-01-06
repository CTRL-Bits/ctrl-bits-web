"use client";
import { useState } from "react";
import {
  Code,
  Cpu,
  ShieldCheck,
  BarChart3,
  Palette,
  Sparkles,
} from "lucide-react";

interface Solution {
  icon: React.ElementType;
  title: string;
  description: string;
  featured?: boolean;
}

const solutions: Solution[] = [
  {
    icon: Code,
    title: "Modern Technology Stack",
    description: "Fast, scalable, and future-ready web applications",
  },
  {
    icon: ShieldCheck,
    title: "Enterprise-Grade Security",
    description: "SSL, encryption, secure coding standards",
  },
  {
    icon: Cpu,
    title: "Intelligent Automation",
    description: "Smarter systems with intelligent workflows",
    featured: true,
  },
  {
    icon: BarChart3,
    title: "Data-Driven Insights",
    description: "Real-time analytics and dashboard development",
  },
  {
    icon: Palette,
    title: "Engaging Design",
    description: "Stunning visuals, intuitive UI/UX",
  },
  {
    icon: Sparkles,
    title: "Continuous Innovation",
    description: "Future-ready digital strategy",
  },
];

const SolutionCard = ({
  solution,
  index,
}: {
  solution: Solution;
  index: number;
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const Icon = solution.icon;

  // Alternating up/down pattern
  const isEven = index % 2 === 0;
  const animationName = isEven ? "fadeInUp" : "fadeInDown";

  if (solution.featured) {
    return (
      <div
        className="relative p-8 rounded-3xl bg-gradient-to-br from-blue-500 via-blue-600 to-blue-500 border border-blue-400/20 transition-all duration-500 flex flex-col items-start justify-between text-left group overflow-visible"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          animation: `${animationName} 800ms cubic-bezier(0.34, 1.56, 0.64, 1) ${
            index * 120
          }ms backwards`,
          transform: isHovered
            ? "translateY(-12px) scale(1.05)"
            : "translateY(0) scale(1)",
          transitionTimingFunction: "cubic-bezier(0.34, 1.56, 0.64, 1)",
        }}
      >
        {/* Animated gradient overlay on hover */}
        <div
          className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background:
              "radial-gradient(circle at center, rgba(255,255,255,0.1) 0%, transparent 70%)",
          }}
        />

        {/* Icon with enhanced animation */}
        <div
          className="mb-6 relative z-10 transition-transform duration-500"
          style={{
            transform: isHovered ? "scale(1.15) rotate(5deg)" : "scale(1)",
            transitionTimingFunction: "cubic-bezier(0.34, 1.56, 0.64, 1)",
          }}
        >
          <div className="h-16 w-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
            <Icon className="h-8 w-8 text-white" />
          </div>
        </div>

        {/* Content */}
        <div className="space-y-3 relative z-10 flex-1">
          <h3 className="text-2xl font-bold text-white">{solution.title}</h3>
          <p className="text-base text-white/80 leading-relaxed">
            {solution.description}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="relative p-8 rounded-3xl bg-secondary/30 border border-border/50 hover:border-border hover:bg-secondary/60 transition-all duration-500 flex flex-col items-start justify-between text-left group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        animation: `${animationName} 800ms cubic-bezier(0.34, 1.56, 0.64, 1) ${
          index * 120
        }ms backwards`,
        transform: isHovered
          ? "translateY(-8px) scale(1.03)"
          : "translateY(0) scale(1)",
        transitionTimingFunction: "cubic-bezier(0.34, 1.56, 0.64, 1)",
        boxShadow: isHovered
          ? "0 16px 48px rgba(0, 0, 0, 0.12)"
          : "0 4px 12px rgba(0, 0, 0, 0.05)",
      }}
    >
      {/* Subtle shine effect on hover */}
      <div
        className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at center, rgba(255,255,255,0.05) 0%, transparent 70%)",
        }}
      />

      {/* Icon with bounce effect */}
      <div
        className="mb-6 relative z-10 transition-transform duration-500"
        style={{
          transform: isHovered ? "scale(1.1) rotate(3deg)" : "scale(1)",
          transitionTimingFunction: "cubic-bezier(0.34, 1.56, 0.64, 1)",
        }}
      >
        <div className="h-14 w-14 rounded-xl bg-primary/10 group-hover:bg-primary/20 flex items-center justify-center transition-colors duration-300">
          <Icon className="h-7 w-7 text-primary" />
        </div>
      </div>

      {/* Content */}
      <div className="space-y-3 relative z-10 flex-1">
        <h3 className="text-xl font-bold text-foreground group-hover:text-foreground transition-colors duration-300">
          {solution.title}
        </h3>
        <p className="text-sm text-muted-foreground group-hover:text-foreground/70 transition-colors duration-300 leading-relaxed">
          {solution.description}
        </p>
      </div>

      {/* Hover indicator dot */}
      <div
        className="absolute top-6 right-6 w-2 h-2 rounded-full bg-primary/0 group-hover:bg-primary transition-all duration-500"
        style={{
          transform: isHovered ? "scale(1)" : "scale(0)",
          transitionTimingFunction: "cubic-bezier(0.34, 1.56, 0.64, 1)",
        }}
      />
    </div>
  );
};

export default function SolutionCardSection() {
  return (
    <section className="relative w-full bg-background py-20 md:py-32 overflow-hidden">
      {/* Subtle Grid Background */}
      <div
        className="absolute inset-0 opacity-[0.03] dark:opacity-[0.04]"
        style={{
          backgroundImage: `
            linear-gradient(to right, hsl(var(--border)) 1px, transparent 1px),
            linear-gradient(to bottom, hsl(var(--border)) 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="text-center flex items-center flex-col mb-16 md:mb-20 space-y-6">
          <h2
            className="text-[clamp(2rem,5vw,3.5rem)] font-medium leading-[1.15] tracking-[-0.02em] text-foreground max-w-4xl mx-auto"
            style={{
              animation:
                "fadeInUp 700ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 100ms backwards",
            }}
          >
            How We <span className="font-medium">Power Your Success</span>
          </h2>
          <span className="text-muted-foreground font-normal w-1/2 block">
            Our comprehensive approach ensures that every aspect of your digital
            presence is optimized for growth and performance.
          </span>
        </div>

        {/* Solutions Grid */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
          style={{
            animation:
              "fadeInUp 900ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 300ms backwards",
          }}
        >
          {solutions.map((solution, index) => (
            <SolutionCard key={index} solution={solution} index={index} />
          ))}
        </div>
      </div>

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
}
