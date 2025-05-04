import * as React from "react";
import { Link } from "react-router-dom";
import {
  Code,
  Layout,
  Palette,
  Database,
  Globe,
  ShoppingCart,
  ArrowRight,
  Search,
  X,
  Calendar,
  User,
  Tag,
  Grid,
  List,
  ChefHat,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { Project } from "@/types";
// Fix: Import fetchProjects correctly from apiClient
import { fetchProjects } from "@/services/projectService";

type ViewMode = "grid" | "list";
type CategoryType = string;

export default function ProjectsPage(): React.ReactElement {
  const [searchQuery, setSearchQuery] = React.useState<string>("");
  const [activeCategory, setActiveCategory] =
    React.useState<CategoryType>("All");
  const [viewMode, setViewMode] = React.useState<ViewMode>("grid");
  const [projects, setProjects] = React.useState<Project[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [error, setError] = React.useState<string | null>(null);
  const searchInputRef = React.useRef<HTMLInputElement>(null);

  // Fetch projects on component mount
  React.useEffect(() => {
    const loadProjects = async () => {
      try {
        setLoading(true);
        const data = await fetchProjects();
        setProjects(data.results);
        setError(null);
      } catch (err) {
        setError("Failed to load projects. Please try again later.");
        console.error("Error loading projects:", err);
      } finally {
        setLoading(false);
      }
    };

    loadProjects();
  }, []);

  // Get available icon components
  const getIconComponent = (iconName: string | null) => {
    if (!iconName) return <Code className="stroke-2" />;

    const icons: Record<string, React.ReactNode> = {
      ShoppingCart: <ShoppingCart className="stroke-2" />,
      Layout: <Layout className="stroke-2" />,
      Palette: <Palette className="stroke-2" />,
      Database: <Database className="stroke-2" />,
      Globe: <Globe className="stroke-2" />,
      Code: <Code className="stroke-2" />,
      ChefHat: <ChefHat className="stroke-2" />,
    };

    return icons[iconName] || <Code className="stroke-2" />;
  };

  // Extract categories from projects data
  const categories = React.useMemo(() => {
    const categorySet = new Set<string>(["All"]);

    projects.forEach((project) => {
      if (project.category) {
        categorySet.add(project.category);
      }
    });

    return Array.from(categorySet);
  }, [projects]);

  // Filter projects based on search query and active category
  const filteredProjects = React.useMemo(() => {
    return projects.filter((project) => {
      const matchesSearch =
        searchQuery === "" ||
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (project.tags &&
          project.tags.some((tag) =>
            String(tag).toLowerCase().includes(searchQuery.toLowerCase())
          ));

      const matchesCategory =
        activeCategory === "All" || project.category === activeCategory;

      return matchesSearch && matchesCategory;
    });
  }, [projects, searchQuery, activeCategory]);

  // Clear search input handler
  const handleClearSearch = () => {
    setSearchQuery("");
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  };

  // Reset all filters
  const handleResetFilters = () => {
    setSearchQuery("");
    setActiveCategory("All");
  };

  // Get featured projects
  const featuredProjects = React.useMemo(() => {
    return projects.filter((project) => project.featured);
  }, [projects]);

  // Get recent projects
  const recentProjects = React.useMemo(() => {
    return [...projects].sort((a, b) => {
      if (!a.date || !b.date) return 0;
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
  }, [projects]);

  // Loading state
  if (loading) {
    return (
      <div className="bg-white dark:bg-black min-h-screen">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
          <header className="mb-12 md:mb-16">
            <h1 className="text-3xl variable-font md:text-4xl lg:text-5xl font-light tracking-tight mb-3">
              Our Projects
            </h1>
            <p className="text-neutral-500 dark:text-neutral-400 text-lg max-w-xl">
              Loading projects...
            </p>
          </header>
          <div className="flex items-center justify-center py-32">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-neutral-900 dark:border-neutral-100"></div>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="bg-white dark:bg-black min-h-screen">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
          <header className="mb-12 md:mb-16">
            <h1 className="text-3xl variable-font md:text-4xl lg:text-5xl font-light tracking-tight mb-3">
              Our Projects
            </h1>
            <p className="text-neutral-500 dark:text-neutral-400 text-lg max-w-xl">
              {error}
            </p>
          </header>
          <div className="flex flex-col items-center justify-center py-16">
            <Button onClick={() => window.location.reload()} className="mt-4">
              Try Again
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-black min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
        {/* Header */}
        <header className="mb-12 md:mb-16">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 md:gap-8">
            <div>
              <h1 className="text-3xl variable-font md:text-4xl lg:text-5xl font-light tracking-tight mb-3">
                Our Projects
              </h1>
              <p className="text-neutral-500 dark:text-neutral-400 text-lg max-w-xl">
                A showcase of our work across various industries and
                technologies.
              </p>
            </div>

            <div className="relative w-full md:w-72">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 size-4 text-neutral-400" />
              <Input
                type="text"
                placeholder="Search projects..."
                className="pl-10 pr-10 py-2 bg-white dark:bg-black border-neutral-200 dark:border-neutral-800 focus:border-neutral-400 dark:focus:border-neutral-600 focus:ring-neutral-300 dark:focus:ring-neutral-700"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                ref={searchInputRef}
                aria-label="Search projects"
              />
              {searchQuery && (
                <button
                  className="absolute right-3 top-1/2 transform -translate-y-1/2"
                  onClick={handleClearSearch}
                  type="button"
                  aria-label="Clear search"
                >
                  <X className="size-4 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200" />
                </button>
              )}
            </div>
          </div>
        </header>

        {/* Filters */}
        <div className="mb-12">
          <Tabs defaultValue="categories" className="w-full rounded-full">
            <TabsList className="mb-8 rounded-full bg-neutral-100 dark:bg-neutral-900">
              <TabsTrigger value="categories" className="rounded-full">
                Categories
              </TabsTrigger>
              <TabsTrigger value="featured" className="rounded-full">
                Featured
              </TabsTrigger>
              <TabsTrigger value="recent" className="rounded-full">
                Recent
              </TabsTrigger>
            </TabsList>

            <TabsContent value="categories" className="space-y-8">
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <Badge
                    key={category}
                    variant={
                      activeCategory === category ? "default" : "outline"
                    }
                    className={cn(
                      "cursor-pointer transition-all px-4 py-1.5 text-xs rounded-full",
                      activeCategory === category
                        ? "bg-black text-white dark:bg-white dark:text-black"
                        : "text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-900"
                    )}
                    onClick={() => setActiveCategory(category)}
                  >
                    {category}
                  </Badge>
                ))}
              </div>

              <div className="flex justify-between items-center">
                <p className="text-sm text-neutral-500 dark:text-neutral-400">
                  Showing {filteredProjects.length}{" "}
                  {filteredProjects.length === 1 ? "project" : "projects"}
                  {activeCategory !== "All" ? ` in ${activeCategory}` : ""}
                  {searchQuery ? ` matching "${searchQuery}"` : ""}
                </p>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={cn(
                      "p-2 rounded transition-colors",
                      viewMode === "grid"
                        ? "bg-neutral-100 dark:bg-neutral-900 text-black dark:text-white"
                        : "text-neutral-500 dark:text-neutral-400 hover:text-black dark:hover:text-white"
                    )}
                    aria-label="Grid view"
                    aria-pressed={viewMode === "grid"}
                  >
                    <Grid className="size-4" />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={cn(
                      "p-2 rounded transition-colors",
                      viewMode === "list"
                        ? "bg-neutral-100 dark:bg-neutral-900 text-black dark:text-white"
                        : "text-neutral-500 dark:text-neutral-400 hover:text-black dark:hover:text-white"
                    )}
                    aria-label="List view"
                    aria-pressed={viewMode === "list"}
                  >
                    <List className="size-4" />
                  </button>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="featured">
              <div className="mb-8">
                <p className="text-sm text-neutral-500 dark:text-neutral-400">
                  Our most impactful work showcasing our best capabilities
                </p>
              </div>
              <div
                className={cn(
                  viewMode === "grid"
                    ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                    : "flex flex-col gap-6"
                )}
              >
                {featuredProjects.length > 0 ? (
                  featuredProjects.map((project) =>
                    viewMode === "grid" ? (
                      <ProjectGridItem
                        key={project.id}
                        project={project}
                        getIconComponent={getIconComponent}
                      />
                    ) : (
                      <ProjectListItem
                        key={project.id}
                        project={project}
                        getIconComponent={getIconComponent}
                      />
                    )
                  )
                ) : (
                  <div className="col-span-3 text-center py-8">
                    <p className="text-neutral-500 dark:text-neutral-400">
                      No featured projects available at the moment.
                    </p>
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="recent">
              <div className="mb-8">
                <p className="text-sm text-neutral-500 dark:text-neutral-400">
                  Our latest work, sorted by completion date
                </p>
              </div>
              <div
                className={cn(
                  viewMode === "grid"
                    ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                    : "flex flex-col gap-6"
                )}
              >
                {recentProjects.map((project) =>
                  viewMode === "grid" ? (
                    <ProjectGridItem
                      key={project.id}
                      project={project}
                      getIconComponent={getIconComponent}
                    />
                  ) : (
                    <ProjectListItem
                      key={project.id}
                      project={project}
                      getIconComponent={getIconComponent}
                    />
                  )
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Project Grid/List */}
        {filteredProjects.length > 0 ? (
          <div
            className={cn(
              viewMode === "grid"
                ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                : "flex flex-col gap-6"
            )}
          >
            {filteredProjects.map((project) =>
              viewMode === "grid" ? (
                <ProjectGridItem
                  key={project.id}
                  project={project}
                  getIconComponent={getIconComponent}
                />
              ) : (
                <ProjectListItem
                  key={project.id}
                  project={project}
                  getIconComponent={getIconComponent}
                />
              )
            )}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <Search className="size-12 mb-4 text-neutral-300 dark:text-neutral-700" />
            <h3 className="text-xl font-medium mb-2">No projects found</h3>
            <p className="text-neutral-500 dark:text-neutral-400 mb-6 max-w-md">
              Try adjusting your search or filter to find what you're looking
              for
            </p>
            <Button
              variant="outline"
              onClick={handleResetFilters}
              className="border-neutral-200 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700"
            >
              Reset Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

interface ProjectItemProps {
  project: Project;
  getIconComponent: (iconName: string | null) => React.ReactNode;
}

const ProjectGridItem = React.forwardRef<HTMLDivElement, ProjectItemProps>(
  ({ project, getIconComponent }, ref) => {
    const { title, description, category, icon, tags, client } = project;
    const [isHovered, setIsHovered] = React.useState(false);

    return (
      <div
        ref={ref}
        className="group relative flex flex-col h-full border border-neutral-200 dark:border-neutral-800 rounded-lg overflow-hidden transition-all duration-300 hover:shadow-sm hover:border-neutral-300 dark:hover:border-neutral-700"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div
          className={cn(
            "relative overflow-hidden h-56 w-full",
            project.thumbnailClass || "bg-neutral-50 dark:bg-neutral-950"
          )}
        >
          {/* Project thumbnail */}
          {project.thumbnail ? (
            <img
              src={project.thumbnail}
              alt={`${title} thumbnail`}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <div
                className={cn(
                  "transition-all duration-500",
                  isHovered ? "scale-110 opacity-20" : "scale-100 opacity-30"
                )}
              >
                <div className="size-16">
                  {getIconComponent(typeof icon === "string" ? icon : null)}
                </div>
              </div>
            </div>
          )}

          {/* Overlay with project details on hover */}
          <div
            className={cn(
              "absolute inset-0 bg-black/10 dark:bg-white/10 flex items-center justify-center",
              "transition-opacity duration-300",
              isHovered ? "opacity-100" : "opacity-0"
            )}
          >
            <Link
              to={`/projects/${project.slug || project.id}`}
              className="px-6 py-3 bg-white dark:bg-black text-black dark:text-white text-sm font-medium rounded-md"
              aria-label={`View details for ${title}`}
            >
              View Project
            </Link>
          </div>
        </div>

        {/* Project info */}
        <div className="flex flex-col flex-grow p-5">
          <div className="text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider mb-2">
            {category}
          </div>
          <Link
            to={`/projects/${project.slug || project.id}`}
            className="group/link"
          >
            <h3 className="text-xl font-medium mb-2 transition-all duration-300 group-hover/link:underline decoration-1 underline-offset-2">
              {title}
            </h3>
          </Link>
          <p className="text-neutral-600 dark:text-neutral-400 text-sm mb-4 line-clamp-2">
            {description}
          </p>

          {/* Client info */}
          {client && (
            <div className="mt-auto flex items-center text-xs text-neutral-500 dark:text-neutral-400 mb-3">
              <User className="size-3 mr-1" />
              {client}
            </div>
          )}

          {/* Tags */}
          {tags && tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-2">
              {tags.slice(0, 3).map((tag, index) => (
                <span
                  key={index}
                  className="text-xs px-2 py-0.5 bg-neutral-100 dark:bg-neutral-900 text-neutral-600 dark:text-neutral-400 rounded-full"
                >
                  {tag.name}
                </span>
              ))}
              {tags.length > 3 && (
                <span className="text-xs px-2 py-0.5 bg-neutral-100 dark:bg-neutral-900 text-neutral-600 dark:text-neutral-400 rounded-full">
                  +{tags.length - 3}
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }
);

ProjectGridItem.displayName = "ProjectGridItem";

const ProjectListItem = React.forwardRef<HTMLDivElement, ProjectItemProps>(
  ({ project, getIconComponent }, ref) => {
    const { title, description, category, icon, tags, client, date } = project;

    return (
      <div
        ref={ref}
        className="group border border-neutral-200 dark:border-neutral-800 rounded-lg p-6 transition-all duration-300 hover:shadow-sm hover:border-neutral-300 dark:hover:border-neutral-700"
      >
        <div className="flex flex-col md:flex-row gap-6">
          {/* Project thumbnail/icon */}
          {project.thumbnail ? (
            <div className="flex-shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-md overflow-hidden">
              <img
                src={project.thumbnail}
                alt={`${title} thumbnail`}
                className="w-full h-full object-cover"
              />
            </div>
          ) : (
            <div
              className={cn(
                "flex-shrink-0 size-16 md:size-20 flex items-center justify-center rounded-md",
                project.thumbnailClass || "bg-neutral-50 dark:bg-neutral-950"
              )}
            >
              <div className="size-8 md:size-10">
                {getIconComponent(typeof icon === "string" ? icon : null)}
              </div>
            </div>
          )}

          {/* Project info */}
          <div className="flex-grow">
            <div className="flex flex-col md:flex-row md:items-center gap-2 mb-2">
              <div className="text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                {category}
              </div>
              {date && (
                <div className="hidden md:flex text-neutral-300 dark:text-neutral-700">
                  •
                </div>
              )}
              {date && (
                <div className="flex items-center text-xs text-neutral-500 dark:text-neutral-400">
                  <Calendar className="size-3 mr-1" />
                  {new Date(date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </div>
              )}
            </div>

            <Link
              to={`/projects/${project.slug || project.id}`}
              className="group/link"
            >
              <h3 className="text-xl font-medium mb-2 transition-colors duration-300 group-hover/link:underline decoration-1 underline-offset-2">
                {title}
              </h3>
            </Link>

            <p className="text-neutral-600 dark:text-neutral-400 text-sm mb-4">
              {description}
            </p>

            <div className="flex flex-col md:flex-row md:items-center gap-4">
              {/* Client info */}
              {client && (
                <div className="flex items-center text-xs text-neutral-500 dark:text-neutral-400">
                  <User className="size-3 mr-1" />
                  {client}
                </div>
              )}

              {/* Tags */}
              {tags && tags.length > 0 && (
                <div className="flex flex-wrap gap-1 items-center">
                  <Tag className="size-3 text-neutral-400" />
                  <div className="flex flex-wrap gap-x-1">
                    {tags.slice(0, 4).map((tag, index) => (
                      <span
                        key={index}
                        className="text-xs text-neutral-600 dark:text-neutral-400"
                      >
                        {tag.name}
                        {index < Math.min(tags.length, 4) - 1 ? "," : ""}
                      </span>
                    ))}
                    {tags.length > 4 && (
                      <span className="text-xs text-neutral-500 dark:text-neutral-500 ml-1">
                        +{tags.length - 4}
                      </span>
                    )}
                  </div>
                </div>
              )}

              <div className="md:ml-auto">
                <Link
                  to={`/projects/${project.slug || project.id}`}
                  className="text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all"
                  aria-label={`View details for ${title}`}
                >
                  View Details
                  <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
);

ProjectListItem.displayName = "ProjectListItem";
