"use client";
import { useEffect, useState } from "react";

// Types
interface Company {
  id: number;
  name: string;
  logo: string;
  invert?: boolean;
  is_international: boolean;
}

interface CompanyResponse {
  results: Company[];
}

// Client Logo Component
const ClientLogo = ({
  item,
  index,
}: {
  item: {
    id: number;
    name: string;
    logo: string;
    invert?: boolean;
  };
  index: number;
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative grayscale hover:grayscale-0 transition-all duration-500"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        animation: `fadeInUp 600ms cubic-bezier(0.25, 0.46, 0.45, 0.94) ${
          index * 50
        }ms backwards`,
      }}
    >
      {/* Tooltip */}
      <div
        className={`absolute -top-12 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-foreground text-background rounded-lg transition-all duration-300 pointer-events-none whitespace-nowrap text-[12px] font-medium shadow-lg ${
          isHovered
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-2 invisible"
        }`}
        style={{
          transitionTimingFunction: "cubic-bezier(0.34, 1.56, 0.64, 1)",
        }}
      >
        {item.name}
      </div>

      {/* Logo Container */}
      <div
        className="w-16 h-16 md:w-20 md:h-20 flex items-center justify-center cursor-pointer transition-all duration-500 rounded-lg hover:bg-secondary/30"
        style={{
          transform: `scale(${isHovered ? 1.05 : 1})`,
          transitionTimingFunction: "cubic-bezier(0.34, 1.56, 0.64, 1)",
        }}
      >
        <img
          src={item.logo}
          alt={`${item.name} - Client of Ctrl Bits web development company Nepal | IT solutions company Kathmandu`}
          className={`max-w-12 max-h-12 md:max-w-14 md:max-h-14 object-contain ${
            item.invert ? "invert" : ""
          }`}
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.style.display = "none";
            target.nextElementSibling?.classList.remove("hidden");
          }}
        />
        <div className="hidden w-10 h-10 rounded-lg bg-muted items-center justify-center text-muted-foreground text-sm font-semibold">
          {item.name.charAt(0)}
        </div>
      </div>
    </div>
  );
};

export default function HeroClientsShowcase() {
  const [clients, setClients] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchClients = async () => {
    try {
      setLoading(true);
      const response = await fetch("https://api.ctrlbits.xyz/api/companies/");
      const data: CompanyResponse = await response.json();
      setClients(data.results);
    } catch (error) {
      console.error("Error fetching clients:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  const nationalClients = clients.filter((client) => !client.is_international);
  const internationalClients = clients.filter(
    (client) => client.is_international
  );

  const SectionDivider = ({ title }: { title: string }) => {
    return (
      <div className="flex items-center justify-center mb-12">
        <div className="flex items-center gap-4">
          <div className="h-px w-12 bg-border" />
          <span className="text-[12px] font-medium tracking-wider uppercase text-muted-foreground/60">
            {title}
          </span>
          <div className="h-px w-12 bg-border" />
        </div>
      </div>
    );
  };

  const LoadingSkeleton = () => (
    <div className="flex flex-wrap items-center justify-center gap-6">
      {Array.from({ length: 12 }).map((_, i) => (
        <div
          key={i}
          className="w-16 h-16 md:w-20 md:h-20 rounded-lg bg-muted/20 animate-pulse"
        />
      ))}
    </div>
  );

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
        <div className="text-center mb-16 md:mb-20">
          <div
            className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-secondary/50 border border-border/50 mb-8"
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
              Our Partners
            </span>
          </div>

          <h2
            className="text-[clamp(2rem,5vw,4rem)] font-medium leading-[1.1] tracking-[-0.03em] text-foreground mb-6"
            style={{
              animation:
                "fadeInUp 800ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 200ms backwards",
            }}
          >
            Trusted Worldwide
          </h2>

          <p
            className="text-[clamp(1rem,1.6vw,1.15rem)] font-normal leading-relaxed tracking-tight text-muted-foreground max-w-2xl mx-auto"
            style={{
              animation:
                "fadeInUp 900ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 300ms backwards",
            }}
          >
            Empowering innovation through strategic partnerships with industry
            leaders across the globe.
          </p>
        </div>

        {loading ? (
          <LoadingSkeleton />
        ) : (
          <div
            className="space-y-16"
            style={{
              animation:
                "fadeInUp 1000ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 400ms backwards",
            }}
          >
            {/* National Clients */}
            {nationalClients.length > 0 && (
              <div>
                <SectionDivider title="National Partners" />
                <div className="flex flex-wrap items-center justify-center gap-6 md:gap-8">
                  {nationalClients.map((client, index) => (
                    <ClientLogo
                      key={client.id}
                      item={{
                        id: client.id,
                        name: client.name,
                        logo: client.logo,
                        invert: client.invert,
                      }}
                      index={index}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* International Clients */}
            {internationalClients.length > 0 && (
              <div>
                <SectionDivider title="Global Partners" />
                <div className="flex flex-wrap items-center justify-center gap-6 md:gap-8">
                  {internationalClients.map((client, index) => (
                    <ClientLogo
                      key={client.id}
                      item={{
                        id: client.id,
                        name: client.name,
                        logo: client.logo,
                      }}
                      index={index}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
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
