import { useEffect, useMemo, useState } from "react";
import { Marquee } from "@/components/ui/marquee";
import { fetchCompanies } from "@/services/companyService";
import { cn } from "@/lib/utils";
import type { Company } from "@/types/company";

type CompanyLogoCloudProps = {
  compact?: boolean;
  title?: string;
  splitInternational?: boolean;
  marquee?: boolean;
};

const fallbackCompanies = [
  "Kofora",
  "Beautiful Brows & Henna",
  "Karnaliyaks",
  "Eversend Marketing",
  "Dyneum.io",
  "Dokaan.lu",
  "Planet Living Ventures",
];

const fallbackNationalClients: Company[] = fallbackCompanies
  .slice(0, 4)
  .map((name) => ({ name, is_international: false }));

const fallbackInternationalClients: Company[] = fallbackCompanies
  .slice(4)
  .map((name) => ({ name, is_international: true }));

export default function CompanyLogoCloud({
  compact = false,
  title = "Companies we've worked with",
  splitInternational = false,
  marquee = false,
}: CompanyLogoCloudProps) {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();

    fetchCompanies(controller.signal)
      .then((data) => {
        if (splitInternational) {
          setCompanies(data);
          return;
        }

        setCompanies(data.slice(0, compact ? 8 : 20));
      })
      .catch(() => setCompanies([]))
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });

    return () => controller.abort();
  }, [compact, splitInternational]);

  const hasCompanies = companies.length > 0;
  const nationalClients = useMemo(
    () => companies.filter((company) => !company.is_international),
    [companies],
  );
  const internationalClients = useMemo(
    () => companies.filter((company) => company.is_international),
    [companies],
  );
  const displayNames = useMemo(
    () =>
      hasCompanies
        ? companies.map((company) => company.name || "Client")
        : fallbackCompanies,
    [companies, hasCompanies],
  );
  const marqueeCompanies: Company[] = useMemo(
    () => (hasCompanies ? companies : fallbackCompanies.map((name) => ({ name }))),
    [companies, hasCompanies],
  );
  const marqueeRows = useMemo(
    () =>
      splitInternational
        ? [
            {
              title: "Nepal clients",
              companies: hasCompanies
                ? nationalClients
                : fallbackNationalClients,
              reverse: false,
            },
            {
              title: "International clients",
              companies: hasCompanies
                ? internationalClients
                : fallbackInternationalClients,
              reverse: true,
            },
          ].filter((row) => row.companies.length > 0)
        : [
            {
              title,
              companies: marqueeCompanies,
              reverse: false,
            },
          ],
    [
      hasCompanies,
      internationalClients,
      marqueeCompanies,
      nationalClients,
      splitInternational,
      title,
    ],
  );

  if (marquee) {
    return (
      <div
        className="relative isolate overflow-hidden rounded-[1.25rem] border border-white/[0.10] bg-white/[0.065] px-4 py-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.12),0_18px_70px_rgba(0,0,0,0.12)] backdrop-blur-2xl md:px-6"
        aria-busy={loading}
      >
        <div className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-white/35 to-transparent" />
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.055),transparent_58%)]" />

        <div className="relative mx-auto mb-5 max-w-2xl text-center">
          <p className="text-[10px] font-semibold uppercase tracking-[0.26em] text-white/38">
            Trusted By
          </p>
          <p className="mt-1 text-sm font-medium text-white/72 md:text-base">
            {title}
          </p>
          {loading && (
            <span className="mt-1 block text-xs text-white/36">Loading</span>
          )}
        </div>

        <div className="relative space-y-3">
          {marqueeRows.map((row) => (
            <div
              key={row.title}
              className="grid gap-3 border-t border-white/[0.11] pt-3 first:border-t-0 first:pt-0 md:grid-cols-[7.5rem_minmax(0,1fr)] md:items-center"
            >
              {splitInternational && (
                <div className="flex items-center gap-3 md:block md:text-right">
                  <span className="h-px flex-1 bg-white/[0.12] md:hidden" />
                  <p className="shrink-0 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/42">
                  {row.title}
                  </p>
                  <span className="h-px flex-1 bg-white/[0.12] md:hidden" />
                </div>
              )}
              <Marquee
                pauseOnHover
                reverse={row.reverse}
                repeat={3}
                className="min-w-0 p-0 [--duration:46s] [--gap:2.4rem] [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)] md:[--gap:3.8rem] md:[mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)]"
                aria-label={row.title}
              >
                {row.companies.map((company, index) => (
                  <ClientLogo
                    key={`${company.id || company.name}-${row.title}-${index}`}
                    company={company}
                    transparent
                  />
                ))}
              </Marquee>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-[2rem] border border-white/20 bg-white/55 p-4 backdrop-blur-xl md:p-5">
      <div className="mb-4 flex items-center justify-between gap-4">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-neutral-500">
          {title}
        </p>
        {loading && <span className="text-xs text-neutral-400">Loading</span>}
      </div>
      {hasCompanies && splitInternational ? (
        <div className="space-y-5">
          <ClientGroup title="National clients" companies={nationalClients} />
          <ClientGroup
            title="International clients"
            companies={internationalClients}
          />
        </div>
      ) : (
        <div className="flex flex-wrap items-center gap-2">
          {hasCompanies
            ? companies.map((company, index) => (
                <ClientLogo
                  key={`${company.id || company.name}-${index}`}
                  company={company}
                />
              ))
            : displayNames.map((name) => (
                <span
                  key={name}
                  className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-neutral-700"
                >
                  {name}
                </span>
              ))}
        </div>
      )}
    </div>
  );
}

function ClientGroup({
  title,
  companies,
}: {
  title: string;
  companies: Company[];
}) {
  if (companies.length === 0) return null;

  return (
    <div>
      <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-neutral-500">
        {title}
      </p>
      <div className="flex flex-wrap items-center gap-2">
        {companies.map((company, index) => (
          <ClientLogo
            key={`${company.id || company.name}-${title}-${index}`}
            company={company}
          />
        ))}
      </div>
    </div>
  );
}

function ClientLogo({
  company,
  transparent = false,
}: {
  company: Company;
  transparent?: boolean;
}) {
  return (
    <div
      className={cn(
        "flex h-11 min-w-28 items-center justify-center px-4 transition-all duration-300 hover:-translate-y-0.5",
        transparent
          ? "bg-transparent opacity-86 hover:opacity-100"
          : "rounded-2xl bg-white",
      )}
    >
      {company.logo ? (
        <img
          src={company.logo}
          alt={`${company.name || "Client"} logo`}
          className={`max-h-7 max-w-24 object-contain ${
            company.invert ? "invert" : ""
          }`}
          loading="lazy"
        />
      ) : (
        <span
          className={cn(
            "whitespace-nowrap text-sm font-semibold",
            transparent
              ? "text-white/66"
              : "text-neutral-700",
          )}
        >
          {company.name}
        </span>
      )}
    </div>
  );
}
