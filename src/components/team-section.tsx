import { JSX, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Instagram,
  Github,
  Linkedin,
  ExternalLink,
  GlobeIcon,
} from "lucide-react";

// Define TypeScript interfaces
interface Social {
  platform: string;
  url: string;
  icon: JSX.Element;
}

interface TeamMember {
  name: string;
  role: string;
  avatar: string;
  socials: Social[];
}

// Import avatars as per original code
import AviralPfp from "@/assets/images/pfp.jpeg";
import GauravPfp from "@/assets/images/gaurav.jpg";
import AadarshaPfp from "@/assets/images/aadarsha.jpg";
import SujalPfp from "@/assets/images/sujal.jpg";
import MeriyanPfp from "@/assets/images/meriyan.jpg";
import RiteshPfp from "@/assets/images/ritesh.jpg";

// Team members data with socials
const members: TeamMember[] = [
  {
    name: "Abiral Ale",
    role: "Fullstack Developer",
    avatar: AviralPfp,
    socials: [
      {
        platform: "Portfolio",
        url: "https://abiralale.com.np",
        icon: <GlobeIcon className="h-5 w-5" />,
      },
      {
        platform: "GitHub",
        url: "https://github.com/aviralale",
        icon: <Github className="h-5 w-5" />,
      },
      {
        platform: "LinkedIn",
        url: "https://linkedin.com/in/aviralale",
        icon: <Linkedin className="h-5 w-5" />,
      },
      {
        platform: "Instagram",
        url: "https://instagram.com/aviral.who_",
        icon: <Instagram className="h-5 w-5" />,
      },
    ],
  },
  {
    name: "Ritesh Aryal",
    role: "AI/ML Enthusiast",
    avatar: RiteshPfp,
    socials: [
      {
        platform: "GitHub",
        url: "https://github.com/ritesharyal666",
        icon: <Github className="h-5 w-5" />,
      },
      {
        platform: "LinkedIn",
        url: "https://linkedin.com/in/ritesh-aryal-931206319",
        icon: <Linkedin className="h-5 w-5" />,
      },
    ],
  },
  {
    name: "Aadarsha Subedi",
    role: "MERN Developer",
    avatar: AadarshaPfp,
    socials: [
      {
        platform: "GitHub",
        url: "https://github.com/Aadarsha00",
        icon: <Github className="h-5 w-5" />,
      },
      {
        platform: "Instagram",
        url: "https://instagram.com/s.aadarsha",
        icon: <Instagram className="h-5 w-5" />,
      },
    ],
  },
  {
    name: "Gaurav Bhatta",
    role: "Social Media Handler",
    avatar: GauravPfp,
    socials: [
      {
        platform: "Twitter",
        url: "https://linkedin.com/in/gaurav-bhatta-36a728237",
        icon: <Linkedin className="h-5 w-5" />,
      },
      {
        platform: "Instagram",
        url: "https://instagram.com/gaurav_bhatta00",
        icon: <Instagram className="h-5 w-5" />,
      },
    ],
  },
  {
    name: "Meriyan Karki",
    role: "Graphics Designer / Video Editor",
    avatar: MeriyanPfp,
    socials: [
      {
        platform: "Instagram",
        url: "https://instagram.com//meriyan______",
        icon: <Instagram className="h-5 w-5" />,
      },
    ],
  },
  {
    name: "Sujal Nepal",
    role: "MERN Developer",
    avatar: SujalPfp,
    socials: [
      {
        platform: "GitHub",
        url: "https://github.com/nepe000",
        icon: <Github className="h-5 w-5" />,
      },
      {
        platform: "LinkedIn",
        url: "https://www.instagram.com/poo_warrior/",
        icon: <Instagram className="h-5 w-5" />,
      },
    ],
  },
];

const MemberProfile = ({
  member,
  index,
}: {
  member: TeamMember;
  index: number;
}) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="group overflow-hidden">
      <img
        className="h-96 w-full rounded-md object-cover object-top grayscale transition-all duration-500 hover:grayscale-0 group-hover:h-[22.5rem] group-hover:rounded-xl"
        src={member.avatar}
        alt={`${member.name} - team member`}
        width="826"
        height="1239"
      />
      <div className="px-2 pt-2 sm:pb-0 sm:pt-4">
        <div className="flex justify-between">
          <h3 className="text-title text-base font-medium transition-all duration-500 group-hover:tracking-wider">
            {member.name}
          </h3>
          <span className="text-xs">_0{index + 1}</span>
        </div>
        <div className="mt-1 flex items-center justify-between">
          <span className="text-muted-foreground inline-block translate-y-6 text-sm opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">
            {member.role}
          </span>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <button className="text-primary-600 dark:text-primary-400 inline-block translate-y-8 text-sm tracking-wide opacity-0 transition-all duration-500 hover:underline group-hover:translate-y-0 group-hover:opacity-100">
                Socials
              </button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>{member.name}</DialogTitle>
                <DialogDescription>{member.role}</DialogDescription>
              </DialogHeader>
              <div className="mt-4 flex flex-col space-y-3">
                {member.socials.map((social, idx) => (
                  <a
                    key={idx}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 rounded-md px-4 py-2 hover:bg-slate-100 dark:hover:bg-slate-800"
                  >
                    {social.icon}
                    <span>{social.platform}</span>
                    <ExternalLink className="ml-auto h-4 w-4 text-gray-400" />
                  </a>
                ))}
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default function TeamSection() {
  return (
    <section className="bg-gray-50 py-16 md:py-32 dark:bg-transparent">
      <div className="mx-auto max-w-5xl border-t px-6">
        <span className="text-caption -ml-6 -mt-3.5 block w-max bg-gray-50 px-6 dark:bg-gray-950">
          Team
        </span>
        <div className="mt-12 gap-4 sm:grid sm:grid-cols-2 md:mt-24">
          <div className="sm:w-2/5">
            <h2 className="text-3xl font-bold sm:text-4xl">Our dream team</h2>
          </div>
          <div className="mt-6 sm:mt-0">
            <p>
              During the working process, we perform regular fitting with the
              client because he is the only person who can feel whether a new
              suit fits or not.
            </p>
          </div>
        </div>
        <div className="mt-12 md:mt-24">
          <div className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {members.map((member, index) => (
              <MemberProfile key={index} member={member} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
