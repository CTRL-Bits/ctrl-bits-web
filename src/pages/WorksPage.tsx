import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";

// Icon components
const ShoppingCartIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    className="w-full h-full"
  >
    <circle cx="9" cy="21" r="1" />
    <circle cx="20" cy="21" r="1" />
    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
  </svg>
);

const ChefHatIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    className="w-full h-full"
  >
    <path d="M6 13.87A4 4 0 0 1 7.41 6a5.11 5.11 0 0 1 1.05-1.54 5 5 0 0 1 7.08 0A5.11 5.11 0 0 1 16.59 6 4 4 0 0 1 18 13.87V21H6Z" />
    <line x1="6" y1="17" x2="18" y2="17" />
  </svg>
);

const LayoutIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    className="w-full h-full"
  >
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <line x1="3" y1="9" x2="21" y2="9" />
    <line x1="9" y1="21" x2="9" y2="9" />
  </svg>
);

const SearchIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    className="w-5 h-5"
  >
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.35-4.35" />
  </svg>
);

const XIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    className="w-4 h-4"
  >
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
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

const PaletteIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    className="w-full h-full"
  >
    <circle cx="13.5" cy="6.5" r=".5" />
    <circle cx="17.5" cy="10.5" r=".5" />
    <circle cx="8.5" cy="7.5" r=".5" />
    <circle cx="6.5" cy="12.5" r=".5" />
    <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z" />
  </svg>
);

const DatabaseIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    className="w-full h-full"
  >
    <ellipse cx="12" cy="5" rx="9" ry="3" />
    <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
    <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
  </svg>
);

const GlobeIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    className="w-full h-full"
  >
    <circle cx="12" cy="12" r="10" />
    <line x1="2" y1="12" x2="22" y2="12" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
);

const CodeIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    className="w-full h-full"
  >
    <polyline points="16 18 22 12 16 6" />
    <polyline points="8 6 2 12 8 18" />
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
  thumbnailClass?: string;
  thumbnail?: string;
}

interface PaginationLinks {
  next: string | null;
  previous: string | null;
}

interface ProjectsResponse {
  links: PaginationLinks;
  count: number;
  total_pages: number;
  current_page: number;
  results: Project[];
}

// API Service
const API_URL = "https://api.ctrlbits.xyz/api";

const fetchProjects = async (): Promise<ProjectsResponse> => {
  try {
    const response = await fetch(`${API_URL}/projects`);

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Failed to fetch projects:", error);
    throw error;
  }
};

const getIconComponent = (iconName: string | null) => {
  switch (iconName) {
    case "ShoppingCart":
      return <ShoppingCartIcon />;
    case "ChefHat":
      return <ChefHatIcon />;
    case "Palette":
      return <PaletteIcon />;
    case "Database":
      return <DatabaseIcon />;
    case "Globe":
      return <GlobeIcon />;
    case "Code":
      return <CodeIcon />;
    default:
      return <LayoutIcon />;
  }
};

interface ProjectCardProps {
  project: Project;
  isHovered: boolean;
  onHover: () => void;
  onLeave: () => void;
}

const ProjectCard = ({
  project,
  isHovered,
  onHover,
  onLeave,
}: ProjectCardProps) => {
  const { title, description, category, icon, thumbnail } = project;

  return (
    <div
      className="group cursor-pointer"
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      style={{
        animation: "fadeInUp 600ms ease-out backwards",
      }}
    >
      {/* Thumbnail Area */}
      <div className="relative aspect-[4/3] bg-gray-50 dark:bg-gray-900 rounded-lg mb-4 overflow-hidden">
        {thumbnail ? (
          <>
            <img
              src={thumbnail}
              alt={title}
              className="absolute inset-0 w-full h-full object-cover transition-all duration-500"
              style={{
                transform: isHovered ? "scale(1.05)" : "scale(1)",
                opacity: isHovered ? 0.8 : 1,
              }}
            />
            {/* Hover Overlay on thumbnail */}
            <Link
              to={`/projects/${project.slug}`}
              className="absolute inset-0 bg-blue-500 flex items-center justify-center transition-opacity duration-300"
              style={{
                opacity: isHovered ? 1 : 0,
              }}
            >
              <span className="text-white text-sm font-medium">
                View Project
              </span>
            </Link>
          </>
        ) : (
          <>
            <div
              className="absolute inset-0 flex items-center justify-center transition-all duration-500"
              style={{
                transform: isHovered ? "scale(1.05)" : "scale(1)",
                opacity: isHovered ? 0.3 : 0.15,
              }}
            >
              <div className="w-20 h-20 text-gray-400 dark:text-gray-600">
                {getIconComponent(icon)}
              </div>
            </div>
            {/* Hover Overlay */}
            <div
              className="absolute inset-0 bg-blue-500 flex items-center justify-center transition-opacity duration-300"
              style={{
                opacity: isHovered ? 1 : 0,
              }}
            >
              <span className="text-white text-sm font-medium">
                View Project
              </span>
            </div>
          </>
        )}
      </div>

      {/* Content */}
      <div className="space-y-2">
        <div className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider">
          {category}
        </div>
        <h3
          className="text-lg font-medium text-gray-900 dark:text-gray-100 transition-transform duration-300"
          style={{
            transform: isHovered ? "translateX(4px)" : "translateX(0)",
          }}
        >
          {title}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
          {description}
        </p>
      </div>
    </div>
  );
};

