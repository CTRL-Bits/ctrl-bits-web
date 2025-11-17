import { useEffect, useState } from "react";

// Types
interface Company {
  id: number;
  name: string;
  logo: string;
  is_international: boolean;
}

interface CompanyResponse {
  results: Company[];
}

// Animated Tooltip Component (Aceternity UI)
const AnimatedTooltip = ({
  items,
  className = "",
}: {
  items: {
    id: number;
    name: string;
    logo: string;
    variant?: "national" | "international";
  }[];
  className?: string;
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div
      className={`flex flex-wrap items-center justify-center gap-4 ${className}`}
    >
      {items.map((item) => (
        <div
          key={item.id}
          className="relative group"
          onMouseEnter={() => setHoveredIndex(item.id)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          {/* Tooltip */}
          <div
            className={`absolute -top-16 left-1/2 transform -translate-x-1/2 px-4 py-2 rounded-xl
              bg-black/90 backdrop-blur-sm border border-white/20 text-white text-sm font-medium
              whitespace-nowrap pointer-events-none transition-all duration-300 z-50
              ${
                hoveredIndex === item.id
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-2"
              }`}
          >
            {item.name}
            <div
              className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 
              border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-black/90"
            />
          </div>

          {/* Client Logo */}
          <div className="relative cursor-target">
            <div
              className={`
                w-16 h-16 rounded-xl bg-white/[0.03] backdrop-blur-sm border border-white/[0.08]
                flex items-center justify-center overflow-hidden
                group-hover:bg-white/[0.08] group-hover:border-white/20 group-hover:scale-110
                transition-all duration-500 
              `}
            >
              <img
                src={item.logo}
                alt={`${item.name} logo`}
                className="max-w-12 max-h-12 object-contain opacity-70 group-hover:opacity-100 transition-opacity duration-500"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = "none";
                  target.nextElementSibling?.classList.remove("hidden");
                }}
              />
              <div
                className={`
                  hidden w-8 h-8 rounded-lg ${
                    item.variant === "national"
                      ? "bg-blue-500"
                      : "bg-violet-500"
                  }
                  flex items-center justify-center text-white text-sm font-bold
                `}
              >
                {item.name.charAt(0)}
              </div>
            </div>

            {/* Glow effect */}
            <div
              className={`
                absolute inset-0 rounded-xl opacity-0 group-hover:opacity-20 transition-opacity duration-700
                ${
                  item.variant === "national"
                    ? "bg-blue-400 shadow-lg shadow-blue-400/20"
                    : "bg-violet-400 shadow-lg shadow-violet-400/20"
                }
                blur-xl -z-10
              `}
            />
          </div>
        </div>
      ))}
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

  const SectionDivider = ({
    title,
    variant,
  }: {
    title: string;
    variant: "national" | "international";
  }) => {
    const isNational = variant === "national";
    return (
      <div className="flex items-center justify-center mb-16">
        <div className="flex items-center gap-6">
          <div
            className={`h-[1px] w-16 bg-gradient-to-r ${
              isNational
                ? "from-transparent via-blue-400/40 to-transparent"
                : "from-transparent via-violet-400/40 to-transparent"
            }`}
          />
          <div className="flex items-center gap-3">
            <div
              className={`w-2 h-2 rounded-full ${
                isNational ? "bg-blue-400" : "bg-violet-400"
              }`}
            />
            <span
              className={`text-sm font-semibold tracking-wider uppercase ${
                isNational ? "text-blue-300" : "text-violet-300"
              }`}
            >
              {title}
            </span>
            <div
              className={`w-2 h-2 rounded-full ${
                isNational ? "bg-blue-400" : "bg-violet-400"
              }`}
            />
          </div>
          <div
            className={`h-[1px] w-16 bg-gradient-to-r ${
              isNational
                ? "from-transparent via-blue-400/40 to-transparent"
                : "from-transparent via-violet-400/40 to-transparent"
            }`}
          />
        </div>
      </div>
    );
  };

  const LoadingSkeleton = () => (
    <div className="flex flex-wrap items-center justify-center gap-4">
      {Array.from({ length: 12 }).map((_, i) => (
        <div
          key={i}
          className="w-16 h-16 rounded-xl bg-white/[0.02] border border-white/[0.05] animate-pulse"
        />
      ))}
    </div>
  );

  return (
    <section className="relative py-32 bg-black overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-900/10 via-transparent to-violet-900/10" />
      <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-blue-500/[0.03] rounded-full blur-3xl" />
      <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-violet-500/[0.03] rounded-full blur-3xl" />

      {/* Subtle grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:64px_64px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-24">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.04] backdrop-blur-sm border border-white/[0.08] mb-8">
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
            <span className="text-blue-200 text-sm font-medium tracking-wide">
              Our Partners
            </span>
          </div>
          <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent mb-6 tracking-tight">
            Trusted Worldwide
          </h2>
          <p className="text-gray-400 text-xl max-w-2xl mx-auto leading-relaxed">
            Empowering innovation through strategic partnerships with industry
            leaders across the globe.
          </p>
        </div>

        {loading ? (
          <LoadingSkeleton />
        ) : (
          <>
            {/* National Clients */}
            {nationalClients.length > 0 && (
              <div className="mb-24">
                <SectionDivider title="National Partners" variant="national" />
                <AnimatedTooltip
                  items={nationalClients.map((client) => ({
                    id: client.id,
                    name: client.name,
                    logo: client.logo,
                    variant: "national" as const,
                  }))}
                  className="max-w-5xl mx-auto "
                />
              </div>
            )}

            {/* International Clients */}
            {internationalClients.length > 0 && (
              <div>
                <SectionDivider
                  title="Global Partners"
                  variant="international"
                />
                <AnimatedTooltip
                  items={internationalClients.map((client) => ({
                    id: client.id,
                    name: client.name,
                    logo: client.logo,
                    variant: "international" as const,
                  }))}
                  className="max-w-5xl mx-auto"
                />
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
