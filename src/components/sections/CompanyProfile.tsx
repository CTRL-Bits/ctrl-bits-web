import { useEffect, useState } from "react";
import { Globe2, Mail, MapPin } from "lucide-react";
import EmptyState from "@/components/shared/EmptyState";
import ErrorState from "@/components/shared/ErrorState";
import LoadingState from "@/components/shared/LoadingState";
import SectionHeader from "@/components/shared/SectionHeader";
import { fetchCompanies, fetchCompanyProfile } from "@/services/companyService";
import type { Company } from "@/types/company";

const fallbackCompany: Company = {
  name: "Ctrl Bits",
  tagline: "Ctrl the code, bit by bit",
  description:
    "Ctrl Bits is a Nepal-based digital agency building practical systems for growing businesses.",
  email: "hi@ctrlbits.com",
  website: "https://ctrlbits.com",
  address: "Nepal Based, Global Ready",
  founded_year: 2026,
};

export default function CompanyProfile() {
  const [company, setCompany] = useState<Company | null>(null);
  const [partnerCount, setPartnerCount] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    Promise.all([
      fetchCompanyProfile(controller.signal),
      fetchCompanies(controller.signal),
    ])
      .then(([profile, companies]) => {
        setCompany(profile);
        setPartnerCount(companies.length);
      })
      .catch(() => {
        if (controller.signal.aborted) return;
        setError("Company information could not be loaded right now.");
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });

    return () => controller.abort();
  }, []);

  const displayCompany = company || fallbackCompany;
  const description =
    displayCompany.description ||
    displayCompany.about ||
    fallbackCompany.description;
  const services =
    Array.isArray(displayCompany.services) && displayCompany.services.length > 0
      ? displayCompany.services
      : [
          "Web development",
          "App development",
          "Custom software",
          "UI/UX design",
          "Creative services",
          "Digital marketing",
        ];

  return (
    <section id="company" className="bg-[#F5F5F5] px-4 py-24 md:px-8">
      <div className="mx-auto grid max-w-[88rem] gap-6 lg:grid-cols-[0.85fr_1.15fr]">
        <div className="rounded-[2.5rem] bg-white p-8 md:p-10">
          <SectionHeader
            eyebrow="Company"
            title={displayCompany.name || "Ctrl Bits"}
            description={displayCompany.tagline || fallbackCompany.tagline}
          />

          {loading ? (
            <div className="mt-8">
              <LoadingState label="Loading company" variant="compact" />
            </div>
          ) : error ? (
            <div className="mt-8">
              <ErrorState message={error} />
            </div>
          ) : !displayCompany ? (
            <div className="mt-8">
              <EmptyState message="Company information will be updated soon." />
            </div>
          ) : (
            <p className="mt-8 text-lg leading-8 text-neutral-600">
              {description}
            </p>
          )}

          <div className="mt-8 grid gap-3 text-sm text-neutral-600">
            <a
              href={`mailto:${displayCompany.email || fallbackCompany.email}`}
              className="flex items-center gap-3 hover:text-[#0058fc]"
            >
              <Mail className="h-4 w-4" aria-hidden="true" />
              {displayCompany.email || fallbackCompany.email}
            </a>
            <a
              href={displayCompany.website || fallbackCompany.website}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 hover:text-[#0058fc]"
            >
              <Globe2 className="h-4 w-4" aria-hidden="true" />
              {displayCompany.website || fallbackCompany.website}
            </a>
            <p className="flex items-center gap-3">
              <MapPin className="h-4 w-4" aria-hidden="true" />
              {displayCompany.address || displayCompany.location || "Nepal"}
            </p>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <StatCard
            value={`${displayCompany.founded_year || "2026"}`}
            label="Founded"
          />
          <StatCard value="Web / App" label="Major Revenue Focus" />
          <StatCard value="Nepal" label="Based, Global Ready" />
          <StatCard
            value={partnerCount ? `${partnerCount}+` : "API"}
            label="Client and partner records"
          />
          <div className="rounded-[2rem] bg-white p-6 sm:col-span-2">
            <h3 className="text-xl font-semibold tracking-[-0.04em]">
              Major services
            </h3>
            <div className="mt-5 flex flex-wrap gap-2">
              {services.map((service) => (
                <span
                  key={service}
                  className="rounded-full bg-[#0058fc]/10 px-3 py-2 text-sm font-semibold text-[#0058fc]"
                >
                  {service}
                </span>
              ))}
            </div>
            {(displayCompany.mission || displayCompany.vision) && (
              <p className="mt-6 text-sm leading-6 text-neutral-600">
                {displayCompany.mission || displayCompany.vision}
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function StatCard({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-[2rem] bg-white p-6">
      <p className="text-3xl font-semibold tracking-[-0.055em] text-[#0058fc]">
        {value}
      </p>
      <p className="mt-3 text-sm leading-6 text-neutral-600">{label}</p>
    </div>
  );
}
