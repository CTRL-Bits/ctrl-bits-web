import { Button } from "@/components/ui/button";
import { ArrowRight, X, ChefHat, ShoppingCart, Filter } from "lucide-react";
import { Link } from "react-router-dom";
import * as React from "react";
import { Code, Layout, Palette, Database, Globe, Search } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Project, ProjectCardProps } from "@/types";
import { fetchProjects } from "@/services/projectService";
import { motion, AnimatePresence } from "framer-motion";

// Function to map icon string to the appropriate Lucide icon component
const getIconComponent = (iconName: string | null) => {
  switch (iconName) {
    case "ShoppingCart":
      return <ShoppingCart className="stroke-2" />;
    case "ChefHat":
      return <ChefHat className="stroke-2" />;
    case "Layout":
      return <Layout className="stroke-2" />;
    case "Palette":
      return <Palette className="stroke-2" />;
    case "Database":
      return <Database className="stroke-2" />;
    case "Globe":
      return <Globe className="stroke-2" />;
    case "Code":
      return <Code className="stroke-2" />;
    default:
      return <Layout className="stroke-2" />;
  }
};

export default function WorksPage(): React.ReactElement {
  const [activeFilter, setActiveFilter] = React.useState<string>("All");
  const [hoveredProject, setHoveredProject] = React.useState<number | null>(
    null
  );
  const [projects, setProjects] = React.useState<Project[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [searchTerm, setSearchTerm] = React.useState<string>("");
  const [filterMenuOpen, setFilterMenuOpen] = React.useState<boolean>(false);
  const [view, setView] = React.useState<"grid" | "list">("grid");
  const filterMenuRef = React.useRef<HTMLDivElement>(null);

  // Handle clicks outside filter menu
  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        filterMenuRef.current &&
        !filterMenuRef.current.contains(event.target as Node)
      ) {
        setFilterMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Extract unique categories from projects for filter options
  const getCategories = React.useMemo(() => {
    const projectCategories = projects.map((project) => project.category);
    const uniqueCategories = Array.from(new Set(projectCategories));
    return ["All", ...uniqueCategories];
  }, [projects]);

  // Fetch projects data
  React.useEffect(() => {
    const getProjects = async () => {
      try {
        setLoading(true);
        const data = await fetchProjects();
        setProjects(data.results);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "An unknown error occurred"
        );
      } finally {
        setLoading(false);
      }
    };

    getProjects();
  }, []);

  // Filter projects based on active filter and search term
  const filteredProjects: Project[] = React.useMemo(() => {
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
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <h3 className="text-xl font-medium mb-2">Failed to load projects</h3>
          <p className="text-neutral-500 dark:text-neutral-400">{error}</p>
          <Button onClick={() => window.location.reload()} className="mt-4">
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <section className="bg-white dark:bg-black relative">
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-40 -left-24 w-64 h-64 rounded-full bg-primary/5 blur-3xl"></div>
        <div className="absolute bottom-40 -right-24 w-80 h-80 rounded-full bg-secondary/5 blur-3xl"></div>
      </div>

      <div className="py-24 md:py-32 lg:py-40 relative z-10">
        <div className="mx-auto max-w-7xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-24 flex flex-col items-center"
          >
            <span className="px-4 py-1.5 text-xs font-medium text-primary bg-primary/10 rounded-full mb-6">
              Our Portfolio
            </span>
            <h2 className="font-serif text-6xl font-light tracking-tight mb-6 text-center">
              Our{" "}
              <span className="relative inline-block">
                Work
                <span className="absolute -bottom-2 left-0 w-full h-1 bg-primary/30 rounded-full"></span>
              </span>
            </h2>
            <div className="h-px w-12 bg-neutral-200 dark:bg-neutral-800 mb-6"></div>
            <p className="text-neutral-500 dark:text-neutral-400 text-lg max-w-xl text-center font-light">
              Selected projects showcasing our approach to creating meaningful
              digital experiences
            </p>
          </motion.div>

          {/* Search and filter controls */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-12 flex flex-col md:flex-row items-center justify-between gap-4"
          >
            <div className="relative w-full md:w-auto">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Search className="w-4 h-4 text-neutral-500" />
              </div>
              <input
                type="text"
                className="w-full md:w-64 pl-10 pr-4 py-2 bg-neutral-100 dark:bg-neutral-900 border-0 rounded-full focus:ring-2 focus:ring-primary/30 outline-none"
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="flex items-center gap-4 w-full md:w-auto">
              <div
                className="relative flex-grow md:flex-grow-0"
                ref={filterMenuRef}
              >
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setFilterMenuOpen(!filterMenuOpen)}
                  className="rounded-full flex items-center gap-2 border-neutral-200 dark:border-neutral-800"
                >
                  <Filter className="size-4" />
                  <span>Filter</span>
                </Button>

                <AnimatePresence>
                  {filterMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute left-0 mt-2 p-2 bg-white dark:bg-neutral-900 rounded-lg shadow-lg border border-neutral-200 dark:border-neutral-800 z-50 w-48"
                    >
                      {getCategories.map((category) => (
                        <button
                          key={category}
                          onClick={() => {
                            setActiveFilter(category);
                            setFilterMenuOpen(false);
                          }}
                          className={`block w-full text-left px-3 py-2 text-sm rounded-md transition-colors ${
                            activeFilter === category
                              ? "bg-primary/10 text-primary font-medium"
                              : "hover:bg-neutral-100 dark:hover:bg-neutral-800"
                          }`}
                        >
                          {category}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="flex items-center bg-neutral-100 dark:bg-neutral-900 rounded-full p-1">
                <button
                  onClick={() => setView("grid")}
                  className={`p-2 rounded-full ${
                    view === "grid" ? "bg-white dark:bg-black shadow-sm" : ""
                  }`}
                  aria-label="Grid view"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect
                      x="1"
                      y="1"
                      width="6"
                      height="6"
                      rx="1"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    />
                    <rect
                      x="9"
                      y="1"
                      width="6"
                      height="6"
                      rx="1"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    />
                    <rect
                      x="1"
                      y="9"
                      width="6"
                      height="6"
                      rx="1"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    />
                    <rect
                      x="9"
                      y="9"
                      width="6"
                      height="6"
                      rx="1"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    />
                  </svg>
                </button>
                <button
                  onClick={() => setView("list")}
                  className={`p-2 rounded-full ${
                    view === "list" ? "bg-white dark:bg-black shadow-sm" : ""
                  }`}
                  aria-label="List view"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect
                      x="1"
                      y="2"
                      width="14"
                      height="2"
                      rx="1"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    />
                    <rect
                      x="1"
                      y="7"
                      width="14"
                      height="2"
                      rx="1"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    />
                    <rect
                      x="1"
                      y="12"
                      width="14"
                      height="2"
                      rx="1"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </motion.div>

          {/* Active filter indicator */}
          <AnimatePresence>
            {activeFilter !== "All" && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="mb-8 flex items-center justify-center"
              >
                <div className="flex items-center gap-2 px-6 py-2 bg-neutral-100 dark:bg-neutral-900 rounded-full shadow-sm">
                  <span className="text-sm font-medium">
                    Filtering by: {activeFilter}
                  </span>
                  <button
                    onClick={() => setActiveFilter("All")}
                    className="hover:bg-neutral-200 dark:hover:bg-neutral-800 rounded-full p-1 transition-colors"
                    type="button"
                    aria-label="Clear filter"
                  >
                    <X className="size-4" />
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* No results message */}
          {!loading && filteredProjects.length === 0 && (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="w-16 h-16 bg-neutral-100 dark:bg-neutral-900 rounded-full flex items-center justify-center mb-4">
                <Search className="w-8 h-8 text-neutral-400" />
              </div>
              <h3 className="text-xl font-medium mb-2">No projects found</h3>
              <p className="text-neutral-500 dark:text-neutral-400 mb-6">
                Try adjusting your search or filter to find what you're looking
                for
              </p>
              <Button
                variant="outline"
                onClick={() => {
                  setActiveFilter("All");
                  setSearchTerm("");
                }}
              >
                Clear filters
              </Button>
            </div>
          )}

          {/* Project Grid or List */}
          <div
            className={
              view === "grid"
                ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                : "flex flex-col gap-4"
            }
          >
            {loading
              ? // Loading skeletons
                Array.from({ length: 6 }).map((_, index) => (
                  <div
                    key={index}
                    className={`flex ${
                      view === "grid" ? "flex-col" : "flex-row gap-6"
                    } h-full`}
                  >
                    <Skeleton
                      className={
                        view === "grid"
                          ? "h-80 w-full mb-6"
                          : "h-40 w-60 flex-shrink-0"
                      }
                    />
                    <div className="flex-grow">
                      <Skeleton className="h-4 w-20 mb-2" />
                      <Skeleton className="h-6 w-4/5 mb-2" />
                      <Skeleton className="h-4 w-full" />
                    </div>
                  </div>
                ))
              : filteredProjects.map((project) => (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    {view === "grid" ? (
                      <ProjectCard
                        project={project}
                        isHovered={hoveredProject === project.id}
                        onHover={() => setHoveredProject(project.id)}
                        onLeave={() => setHoveredProject(null)}
                      />
                    ) : (
                      <ProjectListItem
                        project={project}
                        isHovered={hoveredProject === project.id}
                        onHover={() => setHoveredProject(project.id)}
                        onLeave={() => setHoveredProject(null)}
                      />
                    )}
                  </motion.div>
                ))}
          </div>

          {/* Category pills */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-24 flex flex-wrap justify-center gap-4"
          >
            {getCategories.slice(1).map((category, index) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setActiveFilter(category)}
                  className={`
                    rounded-none border-b-2 px-1 shadow-none
                    ${
                      activeFilter === category
                        ? "border-primary dark:border-primary"
                        : "border-transparent hover:border-neutral-300 dark:hover:border-neutral-700"
                    }
                  `}
                >
                  {category}
                </Button>
              </motion.div>
            ))}
          </motion.div>

          {/* View All Projects */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-24 flex justify-center"
          >
            <Link
              to="/projects"
              className="group flex items-center gap-2 text-neutral-900 dark:text-neutral-100 hover:gap-3 transition-all duration-300"
            >
              <span className="text-sm font-medium uppercase tracking-widest">
                View All Projects
              </span>
              <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  isHovered,
  onHover,
  onLeave,
}) => {
  const { title, description, category, icon, slug, thumbnail } = project;

  return (
    <div
      className="group relative flex flex-col h-full bg-white dark:bg-black rounded-xl shadow-sm hover:shadow-md transition-all duration-300"
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      <div className="relative overflow-hidden h-80 w-full mb-6 bg-neutral-100 dark:bg-neutral-900 rounded-t-xl">
        {/* Project thumbnail */}
        {thumbnail ? (
          <img
            src={thumbnail}
            alt={title}
            className={`
              absolute inset-0 w-full h-full object-cover
              transition-all duration-500 
              ${isHovered ? "scale-110 opacity-80" : "scale-100"}
            `}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <div
              className={`
              transition-all duration-500 
              ${isHovered ? "scale-110 opacity-20" : "scale-100 opacity-30"}
            `}
            >
              <div className="size-24">
                {icon ? (
                  getIconComponent(icon)
                ) : (
                  <Layout className="stroke-2" />
                )}
              </div>
            </div>
          </div>
        )}

        {/* Overlay with project details on hover */}
        <div
          className={`
          absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent flex items-center justify-center
          transition-opacity duration-500 
          ${isHovered ? "opacity-100" : "opacity-0"}
        `}
        >
          <Link
            to={`/projects/${slug || project.id}`}
            className="px-6 py-3 bg-white dark:bg-black text-black dark:text-white text-sm font-medium hover:bg-primary hover:text-white dark:hover:bg-primary dark:hover:text-black transition-colors"
          >
            View Project
          </Link>
        </div>
      </div>

      {/* Project info */}
      <div className="flex flex-col flex-grow p-6">
        <div className="inline-flex items-center text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider mb-2 bg-neutral-100 dark:bg-neutral-900 px-2 py-1 rounded-full self-start">
          {category}
        </div>
        <h3 className="text-xl font-medium mb-2 transition-transform duration-300 group-hover:translate-x-2">
          {title}
        </h3>
        <p className="text-neutral-500 dark:text-neutral-400 text-sm line-clamp-2 mb-4">
          {description}
        </p>
        <Link
          to={`/projects/${slug || project.id}`}
          className="mt-auto text-primary text-sm font-medium flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity"
        >
          Learn more <ArrowRight className="size-3.5" />
        </Link>
      </div>
    </div>
  );
};

const ProjectListItem: React.FC<ProjectCardProps> = ({
  project,
  isHovered,
  onHover,
  onLeave,
}) => {
  const { title, description, category, icon, slug, thumbnail } = project;

  return (
    <div
      className="group flex flex-col md:flex-row gap-6 h-full bg-white dark:bg-black rounded-xl shadow-sm hover:shadow-md transition-all duration-300 p-4"
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      <div className="relative overflow-hidden h-60 md:h-40 md:w-60 bg-neutral-100 dark:bg-neutral-900 rounded-lg flex-shrink-0">
        {/* Project thumbnail */}
        {thumbnail ? (
          <img
            src={thumbnail}
            alt={title}
            className={`
              absolute inset-0 w-full h-full object-cover
              transition-all duration-500 
              ${isHovered ? "scale-110 opacity-80" : "scale-100"}
            `}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <div
              className={`
              transition-all duration-500 
              ${isHovered ? "scale-110 opacity-20" : "scale-100 opacity-30"}
            `}
            >
              <div className="size-16">
                {icon ? (
                  getIconComponent(icon)
                ) : (
                  <Layout className="stroke-2" />
                )}
              </div>
            </div>
          </div>
        )}

        {/* Category badge */}
        <div className="absolute top-2 left-2 text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider bg-white dark:bg-black px-2 py-1 rounded-full">
          {category}
        </div>
      </div>

      {/* Project info */}
      <div className="flex flex-col flex-grow md:py-2">
        <h3 className="text-xl font-medium mb-2 transition-transform duration-300 group-hover:translate-x-2">
          {title}
        </h3>
        <p className="text-neutral-500 dark:text-neutral-400 text-sm mb-4 line-clamp-3">
          {description}
        </p>
        <div className="mt-auto flex items-center justify-between">
          <Link
            to={`/projects/${slug || project.id}`}
            className="text-primary text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all"
          >
            View details <ArrowRight className="size-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
};
