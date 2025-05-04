import { Button } from "@/components/ui/button";
import { ArrowRight, X, ChefHat, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import * as React from "react";
import { Code, Layout, Palette, Database, Globe } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Project, ProjectCardProps } from "@/types";
import { fetchProjects } from "@/services/projectService";

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

  // Filter projects based on active filter
  const filteredProjects: Project[] = React.useMemo(() => {
    return activeFilter === "All"
      ? projects
      : projects.filter((project) => project.category === activeFilter);
  }, [projects, activeFilter]);

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
    <section className="bg-white dark:bg-black">
      <div className="py-40">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-24 flex flex-col items-center">
            <h2 className="font-serif text-6xl font-light tracking-tight mb-6">
              Our Work
            </h2>
            <div className="h-px w-12 bg-neutral-200 dark:bg-neutral-800 mb-6"></div>
            <p className="text-neutral-500 dark:text-neutral-400 text-lg max-w-xl text-center font-light">
              Selected projects showcasing our approach to creating meaningful
              digital experiences
            </p>
          </div>

          {/* Filtering */}
          {activeFilter !== "All" && (
            <div className="mb-12 flex items-center justify-center">
              <div className="flex items-center gap-2 px-6 py-2 bg-neutral-100 dark:bg-neutral-900 rounded-full">
                <span className="text-sm font-medium">
                  Filtering by: {activeFilter}
                </span>
                <button
                  onClick={() => setActiveFilter("All")}
                  className="hover:bg-neutral-200 dark:hover:bg-neutral-800 rounded-full p-1"
                  type="button"
                  aria-label="Clear filter"
                >
                  <X className="size-4" />
                </button>
              </div>
            </div>
          )}

          {/* Project Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {loading
              ? // Loading skeletons
                Array.from({ length: 3 }).map((_, index) => (
                  <div key={index} className="flex flex-col h-full">
                    <Skeleton className="h-80 w-full mb-6" />
                    <Skeleton className="h-4 w-20 mb-2" />
                    <Skeleton className="h-6 w-4/5 mb-2" />
                    <Skeleton className="h-4 w-full" />
                  </div>
                ))
              : filteredProjects.map((project) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    isHovered={hoveredProject === project.id}
                    onHover={() => setHoveredProject(project.id)}
                    onLeave={() => setHoveredProject(null)}
                  />
                ))}
          </div>

          {/* Categories */}
          <div className="mt-24 flex flex-wrap justify-center gap-4">
            {getCategories.slice(1).map((category) => (
              <Button
                key={category}
                variant="ghost"
                size="sm"
                onClick={() => setActiveFilter(category)}
                className={`
                  rounded-none border-b-2 px-1 shadow-none
                  ${
                    activeFilter === category
                      ? "border-black dark:border-white"
                      : "border-transparent hover:border-neutral-300 dark:hover:border-neutral-700"
                  }
                `}
              >
                {category}
              </Button>
            ))}
          </div>

          {/* View All Projects */}
          <div className="mt-24 flex justify-center">
            <Link
              to="/projects"
              className="group flex items-center gap-2 text-neutral-900 dark:text-neutral-100 hover:gap-3 transition-all duration-300"
            >
              <span className="text-sm font-medium uppercase tracking-widest">
                View All Projects
              </span>
              <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
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
      className="group relative flex flex-col h-full"
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      <div className="relative overflow-hidden h-80 w-full mb-6 bg-neutral-100 dark:bg-neutral-900">
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
          absolute inset-0 bg-black/10 dark:bg-white/10 flex items-center justify-center
          transition-opacity duration-500 
          ${isHovered ? "opacity-100" : "opacity-0"}
        `}
        >
          <Link
            to={`/projects/${slug || project.id}`}
            className="px-6 py-3 bg-white dark:bg-black text-black dark:text-white text-sm font-medium"
          >
            View Project
          </Link>
        </div>
      </div>

      {/* Project info */}
      <div className="flex flex-col flex-grow">
        <div className="text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider mb-2">
          {category}
        </div>
        <h3 className="text-xl font-medium mb-2 transition-transform duration-300 group-hover:translate-x-2">
          {title}
        </h3>
        <p className="text-neutral-500 dark:text-neutral-400 text-sm line-clamp-2">
          {description}
        </p>
      </div>
    </div>
  );
};
