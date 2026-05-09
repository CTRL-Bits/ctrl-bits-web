import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import {
  Dribbble,
  ExternalLink,
  Facebook,
  Github,
  Globe2,
  Instagram,
  Linkedin,
  Mail,
  Twitter,
  Youtube,
} from "lucide-react";
import EmptyState from "@/components/shared/EmptyState";
import ErrorState from "@/components/shared/ErrorState";
import LoadingState from "@/components/shared/LoadingState";
import SectionHeader from "@/components/shared/SectionHeader";
import { fetchTeamMembers } from "@/services/teamService";
import type { TeamMember } from "@/types/team";

const fallbackTeam: TeamMember[] = [
  { name: "Abiral Ale", role: "Founder / CEO" },
  { name: "Meriyan Karki", role: "Co-Founder / Creative Director" },
  { name: "Gaurav Bhatta", role: "Co-Founder / Engineering Director" },
  { name: "Aadarsha Subedi", role: "Co-Founder / CTO" },
];

function getMemberRole(member: TeamMember): string {
  return member.role || member.designation || "Team Member";
}

function getMemberImage(member: TeamMember): string | undefined {
  return member.image || member.avatar;
}

function getSocialIcon(platform?: string): ReactNode {
  const key = (platform || "").toLowerCase();

  if (key.includes("linkedin")) return <Linkedin className="h-4 w-4" aria-hidden="true" />;
  if (key.includes("github")) return <Github className="h-4 w-4" aria-hidden="true" />;
  if (key.includes("instagram")) return <Instagram className="h-4 w-4" aria-hidden="true" />;
  if (key.includes("facebook")) return <Facebook className="h-4 w-4" aria-hidden="true" />;
  if (key.includes("youtube")) return <Youtube className="h-4 w-4" aria-hidden="true" />;
  if (key.includes("dribbble")) return <Dribbble className="h-4 w-4" aria-hidden="true" />;
  if (key.includes("twitter") || key === "x") return <Twitter className="h-4 w-4" aria-hidden="true" />;
  if (key.includes("mail") || key.includes("email")) return <Mail className="h-4 w-4" aria-hidden="true" />;
  if (key.includes("website") || key.includes("portfolio")) return <Globe2 className="h-4 w-4" aria-hidden="true" />;

  return <ExternalLink className="h-4 w-4" aria-hidden="true" />;
}

export default function TeamDirectory() {
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    fetchTeamMembers(controller.signal)
      .then(setMembers)
      .catch(() => {
        if (controller.signal.aborted) return;
        setError("Team information could not be loaded right now.");
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });

    return () => controller.abort();
  }, []);

  const displayMembers = members.length > 0 ? members : fallbackTeam;

  return (
    <section id="team" className="bg-[#F5F5F5] px-4 py-24 md:px-8">
      <div className="mx-auto max-w-[88rem]">
        <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionHeader
            eyebrow="Team"
            title="Builders behind the work"
            description="The people shaping the systems."
          />
        </div>

        {loading ? (
          <LoadingState label="Loading team" count={4} />
        ) : error ? (
          <div className="space-y-6">
            <ErrorState message="Team information could not be loaded right now." />
            <TeamGrid members={displayMembers} />
          </div>
        ) : displayMembers.length === 0 ? (
          <EmptyState message="Team members will be updated soon." />
        ) : (
          <TeamGrid members={displayMembers} />
        )}
      </div>
    </section>
  );
}

function TeamGrid({ members }: { members: TeamMember[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {members.map((member, index) => {
        const name = member.name || "Ctrl Bits team member";
        const role = getMemberRole(member);
        const image = getMemberImage(member);

        return (
          <article
            key={`${name}-${member.id || index}`}
            className="rounded-[2rem] bg-white p-4"
          >
            <div className="aspect-[4/5] overflow-hidden rounded-[1.5rem] bg-[#0058fc]/10">
              {image ? (
                <img
                  src={image}
                  alt={`${name}, ${role} at Ctrl Bits`}
                  className="h-full w-full object-cover object-top grayscale transition-all duration-300 hover:grayscale-0"
                  loading="lazy"
                />
              ) : (
                <div className="flex h-full items-center justify-center text-5xl font-semibold tracking-[-0.08em] text-[#0058fc]/35">
                  {name.slice(0, 1)}
                </div>
              )}
            </div>
            <div className="p-2 pt-5">
              <h3 className="text-xl font-semibold tracking-[-0.04em]">
                {name}
              </h3>
              <p className="mt-1 text-sm text-[#0058fc]">{role}</p>
              {member.bio && (
                <p className="mt-4 line-clamp-3 text-sm leading-6 text-neutral-600">
                  {member.bio}
                </p>
              )}
              <div className="mt-5 flex gap-2">
                {member.linkedin && (
                  <SocialLink href={member.linkedin} label={`${name} LinkedIn`}>
                    <Linkedin className="h-4 w-4" aria-hidden="true" />
                  </SocialLink>
                )}
                {member.github && (
                  <SocialLink href={member.github} label={`${name} GitHub`}>
                    <Github className="h-4 w-4" aria-hidden="true" />
                  </SocialLink>
                )}
                {member.website && (
                  <SocialLink href={member.website} label={`${name} website`}>
                    <Globe2 className="h-4 w-4" aria-hidden="true" />
                  </SocialLink>
                )}
                {member.socials?.map((social) =>
                  social.url ? (
                    <SocialLink
                      key={social.url}
                      href={social.url}
                      label={`${name} ${social.platform || "social link"}`}
                    >
                      {getSocialIcon(social.platform || social.icon)}
                    </SocialLink>
                  ) : null,
                )}
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}

function SocialLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: ReactNode;
}) {
  return (
    <a
      href={href}
      aria-label={label}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-neutral-100 text-neutral-600 transition-colors hover:bg-[#0058fc] hover:text-white"
    >
      {children}
    </a>
  );
}
