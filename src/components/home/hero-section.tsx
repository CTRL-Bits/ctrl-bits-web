"use client";
import { useEffect, useState, useRef, memo } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

interface TeamMember {
  id: number;
  name: string;
  role: string;
  avatar: string;
}

interface TeamMemberResponse {
  results: TeamMember[];
}

const MagneticButton = memo(
  ({
    to,
    children,
    variant = "secondary",
  }: {
    to: string;
    children: string;
    variant?: "primary" | "secondary";
  }) => {
    const ref = useRef<HTMLAnchorElement>(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isPressed, setIsPressed] = useState(false);

    const handleMouseMove = (e: React.MouseEvent) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const deltaX = (e.clientX - centerX) * 0.2;
      const deltaY = (e.clientY - centerY) * 0.2;
      setPosition({ x: deltaX, y: deltaY });
    };

    const handleMouseLeave = () => {
      setPosition({ x: 0, y: 0 });
    };

    return (
      <Link
        ref={ref}
        to={to}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onMouseDown={() => setIsPressed(true)}
        onMouseUp={() => setIsPressed(false)}
        className={`group relative inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full text-[15px] font-medium tracking-tight transition-all duration-500 ${
          variant === "primary"
            ? "bg-foreground text-background shadow-lg hover:shadow-xl"
            : "bg-background text-foreground border-2 border-border hover:border-foreground"
        }`}
        style={{
          transform: `translate(${position.x}px, ${position.y}px) scale(${
            isPressed ? 0.96 : 1
          })`,
          transitionTimingFunction: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        }}
      >
        <span className="relative z-10">{children}</span>
      </Link>
    );
  }
);

const TeamAvatar = memo(
  ({ member, index }: { member: TeamMember; index: number }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
      <div
        className="relative grayscale hover:grayscale-0 transition-all duration-500"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          animation: `fadeInUp 700ms cubic-bezier(0.25, 0.46, 0.45, 0.94) ${
            index * 80
          }ms backwards`,
        }}
      >
        <div
          className="w-12 h-12 md:w-14 md:h-14 rounded-full border border-border/30 overflow-hidden bg-muted cursor-pointer transition-all duration-500"
          style={{
            transform: `scale(${isHovered ? 1.05 : 1})`,
            transitionTimingFunction: "cubic-bezier(0.34, 1.56, 0.64, 1)",
          }}
        >
          <img
            src={member.avatar}
            alt={`${member.name} - Software developer at Ctrl Bits Kathmandu web development agency`}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>

        <div
          className={`absolute -top-16 left-1/2 -translate-x-1/2 px-3.5 py-2 bg-foreground text-background rounded-xl transition-all duration-400 pointer-events-none whitespace-nowrap shadow-lg ${
            isHovered
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-2 invisible"
          }`}
          style={{
            transitionTimingFunction: "cubic-bezier(0.34, 1.56, 0.64, 1)",
          }}
        >
          <p className="text-[12px] font-medium tracking-tight">
            {member.name}
          </p>
          <p className="text-[11px] opacity-70 mt-0.5 font-light">
            {member.role}
          </p>
        </div>
      </div>
    );
  }
);

export default function HeroSection() {
  const [members, setMembers] = useState<TeamMember[]>([]);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const { data } = await axios.get<TeamMemberResponse>(
          "https://api.ctrlbits.xyz/api/team/"
        );
        setMembers(data.results);
      } catch (error) {
        console.error(error);
      }
    };
    fetchMembers();
  }, []);

  return (
    <main className="relative min-h-screen w-full bg-background flex items-center justify-center overflow-hidden">
      {/* Subtle Grid Background - Exactly like Lumion */}
      <div
        className="absolute inset-0 opacity-[0.03] dark:opacity-[0.04]"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgb(0,0,0) 1px, transparent 1px),
            linear-gradient(to bottom, rgb(0,0,0) 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
        }}
      />

      {/* Content Container */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 py-20 md:py-32">
        <div className="flex flex-col items-center text-center space-y-12">
          {/* Badge */}
          <div
            className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-secondary/50 border border-border/50"
            style={{
              animation:
                "fadeInUp 700ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 100ms backwards",
            }}
          >
            <div className="relative flex items-center justify-center">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              <div className="absolute inset-0 w-1.5 h-1.5 rounded-full bg-emerald-500/40 animate-ping" />
            </div>
            <span className="text-[13px] font-medium text-muted-foreground tracking-wide">
              Nepal · Web Development & Digital Growth Agency
            </span>
          </div>

          {/* Main Heading - Clean & Bold */}
          <h1
            className="text-[clamp(2.5rem,7vw,5.5rem)] font-medium leading-[1.1] tracking-[-0.03em] flex flex-col justify-center items-center text-foreground max-w-5xl"
            style={{
              animation:
                "fadeInUp 800ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 200ms backwards",
            }}
          >
            Ctrl Bits — Web Development, Digital Marketing{" "}
            <span className="font-normal text-muted-foreground">
              & Growth
            </span>
          </h1>

          {/* Subheading */}
          <p
            className="text-[clamp(1rem,1.8vw,1.25rem)] font-normal leading-relaxed tracking-tight text-muted-foreground max-w-2xl"
            style={{
              animation:
                "fadeInUp 900ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 300ms backwards",
            }}
          >
            Build and scale with Ctrl Bits, a Kathmandu-based agency delivering web
            development, SEO, digital marketing, custom software, graphic
            design, and video editing that drives measurable results.
          </p>

          {/* CTA Buttons */}
          <div
            className="flex flex-wrap items-center justify-center gap-4"
            style={{
              animation:
                "fadeInUp 1000ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 400ms backwards",
            }}
          >
            <MagneticButton to="/contact" variant="primary">
              Book a Call
            </MagneticButton>
            <MagneticButton to="/portfolio" variant="secondary">
              Our Case Study
            </MagneticButton>
          </div>

          {/* Client Logos - Grayscale */}
          {members.length > 0 && (
            <div
              className="pt-8 flex flex-col items-center gap-6"
              style={{
                animation:
                  "fadeInUp 1100ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 500ms backwards",
              }}
            >
              <div className="flex items-center -space-x-2">
                {members.map((member, index) => (
                  <TeamAvatar key={member.id} member={member} index={index} />
                ))}
              </div>
              <p className="text-[13px] font-normal text-muted-foreground/60 tracking-wide">
                Backed by forward-thinking team
              </p>
            </div>
          )}
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

        @media (prefers-reduced-motion: reduce) {
          *,
          *::before,
          *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </main>
  );
}
