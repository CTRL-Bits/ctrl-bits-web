import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, Search } from "lucide-react";
import EmptyState from "@/components/shared/EmptyState";
import ErrorState from "@/components/shared/ErrorState";
import LoadingState from "@/components/shared/LoadingState";
import SectionHeader from "@/components/shared/SectionHeader";
import { fetchProjects } from "@/services/projectService";
import type { Project } from "@/types";

type CaseStudiesGridProps = {
  preview?: boolean;
};

export default function CaseStudiesGrid({ preview = false }: CaseStudiesGridProps) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState("All");
  const [query, setQuery] = useState("");

  useEffect(() => {
    fetchProjects()
      .then((data) => setProjects(data.results || []))
      .catch(() => setError("Case studies could not be loaded right now."))
      .finally(() => setLoading(false));
  }, []);

  const categories = useMemo(
    () => [
      "All",
      ...Array.from(new Set(projects.map((project) => project.category).filter(Boolean))),
    ],
    [projects],
  );

  const filteredProjects = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return projects
      .filter((project) => !preview || project.featured)
      .filter((project) => activeCategory === "All" || project.category === activeCategory)
      .filter((project) => {
        if (!normalizedQuery) return true;
        return `${project.title} ${project.description} ${project.category} ${project.client}`
          .toLowerCase()
          .includes(normalizedQuery);
      })
      .slice(0, preview ? 6 : projects.length);
  }, [activeCategory, preview, projects, query]);

  return (
    <section className="bg-[#f5f5f5] px-4 py-20 md:px-8 md:py-28">
      <div className="mx-auto max-w-[88rem]">
        <div className="mb-10 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <SectionHeader
            eyebrow={preview ? "Selected Work" : "Portfolio"}
            title={preview ? "Case studies with a point of view" : "Portfolio and case studies"}
            description="A focused archive of websites, software systems, digital products, creative builds, and growth work delivered by Ctrl Bits."
          />
          {!preview && (
            <div className="relative w-full max-w-md">
              <Search
                className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400"
                aria-hidden="true"
              />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search case studies..."
                className="w-full rounded-full border border-neutral-200 bg-white py-3 pl-11 pr-4 text-sm outline-none transition-colors focus:border-[#0058fc]"
              />
            </div>
          )}
        </div>

        {!preview && (
          <div className="mb-8 flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                  activeCategory === category
                    ? "bg-[#0058fc] text-white"
                    : "bg-white text-neutral-600 hover:text-[#0058fc]"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        )}

        {loading ? (
          <LoadingState label="Loading case studies" count={6} />
        ) : error ? (
          <ErrorState message={error} />
        ) : filteredProjects.length === 0 ? (
          <EmptyState message="No case studies matched this filter." />
        ) : (
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {filteredProjects.map((project, index) => (
              <Link
                key={project.id || project.slug || index}
                to={`/projects/${project.slug || project.id}`}
                className="group overflow-hidden rounded-[2rem] bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_30px_90px_rgba(0,0,0,0.10)]"
              >
                <div className="relative aspect-[1.35] overflow-hidden bg-neutral-100">
                  {project.thumbnail ? (
                    <img
                      src={project.thumbnail}
                      alt={`${project.title} case study by Ctrl Bits`}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center bg-[radial-gradient(circle_at_30%_20%,rgba(0,88,252,0.24),transparent_28%),linear-gradient(135deg,#f7f7f7,#e8eef4)]">
                      <span className="text-7xl font-semibold tracking-[-0.08em] text-[#0058fc]/25">
                        {project.title.slice(0, 1)}
                      </span>
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between gap-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#0058fc]">
                      {project.category || "Case Study"}
                    </p>
                    <ArrowUpRight
                      className="h-5 w-5 text-neutral-400 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[#0058fc]"
                      aria-hidden="true"
                    />
                  </div>
                  <h3 className="mt-5 text-2xl font-semibold tracking-[-0.05em] text-neutral-950">
                    {project.title}
                  </h3>
                  <p className="mt-3 line-clamp-3 text-sm leading-6 text-neutral-600">
                    {project.description}
                  </p>
                  {project.client && (
                    <p className="mt-5 text-xs font-semibold text-neutral-400">
                      Client: {project.client}
                    </p>
                  )}
                </div>
              </Link>
            ))}
          </div>
        )}

        {preview && (
          <div className="mt-10">
            <Link
              to="/portfolio"
              className="inline-flex items-center gap-2 rounded-full bg-neutral-950 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#0058fc]"
            >
              View portfolio
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
