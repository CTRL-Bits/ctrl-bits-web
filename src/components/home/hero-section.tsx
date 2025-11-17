import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { TeamMember, TeamMemberResponse } from "@/types";
import axios from "axios";
import DarkVeil from "@/backgrounds/DarkVeil/DarkVeil";
import ShinyText from "../react-bits/animations/TextAnimations/ShinyText/ShinyText";
import { AnimatedTooltip } from "../ui/animated-tooltip";
import { ContainerTextFlip } from "../ui/container-text-flip";

export default function HeroSection() {
  const [members, setMembers] = useState<TeamMember[]>([]);
  const fetchTeamMembers = async () => {
    try {
      const response = await axios.get<TeamMemberResponse>(
        "https://api.ctrlbits.xyz/api/team/"
      );
      const sortedMembers = [...response.data.results].sort(
        (a, b) => a.id - b.id
      );
      setMembers(sortedMembers);
    } catch (error) {
      console.log(error);
      setMembers([
        {
          id: 1,
          name: "Abiral Ale",
          role: "Founder & Lead Developer",
          avatar: "https://avatars.githubusercontent.com/u/121365480?v=4",
          socials: [
            {
              platform: "LinkedIn",
              icon: "Linkedin",
              url: "https://linkedin.com/in/aviralale",
            },
            {
              platform: "GitHub",
              icon: "Github",
              url: "https://github.com/aviralale",
            },
          ],
        },
        {
          id: 2,
          name: "Jamie Chen",
          role: "UX Designer",
          avatar:
            "https://images.unsplash.com/photo-1534528741775-53994a69daeb",
          socials: [
            { platform: "LinkedIn", icon: "Linkedin", url: "#" },
            { platform: "Instagram", icon: "Instagram", url: "#" },
          ],
        },
        {
          id: 3,
          name: "Taylor Reid",
          role: "Full Stack Developer",
          avatar:
            "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
          socials: [
            { platform: "GitHub", icon: "Github", url: "#" },
            { platform: "Portfolio", icon: "GlobeIcon", url: "#" },
          ],
        },
      ]);
    }
  };

  useEffect(() => {
    fetchTeamMembers();
  }, []);

  return (
    <main className="min-h-svh w-full flex flex-col justify-center items-center relative px-4 sm:px-6 lg:px-8">
      <div className="absolute inset-0 -z-30">
        <DarkVeil hueShift={25} />
      </div>
      <div className="container max-w-7xl flex flex-col gap-6 sm:gap-8 lg:gap-10 justify-center items-center">
        {/* Badge */}
        <div
          className={`flex items-center space-x-2 transition-all duration-700 delay-100`}
        >
          <span className="cursor-target inline-flex items-center rounded-full bg-primary/10 px-2.5 py-1 sm:px-3 sm:py-1.5 text-xs sm:text-sm font-medium text-primary ring-1 ring-primary/20 backdrop-blur-sm">
            <Sparkles className="mr-1 sm:mr-1.5 h-3 w-3 sm:h-3.5 sm:w-3.5 animate-pulse" />
            <ShinyText text="Next-Gen Development" disabled={false} speed={3} />
          </span>
        </div>

        {/* Hero Title and Description */}
        <div className="flex flex-col justify-center items-center space-y-4 sm:space-y-6">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl flex flex-col sm:flex-row justify-center items-center gap-2 sm:gap-3 text-center font-bold leading-tight">
            <span className="flex items-center gap-2">
              Build{" "}
              <ContainerTextFlip
                className="cursor-target text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl"
                words={["better", "modern", "smarter", "awesome"]}
                // textSize="3xl sm:4xl md:5xl lg:6xl xl:7xl"
              />
            </span>
            <span className="flex items-center gap-2">
              with <ShinyText text="Ctrlbits" />.
            </span>
          </h1>
          <p className="text-center text-base sm:text-lg md:text-lg w-full sm:w-5/6 md:w-4/5  max-w-4xl leading-relaxed">
            We are the leading, modern web and IT solution company based in{" "}
            <strong>Nepal</strong>, delivering custom web applications and
            automation services.
          </p>
        </div>

        {/* Team Members Tooltip */}
        <div className="flex justify-center">
          <AnimatedTooltip items={members} />
        </div>

        {/* CTA Buttons */}
        <div
          className={`flex flex-col sm:flex-row gap-3 sm:gap-4 transition-all duration-700 delay-400 w-full sm:w-auto`}
        >
          <Button
            asChild
            variant="default"
            size="lg"
            className="cursor-target h-11 sm:h-12 rounded-full pl-5 pr-4 sm:pl-6 sm:pr-5 text-sm sm:text-base font-medium hover:scale-105 transition-all group overflow-hidden relative w-full sm:w-auto min-w-[200px]"
          >
            <Link to="/solutions">
              <span className="relative z-10 flex items-center justify-center">
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
            className="cursor-target h-11 sm:h-12 rounded-full px-5 sm:px-6 text-sm sm:text-base font-medium border-primary/20 hover:border-primary/50 hover:bg-primary/5 transition-all group w-full sm:w-auto min-w-[140px]"
          >
            <Link to="/contact">
              <span className="relative z-10 flex items-center justify-center">
                Let's Talk
              </span>
            </Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
