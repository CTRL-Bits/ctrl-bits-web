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
  Sparkles,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { Project } from "@/types";
import { fetchProjects } from "@/services/projectService";
import VariableProximity from "../components/variable-proximity-text";

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
  const headerRef = React.useRef<HTMLDivElement>(null);
  const [scrollY, setScrollY] = React.useState(0);

  // Parallax effect on scroll
  React.useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

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
      <div className="bg-background min-h-screen relative overflow-hidden transition-all duration-700 ease-out">
        {/* Background gradients */}
        <div className="absolute inset-0 bg-mesh-gradient pointer-events-none" />
        <div className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-primary/10 blur-3xl transform-gpu" />
        <div className="absolute top-1/2 -right-48 h-96 w-96 rounded-full bg-secondary/10 blur-3xl transform-gpu" />

        <div className="max-w-7xl mx-auto px-6 sm:px-6 py-24 md:py-32 lg:py-40">
          <header className="mb-12 md:mb-16">
            <div className="flex items-center space-x-2 mb-6">
              <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1.5 text-sm font-medium text-primary ring-1 ring-primary/20 backdrop-blur-sm">
                <Sparkles className="mr-1.5 h-3.5 w-3.5 animate-pulse" />
                Our Work
              </span>
            </div>
            <h1 className="text-4xl variable-font md:text-5xl lg:text-6xl font-light tracking-tight mb-3 bg-clip-text text-transparent bg-gradient-to-r from-primary via-foreground to-secondary">
              Projects Showcase
            </h1>
            <p className="text-muted-foreground text-lg max-w-xl">
              Loading our work collection...
            </p>
          </header>
          <div className="flex items-center justify-center py-32">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="bg-background min-h-screen relative overflow-hidden transition-all duration-700 ease-out">
        {/* Background gradients */}
        <div className="absolute inset-0 bg-mesh-gradient pointer-events-none" />
        <div className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-primary/10 blur-3xl transform-gpu" />
        <div className="absolute top-1/2 -right-48 h-96 w-96 rounded-full bg-secondary/10 blur-3xl transform-gpu" />

        <div className="max-w-7xl mx-auto px-6 sm:px-6 py-16 sm:py-20">
          <header className="mb-12 md:mb-16">
            <div className="flex items-center space-x-2 mb-6">
              <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1.5 text-sm font-medium text-primary ring-1 ring-primary/20 backdrop-blur-sm">
                <Sparkles className="mr-1.5 h-3.5 w-3.5 animate-pulse" />
                Our Work
              </span>
            </div>
            <h1 className="text-4xl variable-font md:text-5xl lg:text-6xl font-light tracking-tight mb-3 bg-clip-text text-transparent bg-gradient-to-r from-primary via-foreground to-secondary">
              Projects Showcase
            </h1>
            <p className="text-muted-foreground text-lg max-w-xl">{error}</p>
          </header>
          <div className="flex flex-col items-center justify-center py-16">
            <Button
              onClick={() => window.location.reload()}
              className="mt-4 h-12 rounded-full pl-6 pr-5 text-base font-medium shadow-lg shadow-primary/20 hover:shadow-primary/30 hover:scale-105 transition-all group overflow-hidden relative"
            >
              <span className="relative z-10 flex items-center">
                Try Again
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
              <span className="absolute inset-0 bg-gradient-to-r from-primary to-primary/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-background min-h-screen relative overflow-hidden transition-all duration-700 ease-out">
      {/* Background gradients */}
      <div className="absolute inset-0 bg-mesh-gradient pointer-events-none" />
      <div
        className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-primary/20 blur-3xl transform-gpu"
        style={{ transform: `translateY(${scrollY * 0.1}px)` }}
      />
      <div
        className="absolute top-1/2 -right-48 h-96 w-96 rounded-full bg-secondary/15 blur-3xl transform-gpu"
        style={{ transform: `translateY(${scrollY * -0.15}px)` }}
      />
      <div
        className="absolute bottom-24 left-1/3 h-64 w-64 rounded-full bg-accent/10 blur-3xl transform-gpu"
        style={{ transform: `translateY(${scrollY * 0.05}px)` }}
      />

      <div className="max-w-7xl mx-auto px-6 sm:px-6 py-16 sm:py-20">
        {/* Header */}
        <header className="mb-12 md:mb-16" ref={headerRef}>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 md:gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-6 transition-all duration-700 delay-100">
                <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1.5 text-sm font-medium text-primary ring-1 ring-primary/20 backdrop-blur-sm">
                  <Sparkles className="mr-1.5 h-3.5 w-3.5 animate-pulse" />
                  Our Work
                </span>
              </div>

              <div className="variable-font-container transition-all duration-700 delay-200">
                <h1 className="text-4xl variable-font md:text-5xl lg:text-6xl font-light tracking-tight mb-3">
                  <VariableProximity
                    label="Projects Showcase"
                    fromFontVariationSettings="'wght' 400, 'wdth' 100"
                    toFontVariationSettings="'wght' 800, 'wdth' 125"
                    containerRef={headerRef}
                    radius={200}
                    falloff="gaussian"
                    className="font-bold transition-all duration-100 variable-font bg-clip-text text-transparent bg-gradient-to-r from-primary via-foreground to-secondary"
                  />
                </h1>
              </div>

              <p className="text-muted-foreground text-lg max-w-xl transition-all duration-700 delay-300">
                A showcase of our work across various industries and
                technologies —{" "}
                <span className="font-medium text-foreground relative">
                  bit by bit
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary/40 rounded-full"></span>
                </span>
                .
              </p>
            </div>

            <div className="relative w-full md:w-72 transition-all duration-700 delay-400">
              <div className="relative bg-background/50 backdrop-blur-md rounded-full border border-muted/50 shadow-sm overflow-hidden hover:border-primary/30 transition-all duration-300">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 size-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search projects..."
                  className="pl-10 pr-10 py-2 border-none focus:ring-0 rounded-full bg-transparent focus:border-none"
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
                    <X className="size-4 text-muted-foreground hover:text-foreground" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Filters */}
        <div className="mb-12 transition-all duration-700 delay-500">
          <Tabs defaultValue="categories" className="w-full">
            <TabsList className="mb-8 rounded-full bg-muted/30 backdrop-blur-md border border-muted/50 p-1">
              <TabsTrigger
                value="categories"
                className="rounded-full data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm"
              >
                Categories
              </TabsTrigger>
              <TabsTrigger
                value="featured"
                className="rounded-full data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm"
              >
                Featured
              </TabsTrigger>
              <TabsTrigger
                value="recent"
                className="rounded-full data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm"
              >
                Recent
              </TabsTrigger>
            </TabsList>

            <TabsContent value="categories" className="space-y-8">
              <div className="flex flex-wrap gap-2 relative overflow-hidden rounded-xl py-4">
                <div className="relative flex-1 overflow-auto scrollbar-hide py-2 px-1">
                  <div className="flex gap-2">
                    {categories.map((category) => (
                      <Badge
                        key={category}
                        variant={
                          activeCategory === category ? "default" : "outline"
                        }
                        className={cn(
                          "cursor-pointer transition-all px-4 py-1.5 text-xs rounded-full",
                          activeCategory === category
                            ? "bg-primary text-primary-foreground"
                            : "text-muted-foreground hover:bg-muted hover:text-foreground"
                        )}
                        onClick={() => setActiveCategory(category)}
                      >
                        {category}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-center backdrop-blur-sm bg-background/50 p-3 rounded-xl border border-muted/50">
                <p className="text-sm text-muted-foreground">
                  Showing {filteredProjects.length}{" "}
                  {filteredProjects.length === 1 ? "project" : "projects"}
                  {activeCategory !== "All" ? ` in ${activeCategory}` : ""}
                  {searchQuery ? ` matching "${searchQuery}"` : ""}
                </p>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={cn(
                      "p-2 rounded-lg transition-colors",
                      viewMode === "grid"
                        ? "bg-primary/10 text-primary ring-1 ring-primary/20"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                    aria-label="Grid view"
                    aria-pressed={viewMode === "grid"}
                  >
                    <Grid className="size-4" />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={cn(
                      "p-2 rounded-lg transition-colors",
                      viewMode === "list"
                        ? "bg-primary/10 text-primary ring-1 ring-primary/20"
                        : "text-muted-foreground hover:text-foreground"
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
              <div className="mb-8 backdrop-blur-sm bg-background/50 p-3 rounded-xl border border-muted/50">
                <div className="flex items-center gap-2">
                  <Zap className="size-4 text-primary" />
                  <p className="text-sm text-muted-foreground">
                    Our most impactful work showcasing our best capabilities
                  </p>
                </div>
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
                    <p className="text-muted-foreground">
                      No featured projects available at the moment.
                    </p>
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="recent">
              <div className="mb-8 backdrop-blur-sm bg-background/50 p-3 rounded-xl border border-muted/50">
                <div className="flex items-center gap-2">
                  <Calendar className="size-4 text-primary" />
                  <p className="text-sm text-muted-foreground">
                    Our latest work, sorted by completion date
                  </p>
                </div>
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
            <div className="size-16 flex items-center justify-center mb-4 rounded-full bg-muted/30 ring-1 ring-muted/50 backdrop-blur-sm">
              <Search className="size-8 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-medium mb-2">No projects found</h3>
            <p className="text-muted-foreground mb-6 max-w-md">
              Try adjusting your search or filter to find what you're looking
              for
            </p>
            <Button
              onClick={handleResetFilters}
              className="h-12 rounded-full pl-6 pr-5 text-base font-medium shadow-lg shadow-primary/20 hover:shadow-primary/30 hover:scale-105 transition-all group overflow-hidden relative"
            >
              <span className="relative z-10 flex items-center">
                Reset Filters
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
              <span className="absolute inset-0 bg-gradient-to-r from-primary to-primary/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
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
        className="group relative flex flex-col h-full rounded-xl overflow-hidden bg-background/50 backdrop-blur-md border border-muted/50 transition-all duration-300 hover:shadow-lg hover:border-primary/20 hover:scale-[1.02]"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div
          className={cn(
            "relative overflow-hidden h-56 w-full",
            project.thumbnailClass || "bg-muted/30"
          )}
        >
          {/* Project thumbnail */}
          {project.thumbnail ? (
            <img
              src={project.thumbnail}
              alt={`${title} thumbnail`}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <div
                className={cn(
                  "transition-all duration-500",
                  isHovered ? "scale-110 opacity-30" : "scale-100 opacity-50"
                )}
              >
                <div className="size-16 bg-primary/10 p-4 rounded-full ring-1 ring-primary/20">
                  {getIconComponent(typeof icon === "string" ? icon : null)}
                </div>
              </div>
            </div>
          )}

          {/* Overlay with project details on hover */}
          <div
            className={cn(
              "absolute inset-0 flex items-center justify-center bg-gradient-to-t from-background/90 via-background/60 to-transparent",
              "transition-all duration-300",
              isHovered ? "opacity-100" : "opacity-0"
            )}
          >
            <Link
              to={`/projects/${project.slug || project.id}`}
              className="h-12 rounded-full pl-6 pr-5 text-base font-medium bg-primary text-primary-foreground shadow-lg shadow-primary/20 hover:shadow-primary/30 hover:scale-105 transition-all flex items-center"
              aria-label={`View details for ${title}`}
            >
              View Project
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>

        {/* Project info */}
        <div className="flex flex-col flex-grow p-5 relative">
          {project.featured && (
            <div className="absolute top-0 right-5 -translate-y-1/2 inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary ring-1 ring-primary/20 backdrop-blur-sm">
              <Sparkles className="mr-1.5 h-3 w-3" />
              Featured
            </div>
          )}

          <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
            {category}
          </div>
          <Link
            to={`/projects/${project.slug || project.id}`}
            className="group/link"
          >
            <h3 className="text-xl font-medium mb-2 transition-all duration-300 group-hover/link:text-primary">
              {title}
            </h3>
          </Link>
          <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
            {description}
          </p>

          {/* Client info */}
          {client && (
            <div className="mt-auto flex items-center text-xs text-muted-foreground mb-3 group-hover:text-foreground transition-colors">
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
                  className="text-xs px-2 py-0.5 bg-muted/50 text-muted-foreground rounded-full group-hover:bg-primary/10 group-hover:text-primary transition-colors"
                >
                  {tag.name}
                </span>
              ))}
              {tags.length > 3 && (
                <span className="text-xs px-2 py-0.5 bg-muted/50 text-muted-foreground rounded-full group-hover:bg-primary/10 group-hover:text-primary transition-colors">
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
        className="group rounded-xl p-6 bg-background/50 backdrop-blur-md border border-muted/50 transition-all duration-300 hover:shadow-lg hover:border-primary/20 hover:scale-[1.01]"
      >
        <div className="flex flex-col md:flex-row gap-6">
          {/* Project thumbnail/icon */}
          {project.thumbnail ? (
            <div className="flex-shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-lg overflow-hidden ring-1 ring-muted/50">
              <img
                src={project.thumbnail}
                alt={`${title} thumbnail`}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>
          ) : (
            <div
              className={cn(
                "flex-shrink-0 size-16 md:size-20 flex items-center justify-center rounded-lg bg-muted/30 ring-1 ring-muted/50 transition-all duration-300 group-hover:bg-primary/10 group-hover:ring-primary/20",
                project.thumbnailClass
              )}
            >
              <div className="p-4 transition-all duration-300 group-hover:scale-110">
                {getIconComponent(typeof icon === "string" ? icon : null)}
              </div>
            </div>
          )}

          {/* Project details */}
          <div className="flex-grow">
            <div className="flex items-center gap-3 mb-2">
              {project.featured && (
                <span className="inline-flex items-center rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary ring-1 ring-primary/20 backdrop-blur-sm">
                  <Sparkles className="mr-1 h-3 w-3" />
                  Featured
                </span>
              )}
              <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                {category}
              </span>
            </div>

            <Link
              to={`/projects/${project.slug || project.id}`}
              className="group/link"
            >
              <h3 className="text-xl font-medium mb-2 transition-all duration-300 group-hover/link:text-primary">
                {title}
              </h3>
            </Link>

            <p className="text-muted-foreground mb-4 line-clamp-2">
              {description}
            </p>

            <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
              {/* Client info */}
              {client && (
                <div className="flex items-center group-hover:text-foreground transition-colors">
                  <User className="size-3 mr-1" />
                  {client}
                </div>
              )}

              {/* Date */}
              {date && (
                <div className="flex items-center group-hover:text-foreground transition-colors">
                  <Calendar className="size-3 mr-1" />
                  {new Date(date).toLocaleDateString()}
                </div>
              )}
            </div>

            {/* Tags */}
            {tags && tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mt-3">
                <Tag className="size-3 text-muted-foreground mr-1" />
                {tags.slice(0, 5).map((tag, index) => (
                  <span
                    key={index}
                    className="text-xs px-2 py-0.5 bg-muted/50 text-muted-foreground rounded-full group-hover:bg-primary/10 group-hover:text-primary transition-colors"
                  >
                    {tag.name}
                  </span>
                ))}
                {tags.length > 5 && (
                  <span className="text-xs px-2 py-0.5 bg-muted/50 text-muted-foreground rounded-full group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                    +{tags.length - 5}
                  </span>
                )}
              </div>
            )}
          </div>

          {/* View project button */}
          <div className="flex-shrink-0 self-center mt-4 md:mt-0">
            <Link
              to={`/projects/${project.slug || project.id}`}
              className="inline-flex items-center justify-center rounded-full p-2 text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors group/arrow"
              aria-label={`View details for ${title}`}
            >
              <ArrowRight className="size-5 transition-transform group-hover/arrow:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    );
  }
);

ProjectListItem.displayName = "ProjectListItem";
