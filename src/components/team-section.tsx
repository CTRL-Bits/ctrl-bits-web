import { useEffect, useState, useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  ExternalLink,
  Github,
  GlobeIcon,
  Instagram,
  Linkedin,
  Users,
  type LucideIcon,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { TeamMember, TeamMemberResponse } from "@/types";
import VariableProximity from "./variable-proximity-text";

const iconMap: Record<string, LucideIcon> = {
  Github: Github,
  Instagram: Instagram,
  Linkedin: Linkedin,
  GlobeIcon: GlobeIcon,
};

const MemberProfile = ({
  member,
  index,
}: {
  member: TeamMember;
  index: number;
}) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-background via-background/80 to-muted/30 backdrop-blur-md p-1 ring-1 ring-white/10 shadow-lg transition-all duration-500 hover:ring-primary/20 hover:shadow-xl">
      <div className="relative overflow-hidden rounded-lg">
        <img
          className="h-80 w-full object-cover object-top transition-all duration-500 grayscale hover:grayscale-0 group-hover:grayscale-0 group-hover:scale-105"
          src={member.avatar}
          alt={`${member.name} - team member`}
          width="826"
          height="1239"
          loading="lazy"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-70 transition-opacity duration-500 group-hover:opacity-40"></div>
      </div>

      {/* Member info with enhanced styling */}
      <div className="px-4 py-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-medium transition-all duration-500 group-hover:text-primary">
            {member.name}
          </h3>
          <span className="text-xs text-muted-foreground font-mono">
            _0{index + 1}
          </span>
        </div>

        <div className="mt-2 flex items-center justify-between">
          <span className="text-muted-foreground text-sm transition duration-300">
            {member.role}
          </span>

          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <button className="text-primary inline-flex items-center gap-1.5 text-sm tracking-wide transition-all duration-300 hover:gap-2.5">
                Socials
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md bg-background/80 backdrop-blur-lg border border-muted/50">
              <DialogHeader>
                <DialogTitle className="text-xl">{member.name}</DialogTitle>
                <DialogDescription className="text-muted-foreground">
                  {member.role}
                </DialogDescription>
              </DialogHeader>
              <div className="mt-4 flex flex-col space-y-2">
                {member.socials.map((social, idx) => {
                  const IconComponent = iconMap[social.icon];
                  if (!IconComponent) {
                    return null;
                  }

                  return (
                    <a
                      key={idx}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 rounded-md px-4 py-3 transition-all duration-200 hover:bg-primary/10 hover:text-primary group"
                    >
                      <div className="flex items-center justify-center h-8 w-8 rounded-full bg-primary/10 ring-1 ring-primary/20 transition-all group-hover:bg-primary/20">
                        <IconComponent className="h-4 w-4" />
                      </div>
                      <span>{social.platform}</span>
                      <ExternalLink className="ml-auto h-4 w-4 text-muted-foreground group-hover:text-primary" />
                    </a>
                  );
                })}
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Decorative element */}
      <div className="absolute -bottom-4 -right-4 h-12 w-12 rounded-full bg-primary/5 blur-xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>
    </div>
  );
};

export default function TeamSection() {
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [scrollY, setScrollY] = useState(0);
  const containerRef = useRef(null);

  // Effect for parallax scrolling
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const fetchTeamMembers = async () => {
    try {
      const response = await axios.get<TeamMemberResponse>(
        "https://api.ctrlbits.xyz/api/team/"
      );
      // Sort members by ID before setting state
      const sortedMembers = [...response.data.results].sort(
        (a, b) => a.id - b.id
      );
      setMembers(sortedMembers);
    } catch (error) {
      console.log(error);
      // Fallback data
      setMembers([
        {
          id: 1,
          name: "Alex Morgan",
          role: "CEO & Lead Developer",
          avatar:
            "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61",
          socials: [
            { platform: "LinkedIn", icon: "Linkedin", url: "#" },
            { platform: "GitHub", icon: "Github", url: "#" },
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
    <section className="py-16 md:py-32 relative overflow-hidden">
      {/* Background gradients */}
      <div className="absolute inset-0 bg-mesh-gradient opacity-20 pointer-events-none" />
      <div
        className="absolute top-1/3 -right-48 h-96 w-96 rounded-full bg-primary/10 blur-3xl transform-gpu"
        style={{ transform: `translateY(${scrollY * 0.1}px)` }}
      />
      <div
        className="absolute -bottom-24 left-24 h-64 w-64 rounded-full bg-secondary/10 blur-3xl transform-gpu"
        style={{ transform: `translateY(${scrollY * -0.15}px)` }}
      />

      <div ref={containerRef} className="mx-auto max-w-5xl px-6 relative">
        {/* Header with badge */}
        <div className="flex flex-col space-y-4 mb-12">
          <div className="flex items-center space-x-2 mb-2 transition-all duration-700">
            <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1.5 text-sm font-medium text-primary ring-1 ring-primary/20 backdrop-blur-sm">
              <Users className="mr-1.5 h-3.5 w-3.5" />
              Meet Our Team
            </span>
          </div>

          <div className="variable-font-container transition-all duration-700">
            <h2 className="relative z-10 max-w-xl text-4xl font-medium lg:text-5xl">
              <VariableProximity
                label="The People Behind Our Success"
                fromFontVariationSettings="'wght' 400, 'wdth' 100"
                toFontVariationSettings="'wght' 700, 'wdth' 120"
                containerRef={containerRef}
                radius={200}
                falloff="gaussian"
                className="font-bold transition-all duration-100 variable-font bg-clip-text text-transparent bg-gradient-to-r from-primary via-foreground to-secondary"
              />
            </h2>
          </div>
        </div>

        {/* Team description */}
        <div className="grid gap-8 sm:grid-cols-2 md:gap-12 mb-16">
          <div>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Our team consists of passionate experts who bring diverse
              perspectives and specialized skills to every project. We
              collaborate seamlessly to deliver exceptional results.
            </p>
          </div>
          <div>
            <p className="text-muted-foreground leading-relaxed">
              During the working process, we maintain open communication with
              clients because they are the only ones who can truly determine if
              our solutions fit their needs. This collaborative approach ensures
              we deliver exactly what our clients envision.
            </p>
          </div>
        </div>

        {/* Team grid with enhanced styling */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {members.map((member, index) => (
            <MemberProfile key={member.id} member={member} index={index} />
          ))}
        </div>

        {/* Join our team CTA */}
        <div className="mt-16 text-center">
          <div className="inline-block rounded-2xl bg-gradient-to-br from-background/80 via-background/60 to-muted/30 backdrop-blur-md p-8 ring-1 ring-white/10 shadow-lg">
            <h3 className="text-2xl font-medium mb-4">Join Our Growing Team</h3>
            <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
              We're always looking for talented individuals who are passionate
              about technology and innovation. Check out our open positions.
            </p>
            <Button
              size="lg"
              className="h-11 rounded-full pl-6 pr-5 text-base font-medium shadow-lg shadow-primary/20 hover:shadow-primary/30 hover:scale-105 transition-all group overflow-hidden relative"
            >
              <span className="relative z-10 flex items-center">
                View Open Positions
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
              <span className="absolute inset-0 bg-gradient-to-r from-primary to-primary/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
