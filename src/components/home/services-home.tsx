"use client";
import { useState } from "react";
import { Link } from "react-router-dom";

interface Service {
  title: string;
  description: string;
  tags: string[];
}

const services: Service[] = [
  {
    title: "Web Development",
    description:
      "Responsive websites, high-performance web apps, and e-commerce development built for speed, security, and conversions.",
    tags: [
      "Website Development",
      "Web Apps",
      "E-commerce",
      "CMS",
    ],
  },
  {
    title: "Digital Marketing",
    description:
      "Targeted paid campaigns, social media management, and funnel optimization to generate qualified leads and measurable growth.",
    tags: ["Paid Ads", "Social Media", "Lead Generation", "Analytics"],
  },
  {
    title: "SEO Services",
    description:
      "Technical SEO, on-page optimization, local SEO, and content strategy to improve rankings and organic traffic.",
    tags: ["Technical SEO", "On-Page SEO", "Local SEO", "Content SEO"],
  },
  {
    title: "Video Editing & Motion Graphics",
    description:
      "Professional video editing for ads, product demos, reels, and brand content designed for performance across platforms.",
    tags: ["Video Editing", "Motion Graphics", "Ad Creatives", "Short-form Content"],
  },
  {
    title: "Graphic Design & Branding",
    description:
      "Brand identity systems, social creatives, marketing assets, and UI graphics that keep your visual communication consistent.",
    tags: ["Brand Identity", "Graphic Design", "Social Creatives", "UI Assets"],
  },
  {
    title: "Custom Software Development",
    description:
      "Tailored software solutions, API integrations, and workflow automation for startups, SMEs, and enterprise teams.",
    tags: [
      "Custom Software",
      "API Integration",
      "Automation",
      "Scalable Architecture",
    ],
  },
];

const ServiceCard = ({
  service,
  index,
}: {
  service: Service;
  index: number;
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="space-y-4 transition-all duration-500"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        animation: `fadeInUp 800ms cubic-bezier(0.34, 1.56, 0.64, 1) ${
          index * 150
        }ms backwards`,
        transform: isHovered ? "translateX(8px)" : "translateX(0)",
        transitionTimingFunction: "cubic-bezier(0.34, 1.56, 0.64, 1)",
      }}
    >
      {/* Title */}
      <h3 className="text-2xl md:text-3xl font-medium text-foreground transition-colors duration-300">
        {service.title}
      </h3>

      {/* Description */}
      <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
        {service.description}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 pt-2">
        {service.tags.map((tag, tagIndex) => (
          <span
            key={tagIndex}
            className="px-3 py-1.5 rounded-lg bg-secondary/50 border border-border/50 text-xs font-medium text-foreground hover:bg-secondary/80 hover:border-border hover:scale-105 transition-all duration-300 cursor-default"
            style={{
              transitionTimingFunction: "cubic-bezier(0.34, 1.56, 0.64, 1)",
            }}
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};

const VideoShowcase = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative w-full h-full min-h-[500px] rounded-3xl overflow-hidden group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        animation:
          "fadeInUp 1000ms cubic-bezier(0.34, 1.56, 0.64, 1) 400ms backwards",
      }}
    >
      {/* Image Container */}
      <div
        className="absolute inset-0 rounded-3xl overflow-hidden transition-transform duration-700"
        style={{
          transform: isHovered ? "scale(1.02)" : "scale(1)",
          transitionTimingFunction: "cubic-bezier(0.34, 1.56, 0.64, 1)",
        }}
      >
        {/* Video Element - Auto-loop, no controls */}
        {/* <video
          className="w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
        > */}
        {/* 
            IMPORTANT: Replace these paths with your Canva video URL
            You can use either:
            1. /videos/your-video.mp4 (in public/videos folder)
            2. https://your-canva-url.com/video.mp4 (direct URL)
          */}
        {/* <source src="/videos/showcase-video.mp4" type="video/mp4" /> */}
        {/* <source src="/videos/showcase-video.webm" type="video/webm" /> */}
        {/* Fallback message */}
        {/* Your browser does not support the video tag. */}
        {/* </video> */}

        <img
          src="/bitman.png"
          className="w-full h-full object-cover"
          alt="Custom software development by Ctrl Bits, a Kathmandu web development and digital growth agency"
        />

        {/* Subtle overlay on hover */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-all duration-500 pointer-events-none" />
      </div>

      {/* Corner Accent Lines (subtle design detail) */}
      <div
        className="absolute top-0 right-0 w-20 h-20 border-t-2 border-r-2 border-white/10 rounded-tr-3xl transition-opacity duration-500"
        style={{ opacity: isHovered ? 1 : 0 }}
      />
      <div
        className="absolute bottom-0 left-0 w-20 h-20 border-b-2 border-l-2 border-white/10 rounded-bl-3xl transition-opacity duration-500"
        style={{ opacity: isHovered ? 1 : 0 }}
      />
    </div>
  );
};

export default function ServicesHome() {
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

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header */}
        <div
          className="mb-16 md:mb-20"
          style={{
            animation:
              "fadeInUp 700ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 100ms backwards",
          }}
        >
          <h2 className="text-3xl md:text-4xl font-medium text-foreground mb-4">
            Services Built for Growth
          </h2>
          <p className="text-xl md:text-2xl text-foreground">
            Web development, digital marketing, SEO, video editing, graphic design, and custom software development in one team.
          </p>
        </div>

        {/* Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left: Services List */}
          <div className="space-y-12">
            {services.map((service, index) => (
              <ServiceCard key={index} service={service} index={index} />
            ))}
            <div className="flex flex-wrap gap-3 pt-2">
              <Link
                to="/solutions"
                className="inline-flex items-center rounded-full bg-primary text-primary-foreground px-4 py-2 text-sm font-medium hover:opacity-90 transition-opacity"
              >
                View Full Service Details
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center rounded-full border border-border px-4 py-2 text-sm font-medium hover:bg-secondary transition-colors"
              >
                Book a Discovery Call
              </Link>
            </div>
          </div>

          {/* Right: Video Showcase - Sticky on scroll */}
          <div className="sticky top-8">
            <VideoShowcase />
          </div>
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
      `}</style>
    </section>
  );
}