const SkeletonCard = () => (
  <div className="animate-pulse">
    <div className="aspect-[4/3] bg-gray-200 dark:bg-gray-800 rounded-lg mb-4" />
    <div className="space-y-2">
      <div className="h-3 w-20 bg-gray-200 dark:bg-gray-800 rounded" />
      <div className="h-5 w-3/4 bg-gray-200 dark:bg-gray-800 rounded" />
      <div className="h-4 w-full bg-gray-200 dark:bg-gray-800 rounded" />
    </div>
  </div>
);

export default function WorksPage() {
  const [activeFilter, setActiveFilter] = useState<string>("All");
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");

  // Fetch projects on mount
  useEffect(() => {
    const getProjects = async () => {
      try {
        setLoading(true);
        const data = await fetchProjects();
        setProjects(data.results);
        setError(null);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to load projects"
        );
      } finally {
        setLoading(false);
      }
    };

    getProjects();
  }, []);

  const getCategories = useMemo(() => {
    const projectCategories = projects.map((project) => project.category);
    const uniqueCategories = Array.from(new Set(projectCategories));
    return ["All", ...uniqueCategories];
  }, [projects]);

  const filteredProjects = useMemo(() => {
    const filtered =
      activeFilter === "All"
        ? projects.filter((project) => project.featured)
        : projects.filter(
            (project) => project.category === activeFilter && project.featured
          );

    if (searchTerm.trim() === "") return filtered;

    return filtered.filter(
      (project) =>
        project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [projects, activeFilter, searchTerm]);

  if (error) {
    return (
      <section className="min-h-screen bg-white dark:bg-black flex items-center justify-center">
        <div className="text-center px-6">
          <h3 className="text-xl font-medium text-gray-900 dark:text-gray-100 mb-2">
            Failed to load projects
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
    <section className="min-h-screen bg-white dark:bg-black">
      <div className="max-w-6xl mx-auto px-6 py-20 md:py-32">
        {/* Header */}
        <div
          className="text-center mb-20"
          style={{
            animation: "fadeIn 700ms ease-out 100ms backwards",
          }}
        >
          <div className="inline-block px-3 py-1 bg-gray-100 dark:bg-gray-900 rounded-full mb-4">
            <span className="text-xs font-medium text-gray-600 dark:text-gray-400">
              Portfolio
            </span>
          </div>
          <h1 className="text-5xl md:text-6xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
            Our Works
          </h1>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Crafting digital experiences that matter
          </p>
        </div>

        {/* Search & Filters */}
        <div
          className="mb-12 space-y-6"
          style={{
            animation: "fadeIn 700ms ease-out 200ms backwards",
          }}
        >
          {/* Search Bar */}
          <div className="max-w-md mx-auto relative">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-gray-400">
              <SearchIcon />
            </div>
            <input
              type="text"
              className="w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-full text-sm focus:outline-none focus:border-blue-500 dark:focus:border-blue-500 transition-colors text-gray-900 dark:text-gray-100"
              placeholder="Search projects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Filter Tabs */}
          {!loading && (
            <div className="flex flex-wrap justify-center gap-2">
              {getCategories.map((category) => {
                const isActive = activeFilter === category;
                return (
                  <button
                    key={category}
                    onClick={() => setActiveFilter(category)}
                    className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? "bg-blue-500 text-white"
                        : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-900"
                    }`}
                  >
                    {category}
                  </button>
                );
              })}
            </div>
          )}

          {/* Active Filter Indicator */}
          {activeFilter !== "All" && (
            <div
              className="flex justify-center"
              style={{
                animation: "fadeIn 300ms ease-out",
              }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-900 rounded-full">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {activeFilter}
                </span>
                <button
                  onClick={() => setActiveFilter("All")}
                  className="hover:bg-gray-200 dark:hover:bg-gray-800 rounded-full p-1 transition-colors"
                  aria-label="Clear filter"
                >
                  <XIcon />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Projects Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
            {Array.from({ length: 6 }).map((_, index) => (
              <SkeletonCard key={index} />
            ))}
          </div>
        ) : filteredProjects.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 dark:bg-gray-900 rounded-full flex items-center justify-center text-gray-400">
              <SearchIcon />
            </div>
            <h3 className="text-xl font-medium text-gray-900 dark:text-gray-100 mb-2">
              No projects found
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Try adjusting your search or filter
            </p>
            <button
              onClick={() => {
                setActiveFilter("All");
                setSearchTerm("");
              }}
              className="px-5 py-2 bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 rounded-full text-sm font-medium hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
            {filteredProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                isHovered={hoveredProject === project.id}
                onHover={() => setHoveredProject(project.id)}
                onLeave={() => setHoveredProject(null)}
              />
            ))}
          </div>
        )}

        {/* View All Link */}
        {!loading && filteredProjects.length > 0 && (
          <div
            className="mt-20 text-center"
            style={{
              animation: "fadeIn 700ms ease-out 400ms backwards",
            }}
          >
            <button className="group inline-flex items-center gap-2 text-gray-900 dark:text-gray-100 hover:text-blue-500 dark:hover:text-blue-500 transition-colors">
              <span className="text-sm font-medium">View All Projects</span>
              <div
                className="transition-transform duration-300"
                style={{
                  transform: hoveredProject
                    ? "translateX(4px)"
                    : "translateX(0)",
                }}
              >
                <ArrowRightIcon />
              </div>
            </button>
          </div>
        )}
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
    </section>
  );
}
