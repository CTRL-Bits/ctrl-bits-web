import { useEffect, useState } from "react";

// Icon Components
const ExternalLinkIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    className="w-4 h-4"
  >
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <polyline points="15 3 21 3 21 9" />
    <line x1="10" y1="14" x2="21" y2="3" />
  </svg>
);

const GithubIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
    <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
  </svg>
);

const InstagramIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    className="w-4 h-4"
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const LinkedinIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    className="w-4 h-4"
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const GlobeIconComponent = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    className="w-4 h-4"
  >
    <circle cx="12" cy="12" r="10" />
    <line x1="2" y1="12" x2="22" y2="12" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
);

const ArrowRightIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    className="w-4 h-4"
  >
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);

const XIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    className="w-5 h-5"
  >
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

// Types
interface Social {
  platform: string;
  icon: string;
  url: string;
}

interface TeamMember {
  id: number;
  name: string;
  role: string;
  avatar: string;
  socials: Social[];
}

interface TeamMemberResponse {
  results: TeamMember[];
}

// Icon mapping
const iconMap: Record<string, React.ComponentType> = {
  Github: GithubIcon,
  Instagram: InstagramIcon,
  Linkedin: LinkedinIcon,
  GlobeIcon: GlobeIconComponent,
};

// API Service
const API_URL = "https://api.ctrlbits.com/api";

const fetchTeamMembers = async (): Promise<TeamMember[]> => {
  try {
    const response = await fetch(`${API_URL}/team/`);

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    const data: TeamMemberResponse = await response.json();
    return data.results.sort((a, b) => a.id - b.id);
  } catch (error) {
    console.error("Failed to fetch team members:", error);
    throw error;
  }
};

// Modal Component
interface ModalProps {
  member: TeamMember | null;
  onClose: () => void;
}

const SocialsModal = ({ member, onClose }: ModalProps) => {
  if (!member) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-lg max-w-md w-full p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
              {member.name}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {member.role}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
          >
            <XIcon />
          </button>
        </div>

        <div className="space-y-2">
          {member.socials.map((social, idx) => {
            const IconComponent = iconMap[social.icon];
            if (!IconComponent) return null;

            return (
              <a
                key={idx}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors group"
              >
                <div className="flex items-center justify-center h-8 w-8 rounded-full bg-gray-100 dark:bg-gray-900">
                  <IconComponent />
                </div>
                <span className="text-sm text-gray-900 dark:text-gray-100">
                  {social.platform}
                </span>
                <ExternalLinkIcon />
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
};

// Member Card Component
interface MemberCardProps {
  member: TeamMember;
  index: number;
  onOpenSocials: (member: TeamMember) => void;
}

const MemberCard = ({ member, index, onOpenSocials }: MemberCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        animation: `fadeInUp 600ms ease-out ${index * 100}ms backwards`,
      }}
    >
      <div className="relative aspect-[3/4] bg-gray-50 dark:bg-gray-900 rounded-lg overflow-hidden mb-4">
        <img
          className="h-full w-full object-cover object-top transition-all duration-500"
          src={member.avatar}
          alt={`${member.name} - Web development professional at Ctrl Bits Kathmandu digital agency`}
          loading="lazy"
          style={{
            filter: isHovered ? "grayscale(0%)" : "grayscale(100%)",
            transform: isHovered ? "scale(1.05)" : "scale(1)",
          }}
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent transition-opacity duration-300"
          style={{
            opacity: isHovered ? 0.3 : 0.6,
          }}
        />
      </div>

      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
            {member.name}
          </h3>
          <span className="text-xs text-gray-400 font-mono">_0{index + 1}</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600 dark:text-gray-400">
            {member.role}
          </span>
          <button
            onClick={() => onOpenSocials(member)}
            className="group inline-flex items-center gap-1.5 text-sm text-blue-500 hover:text-blue-600 transition-colors"
          >
            Socials
            <div
              className="transition-transform duration-300"
              style={{
                transform: isHovered ? "translateX(2px)" : "translateX(0)",
              }}
            >
              <ArrowRightIcon />
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

// Skeleton Component
const MemberSkeleton = () => (
  <div className="animate-pulse">
    <div className="aspect-[3/4] bg-gray-200 dark:bg-gray-800 rounded-lg mb-4" />
    <div className="space-y-2">
      <div className="h-5 w-32 bg-gray-200 dark:bg-gray-800 rounded" />
      <div className="h-4 w-24 bg-gray-200 dark:bg-gray-800 rounded" />
    </div>
  </div>
);

export default function TeamSection() {
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

  useEffect(() => {
    const getTeamMembers = async () => {
      try {
        setLoading(true);
        const data = await fetchTeamMembers();
        setMembers(data);
        setError(null);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to load team members",
        );
      } finally {
        setLoading(false);
      }
    };

    getTeamMembers();
  }, []);

  if (error) {
    return (
      <section className="py-20 md:py-32 bg-white dark:bg-black">
        <div className="text-center px-6">
          <h3 className="text-xl font-medium text-gray-900 dark:text-gray-100 mb-2">
            Failed to load team members
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-5 py-2 bg-blue-500 text-white rounded-full text-sm font-medium hover:bg-blue-600 transition-colors"
          >
            Try Again
          </button>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="py-20 md:py-32 bg-white dark:bg-black">
        <div className="mx-auto max-w-6xl px-6">
          {/* Header */}
          <div
            className="text-center mb-16"
            style={{
              animation: "fadeIn 700ms ease-out 100ms backwards",
            }}
          >
            <div className="inline-block px-3 py-1 bg-gray-100 dark:bg-gray-900 rounded-full mb-4">
              <span className="text-xs font-medium text-gray-600 dark:text-gray-400">
                Meet Our Team
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
              The People Behind Our Success
            </h2>
          </div>

          {/* Description */}
          <div
            className="grid gap-8 sm:grid-cols-2 md:gap-12 mb-16 max-w-4xl mx-auto"
            style={{
              animation: "fadeIn 700ms ease-out 200ms backwards",
            }}
          >
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              Our team consists of passionate experts who bring diverse
              perspectives and specialized skills to every project. We
              collaborate seamlessly to deliver exceptional results.
            </p>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              During the working process, we maintain open communication with
              clients because they are the only ones who can truly determine if
              our solutions fit their needs.
            </p>
          </div>

          {/* Team Grid */}
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array.from({ length: 6 }).map((_, index) => (
                <MemberSkeleton key={index} />
              ))}
            </div>
          ) : members.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 dark:text-gray-400">
                No team members found
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              {members.map((member, index) => (
                <MemberCard
                  key={member.id}
                  member={member}
                  index={index}
                  onOpenSocials={setSelectedMember}
                />
              ))}
            </div>
          )}

          {/* CTA */}
          {!loading && members.length > 0 && (
            <div
              className="text-center mt-20"
              style={{
                animation: "fadeIn 700ms ease-out 400ms backwards",
              }}
            >
              <div className="max-w-lg mx-auto space-y-4">
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
                  Join Our Growing Team
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  We're always looking for talented individuals who are
                  passionate about technology and innovation.
                </p>
                <button className="group inline-flex items-center gap-2 px-5 py-2 bg-blue-500 text-white rounded-full text-sm font-medium hover:bg-blue-600 transition-colors">
                  <span>View Open Positions</span>
                  <div className="transition-transform duration-300 group-hover:translate-x-1">
                    <ArrowRightIcon />
                  </div>
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Socials Modal */}
      {selectedMember && (
        <SocialsModal
          member={selectedMember}
          onClose={() => setSelectedMember(null)}
        />
      )}

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </>
  );
}
