"use client";
import { useState } from "react";

interface StatCard {
  number: string;
  label: string;
  sublabel?: string;
  featured?: boolean;
  gradient?: boolean;
}

const stats: StatCard[] = [
  {
    number: "7+",
    label: "Company &",
    sublabel: "Startups",
  },
  {
    number: "25+",
    label: "Website",
    sublabel: "Developed",
    featured: true,
    gradient: true,
  },
  {
    number: "60+",
    label: "Visual Design",
    sublabel: "Project",
  },
  {
    number: "5+",
    label: "Countries",
  },
];

const StatCard = ({ stat, index }: { stat: StatCard; index: number }) => {
  const [isHovered, setIsHovered] = useState(false);

  // Alternating up/down pattern
  const isEven = index % 2 === 0;
  const animationName = isEven ? "fadeInUp" : "fadeInDown";

  if (stat.featured) {
    return (
      <div
        className="relative p-8 rounded-3xl bg-gradient-to-br from-blue-500 via-blue-600 to-cyan-500 border border-blue-400/20 transition-all duration-500 flex flex-col items-center justify-center text-center group overflow-visible"
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
          boxShadow: isHovered
            ? "0 20px 60px rgba(168, 85, 247, 0.4), 0 0 40px rgba(168, 85, 247, 0.2)"
            : "0 8px 24px rgba(0, 0, 0, 0.1)",
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

        {/* Number with scale animation */}
        <div
          className="mb-3 transition-transform duration-500"
          style={{
            transform: isHovered ? "scale(1.1)" : "scale(1)",
            transitionTimingFunction: "cubic-bezier(0.34, 1.56, 0.64, 1)",
          }}
        >
          <h3 className="text-6xl md:text-7xl font-bold text-white relative z-10">
            {stat.number}
          </h3>
        </div>

        {/* Labels */}
        <div className="space-y-1 relative z-10">
          <p className="text-base md:text-lg font-medium text-white/90">
            {stat.label}
          </p>
          {stat.sublabel && (
            <p className="text-sm md:text-base font-normal text-white/80">
              {stat.sublabel}
            </p>
          )}
        </div>

        {/* Decorative Icon with enhanced animation */}
        <div
          className="absolute bottom-6 right-6 w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center transition-all duration-500"
          style={{
            transform: isHovered
              ? "rotate(25deg) scale(1.2)"
              : "rotate(0deg) scale(1)",
            transitionTimingFunction: "cubic-bezier(0.34, 1.56, 0.64, 1)",
          }}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            className="text-white"
          >
            <path d="M13 10V3L4 14h7v7l9-11h-7z" fill="currentColor" />
          </svg>
        </div>
      </div>
    );
  }

  return (
    <div
      className="relative p-6 md:p-8 rounded-3xl bg-secondary/30 border border-border/50 hover:border-border hover:bg-secondary/60 transition-all duration-500 flex flex-col items-center justify-center text-center group"
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

      {/* Number with bounce effect */}
      <div
        className="mb-3 relative z-10 transition-transform duration-500"
        style={{
          transform: isHovered ? "scale(1.08)" : "scale(1)",
          transitionTimingFunction: "cubic-bezier(0.34, 1.56, 0.64, 1)",
        }}
      >
        <h3 className="text-5xl md:text-6xl font-bold text-foreground">
          {stat.number}
        </h3>
      </div>

      {/* Labels */}
      <div className="space-y-1 relative z-10">
        <p className="text-sm md:text-base font-medium text-foreground/70 group-hover:text-foreground transition-colors duration-300">
          {stat.label}
        </p>
        {stat.sublabel && (
          <p className="text-xs md:text-sm font-normal text-muted-foreground group-hover:text-foreground/60 transition-colors duration-300">
            {stat.sublabel}
          </p>
        )}
      </div>

      {/* Hover indicator dot */}
      <div
        className="absolute top-4 right-4 w-2 h-2 rounded-full bg-primary/0 group-hover:bg-primary transition-all duration-500"
        style={{
          transform: isHovered ? "scale(1)" : "scale(0)",
          transitionTimingFunction: "cubic-bezier(0.34, 1.56, 0.64, 1)",
        }}
      />
    </div>
  );
};

export default function FeaturesHomeSection() {
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
        <div className="text-center mb-16 md:mb-20 space-y-6">
          <h2
            className="text-[clamp(2rem,5vw,3.5rem)] font-medium leading-[1.15] tracking-[-0.02em] text-foreground max-w-4xl mx-auto"
            style={{
              animation:
                "fadeInUp 700ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 100ms backwards",
            }}
          >
            We deliver web development, custom software, and digital marketing
            that turn ideas into{" "}
            <span className="font-medium">market-ready MVPs.</span>{" "}
            <span className="text-muted-foreground font-normal">
              From automation to graphics, motion, and video editing, we build
              responsive experiences that convert.
            </span>
          </h2>

          <div
            style={{
              animation:
                "fadeInUp 800ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 200ms backwards",
            }}
          >
            <button className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-foreground text-background text-[15px] font-medium tracking-tight shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-105">
              Let's Collaborate
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6"
          style={{
            animation:
              "fadeInUp 900ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 300ms backwards",
          }}
        >
          {stats.map((stat, index) => (
            <StatCard key={index} stat={stat} index={index} />
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
