import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  ArrowUpRight,
  CalendarDays,
  CheckCircle2,
  ExternalLink,
  Layers3,
  Tag,
  UserRound,
} from "lucide-react";
import SchemaMarkup from "@/components/schema-markup";
import { usePageMetadata } from "@/hooks/usePageMetadata";
import { fetchProjectBySlug } from "@/services/projectService";
import type { Project } from "@/types";

function formatDate(value?: string): string | null {
  if (!value) return null;

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return null;

  return new Intl.DateTimeFormat("en", {
    month: "long",
    year: "numeric",
  }).format(date);
}

function getProjectSummary(project: Project): string {
  return (
    project.description ||
    project.full_description?.replace(/<[^>]+>/g, " ").trim() ||
    "Project case study from Ctrl Bits."
  );
}

const DetailSkeleton = () => (
  <section className="min-h-screen bg-[#f5f5f5] px-4 py-24 md:px-8">
    <div className="mx-auto max-w-[88rem] animate-pulse">
      <div className="h-10 w-40 rounded-full bg-neutral-200" />
      <div className="mt-12 grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
        <div>
          <div className="h-5 w-28 rounded bg-neutral-200" />
          <div className="mt-5 h-20 w-full rounded bg-neutral-200" />
          <div className="mt-5 h-6 w-3/4 rounded bg-neutral-200" />
        </div>
        <div className="aspect-[16/10] rounded-[2rem] bg-neutral-200" />
      </div>
    </div>
  </section>
);

