import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

// Icon Components
const ArrowLeftIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    className="w-4 h-4"
  >
    <line x1="19" y1="12" x2="5" y2="12" />
    <polyline points="12 19 5 12 12 5" />
  </svg>
);

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

const CalendarIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    className="w-4 h-4"
  >
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

const UserIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    className="w-4 h-4"
  >
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

// Types
interface Tag {
  name: string;
}

interface Project {
  id: number;
  title: string;
  slug?: string;
  description: string;
  full_description?: string;
  category: string;
  icon: string | null;
  link?: string;
  client: string;
  date?: string;
  tags: Tag[];
  featured: boolean;
  thumbnail?: string;
}

// API Service

// Skeleton Components
const DetailSkeleton = () => (
  <div className="animate-pulse space-y-8">
    <div className="h-8 w-48 bg-gray-200 dark:bg-gray-800 rounded" />
    <div className="space-y-3">
      <div className="h-4 w-32 bg-gray-200 dark:bg-gray-800 rounded" />
      <div className="h-12 w-full bg-gray-200 dark:bg-gray-800 rounded" />
      <div className="h-6 w-3/4 bg-gray-200 dark:bg-gray-800 rounded" />
    </div>
    <div className="aspect-video bg-gray-200 dark:bg-gray-800 rounded-lg" />
    <div className="space-y-3">
      <div className="h-4 w-full bg-gray-200 dark:bg-gray-800 rounded" />
      <div className="h-4 w-full bg-gray-200 dark:bg-gray-800 rounded" />
      <div className="h-4 w-2/3 bg-gray-200 dark:bg-gray-800 rounded" />
    </div>
  </div>
);

export default function ProjectDetailPage() {
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { slug } = useParams();

  const API_URL = "https://api.ctrlbits.xyz/api";

  const fetchProjectBySlug = async (slug: string): Promise<Project> => {
    try {
      const response = await fetch(`${API_URL}/projects/${slug}`);

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Failed to fetch project:", error);
      throw error;
    }
  };

  useEffect(() => {
    const getProjectDetails = async () => {
      if (!slug) {
        setError("Project slug is required");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const data = await fetchProjectBySlug(slug);
        setProject(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load project");
      } finally {
        setLoading(false);
      }
    };

    getProjectDetails();
    window.scrollTo(0, 0);
  }, [slug]);

  if (error || (!loading && !project)) {
    return (
      <section className="min-h-screen bg-white dark:bg-black flex items-center justify-center">
        <div className="text-center px-6">
          <h3 className="text-xl font-medium text-gray-900 dark:text-gray-100 mb-2">
            {error ? "Failed to load project" : "Project not found"}
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            {error || "The project you're looking for doesn't exist."}
          </p>
          <button
            onClick={() => (window.location.href = "/portfolio")}
            className="inline-flex items-center gap-2 px-5 py-2 bg-blue-500 text-white rounded-full text-sm font-medium hover:bg-blue-600 transition-colors"
          >
            <ArrowLeftIcon />
            Back to Projects
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-white dark:bg-black">
      <div className="max-w-4xl mx-auto px-6 py-20 md:py-32">
        {/* Back Button */}
        <div
          className="mb-12"
          style={{
            animation: "fadeIn 500ms ease-out backwards",
          }}
        >
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
          >
            <ArrowLeftIcon />
            Back to Projects
          </button>
        </div>

        {loading ? (
          <DetailSkeleton />
        ) : project ? (
          <div className="space-y-12">
            {/* Header */}
            <div
              className="space-y-6"
              style={{
                animation: "fadeIn 600ms ease-out 100ms backwards",
              }}
            >
              <div className="inline-block px-3 py-1 bg-gray-100 dark:bg-gray-900 rounded-full">
                <span className="text-xs font-medium text-gray-600 dark:text-gray-400">
                  {project.category}
                </span>
              </div>

              <h1 className="text-4xl md:text-5xl font-semibold text-gray-900 dark:text-gray-100">
                {project.title}
              </h1>

              <p className="text-lg text-gray-600 dark:text-gray-400">
                {project.description}
              </p>

              {/* Meta Info */}
              <div className="flex flex-wrap gap-6 pt-4">
                <div className="flex items-center gap-2 text-sm">
                  <UserIcon />
                  <span className="text-gray-600 dark:text-gray-400">
                    {project.client}
                  </span>
                </div>

                {project.date && (
                  <div className="flex items-center gap-2 text-sm">
                    <CalendarIcon />
                    <span className="text-gray-600 dark:text-gray-400">
                      {new Date(project.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                      })}
                    </span>
                  </div>
                )}
              </div>

              {/* Action Button */}
              {project.link && (
                <div className="pt-2">
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2 bg-blue-500 text-white rounded-full text-sm font-medium hover:bg-blue-600 transition-colors"
                  >
                    Visit Project
                    <ExternalLinkIcon />
                  </a>
                </div>
              )}
            </div>

            {/* Thumbnail */}
            {project.thumbnail && (
              <div
                className="aspect-video bg-gray-50 dark:bg-gray-900 rounded-lg overflow-hidden"
                style={{
                  animation: "fadeIn 700ms ease-out 200ms backwards",
                }}
              >
                <img
                  src={project.thumbnail}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            {/* Content */}
            <div
              className="prose prose-gray dark:prose-invert max-w-none"
              style={{
                animation: "fadeIn 700ms ease-out 300ms backwards",
              }}
            >
              {project.full_description ? (
                <div
                  dangerouslySetInnerHTML={{
                    __html: project.full_description,
                  }}
                  className="text-gray-600 dark:text-gray-400 leading-relaxed"
                />
              ) : (
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  {project.description}
                </p>
              )}
            </div>

            {/* Technologies */}
            {project.tags.length > 0 && (
              <div
                className="pt-8 border-t border-gray-200 dark:border-gray-800"
                style={{
                  animation: "fadeIn 700ms ease-out 400ms backwards",
                }}
              >
                <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-4">
                  Technologies
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300 rounded-full text-xs font-medium"
                    >
                      {tag.name}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Navigation */}
            <div
              className="pt-12"
              style={{
                animation: "fadeIn 700ms ease-out 500ms backwards",
              }}
            >
              <button
                onClick={() => window.history.back()}
                className="inline-flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
              >
                <ArrowLeftIcon />
                View All Projects
              </button>
            </div>
          </div>
        ) : null}
      </div>

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

        .prose h2 {
          font-size: 1.5rem;
          font-weight: 600;
          margin-top: 2rem;
          margin-bottom: 1rem;
          color: inherit;
        }

        .prose h3 {
          font-size: 1.25rem;
          font-weight: 600;
          margin-top: 1.5rem;
          margin-bottom: 0.75rem;
          color: inherit;
        }

        .prose p {
          margin-bottom: 1rem;
        }

        .prose ul,
        .prose ol {
          margin-top: 1rem;
          margin-bottom: 1rem;
          padding-left: 1.5rem;
        }

        .prose li {
          margin-bottom: 0.5rem;
        }

        .prose a {
          color: #3b82f6;
          text-decoration: underline;
        }

        .prose a:hover {
          color: #2563eb;
        }

        .dark .prose a {
          color: #60a5fa;
        }

        .dark .prose a:hover {
          color: #3b82f6;
        }
      `}</style>
    </section>
  );
}