export default function ProjectDetailPage() {
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { slug } = useParams();
  const navigate = useNavigate();

  const projectDescription = project ? getProjectSummary(project) : "Project Details";
  const projectKeywords =
    project?.tags?.map((tag) => tag.name).join(", ") ||
    "web development project, Kathmandu, Nepal";

  usePageMetadata({
    title: project?.title || "Project Details",
    description: projectDescription,
    keywords: projectKeywords,
    ogTitle: project?.title
      ? `${project.title} | Ctrl Bits`
      : "Project Details | Ctrl Bits",
    ogDescription: projectDescription,
    ogImage: project?.thumbnail,
    ogUrl: slug
      ? `https://www.ctrlbits.com/projects/${slug}`
      : "https://www.ctrlbits.com/projects",
    canonical: slug
      ? `https://www.ctrlbits.com/projects/${slug}`
      : "https://www.ctrlbits.com/projects",
    twitterCard: project?.thumbnail ? "summary_large_image" : "summary",
  });

  useEffect(() => {
    const getProjectDetails = async () => {
      if (!slug) {
        setError("Project slug is required.");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const data = await fetchProjectBySlug(slug);
        setProject(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load project.");
      } finally {
        setLoading(false);
      }
    };

    getProjectDetails();
    window.scrollTo(0, 0);
  }, [slug]);

  const formattedDate = useMemo(() => formatDate(project?.date), [project?.date]);
  const tags = project?.tags || [];

  if (loading) return <DetailSkeleton />;

  if (error || !project) {
    return (
      <section className="flex min-h-screen items-center justify-center bg-[#f5f5f5] px-4">
        <SchemaMarkup
          type="webpage"
          pageName={project?.title || "Project Details"}
          pageUrl={
            slug
              ? `https://www.ctrlbits.com/projects/${slug}`
              : "https://www.ctrlbits.com/projects"
          }
        />
        <div className="max-w-md rounded-[2rem] bg-white p-8 text-center">
          <h1 className="text-2xl font-semibold tracking-[-0.05em] text-neutral-950">
            {error ? "Failed to load project" : "Project not found"}
          </h1>
          <p className="mt-3 text-sm leading-7 text-neutral-600">
            {error || "The project you are looking for does not exist."}
          </p>
          <Link
            to="/portfolio"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#0058fc] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#0046c9]"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Back to portfolio
          </Link>
        </div>
      </section>
    );
  }

  return (
    <main className="bg-[#f5f5f5] text-neutral-950">
      <SchemaMarkup
        type="webpage"
        pageName={project.title || "Project Details"}
        pageUrl={
          slug
            ? `https://www.ctrlbits.com/projects/${slug}`
            : "https://www.ctrlbits.com/projects"
        }
      />

      <section className="relative overflow-hidden bg-[#05070d] px-4 pb-14 pt-28 text-white md:px-8 md:pb-20 md:pt-36">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_16%_0%,rgba(0,88,252,0.30),transparent_34%),radial-gradient(circle_at_88%_100%,rgba(255,255,255,0.10),transparent_30%)]" />
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(118deg,rgba(5,7,13,0.98)_0%,rgba(0,24,82,0.88)_48%,rgba(0,88,252,0.28)_100%)]" />

        <div className="relative mx-auto max-w-[88rem]">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 text-sm font-semibold text-white/58 transition-colors hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Back
          </button>

          <div className="mt-12 grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/42">
                Case Study
              </p>
              <h1 className="mt-5 max-w-4xl text-5xl font-semibold leading-[0.94] tracking-[-0.075em] md:text-7xl">
                {project.title}
              </h1>
              <p className="mt-7 max-w-2xl text-lg leading-8 text-white/64">
                {project.description}
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                {project.category && (
                  <MetaPill icon={<Layers3 className="h-4 w-4" />} label={project.category} />
                )}
                {project.client && (
                  <MetaPill icon={<UserRound className="h-4 w-4" />} label={project.client} />
                )}
                {formattedDate && (
                  <MetaPill icon={<CalendarDays className="h-4 w-4" />} label={formattedDate} />
                )}
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-3 rounded-[2.2rem] bg-white/10 blur-2xl" />
              <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.07] p-2 shadow-[0_28px_100px_rgba(0,0,0,0.26)] backdrop-blur-xl">
                <div className="aspect-[16/10] overflow-hidden rounded-[1.5rem] bg-[linear-gradient(135deg,#0b1220,#0058fc)]">
                  {project.thumbnail ? (
                    <img
                      src={project.thumbnail}
                      alt={`${project.title} case study preview`}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center p-10 text-center">
                      <span className="max-w-md text-4xl font-semibold leading-none tracking-[-0.07em] text-white/72">
                        {project.title}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-16 md:px-8 md:py-24">
        <div className="mx-auto grid max-w-[88rem] gap-8 lg:grid-cols-[0.72fr_1.28fr]">
          <aside className="space-y-4 lg:sticky lg:top-28 lg:self-start">
            <InfoCard title="Snapshot">
              <InfoRow label="Category" value={project.category || "Project"} />
              <InfoRow label="Client" value={project.client || "Confidential"} />
              {formattedDate && <InfoRow label="Delivered" value={formattedDate} />}
              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#0058fc] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#0046c9]"
                >
                  Visit project
                  <ExternalLink className="h-4 w-4" aria-hidden="true" />
                </a>
              )}
            </InfoCard>

            {tags.length > 0 && (
              <InfoCard title="Technologies">
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag, index) => (
                    <span
                      key={`${tag.name}-${index}`}
                      className="inline-flex items-center gap-1.5 rounded-full bg-neutral-100 px-3 py-2 text-xs font-semibold text-neutral-700"
                    >
                      <Tag className="h-3.5 w-3.5 text-[#0058fc]" aria-hidden="true" />
                      {tag.name}
                    </span>
                  ))}
                </div>
              </InfoCard>
            )}
          </aside>

          <article className="rounded-[2rem] bg-white p-6 md:p-10">
            <div className="border-b border-neutral-200 pb-8">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#0058fc]">
                Overview
              </p>
              <h2 className="mt-4 max-w-3xl text-4xl font-semibold tracking-[-0.065em] md:text-5xl">
                A focused build shaped around usability, operations, and clarity.
              </h2>
              <p className="mt-5 max-w-3xl text-base leading-8 text-neutral-600">
                {project.description}
              </p>
            </div>

            <div className="grid gap-4 border-b border-neutral-200 py-8 md:grid-cols-3">
              {[
                "Clear business workflow",
                "Responsive user experience",
                "Maintainable delivery structure",
              ].map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <CheckCircle2
                    className="mt-1 h-5 w-5 shrink-0 text-[#0058fc]"
                    aria-hidden="true"
                  />
                  <p className="text-sm leading-6 text-neutral-700">{item}</p>
                </div>
              ))}
            </div>

            <div className="case-study-content pt-8">
              {project.full_description ? (
                <div dangerouslySetInnerHTML={{ __html: project.full_description }} />
              ) : (
                <p>{project.description}</p>
              )}
            </div>
          </article>
        </div>
      </section>

      <section className="px-4 pb-20 md:px-8">
        <div className="mx-auto grid max-w-[88rem] gap-5 rounded-[2rem] bg-[#05070d] p-7 text-white md:grid-cols-[1fr_auto] md:items-center md:p-9">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/38">
              Build something similar
            </p>
            <h2 className="mt-3 max-w-2xl text-3xl font-semibold tracking-[-0.055em] md:text-5xl">
              Need a practical digital system for your team?
            </h2>
          </div>
          <Link
            to="/contact"
            className="inline-flex w-fit items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-[#001ea2] transition-colors hover:bg-[#dbe8ff]"
          >
            Start a project
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </section>
    </main>
  );
}

function MetaPill({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.07] px-4 py-2 text-sm font-semibold text-white/70 backdrop-blur">
      <span className="text-white/44">{icon}</span>
      {label}
    </span>
  );
}

function InfoCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-[2rem] bg-white p-6">
      <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-400">
        {title}
      </h2>
      <div className="mt-5">{children}</div>
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-b border-neutral-100 py-3 first:pt-0 last:border-b-0 last:pb-0">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-neutral-400">
        {label}
      </p>
      <p className="mt-1 text-sm font-semibold text-neutral-800">{value}</p>
    </div>
  );
}
