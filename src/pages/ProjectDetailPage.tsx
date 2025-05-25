import {
  ArrowLeft,
  Calendar,
  ExternalLink,
  User,
  Share2,
  ArrowRight,
  FileText,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Project } from "@/types";
import { Link, useParams } from "react-router-dom";
import React from "react";
import { fetchProjectBySlug } from "@/services/projectService";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";

export default function ProjectDetailPage(): React.ReactElement {
  const { slug } = useParams<{ slug: string }>();
  const [project, setProject] = React.useState<Project | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [activeTab, setActiveTab] = React.useState("overview");
  const [scrollY, setScrollY] = React.useState(0);

  // Enhanced parallax effect
  React.useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    const throttledScroll = () => requestAnimationFrame(handleScroll);
    window.addEventListener("scroll", throttledScroll);
    return () => window.removeEventListener("scroll", throttledScroll);
  }, []);

  // Share project functionality
  const handleShareProject = async () => {
    if (navigator.share && project) {
      try {
        await navigator.share({
          title: project.title,
          text: project.description,
          url: window.location.href,
        });
      } catch (err) {
        navigator.clipboard.writeText(window.location.href);
        toast.success("Link copied to clipboard!");
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied to clipboard!");
    }
  };

  React.useEffect(() => {
    const getProjectDetails = async () => {
      try {
        setLoading(true);
        if (slug) {
          const data = await fetchProjectBySlug(slug);
          setProject(data);
        }
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "An unknown error occurred"
        );
      } finally {
        setLoading(false);
      }
    };

    getProjectDetails();
  }, [slug]);

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (loading) {
    return <ProjectDetailSkeleton />;
  }

  if (error || !project) {
    return (
      <div className="min-h-screen relative overflow-hidden bg-background">
        {/* Unified background system */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-muted/20" />
          <div className="absolute -top-40 -left-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute top-1/2 -right-32 w-64 h-64 bg-accent/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-0 left-1/3 w-48 h-48 bg-secondary/10 rounded-full blur-3xl animate-pulse" />
        </div>

        <div className="relative z-10 flex items-center justify-center min-h-screen px-6 py-24 md:py-32 lg:py-40">
          <div className="text-center max-w-md">
            <div className="relative mb-8">
              <div className="w-20 h-20 bg-gradient-to-br from-muted/30 to-muted/10 rounded-2xl mx-auto flex items-center justify-center backdrop-blur-sm border border-border/50">
                <FileText className="w-8 h-8 text-muted-foreground" />
              </div>
            </div>

            <h3 className="text-3xl font-light mb-4 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
              {error ? "Failed to load project" : "Project not found"}
            </h3>
            <p className="text-muted-foreground/80 mb-8 leading-relaxed">
              {error ||
                "The project you're looking for doesn't exist or has been moved."}
            </p>

            <Button
              asChild
              size="lg"
              className="relative overflow-hidden rounded-full px-8 py-3 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 border-0 shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all duration-300 hover:scale-105"
            >
              <Link to="/works" className="group">
                <span className="relative z-10 flex items-center font-medium">
                  Back to Projects
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Unified background system */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-muted/20" />
        <div
          className="absolute -top-40 -left-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl"
          style={{
            transform: `translate3d(${scrollY * 0.1}px, ${
              scrollY * 0.05
            }px, 0)`,
          }}
        />
        <div
          className="absolute top-1/2 -right-32 w-64 h-64 bg-accent/10 rounded-full blur-3xl"
          style={{
            transform: `translate3d(${scrollY * -0.05}px, ${
              scrollY * -0.1
            }px, 0)`,
          }}
        />
        <div
          className="absolute bottom-0 left-1/3 w-48 h-48 bg-secondary/10 rounded-full blur-3xl"
          style={{
            transform: `translate3d(${scrollY * 0.03}px, ${
              scrollY * 0.08
            }px, 0)`,
          }}
        />
      </div>

      {/* Hero Section */}
      <div className="relative z-10">
        <div
          className="h-[70vh] relative flex items-end overflow-hidden"
          style={{
            backgroundImage: project.thumbnail
              ? `url(${project.thumbnail})`
              : "none",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundAttachment: "fixed",
          }}
        >
          {/* Consistent overlay system */}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/90 to-background/30" />

          <div className="relative z-10 w-full">
            <div className="max-w-7xl mx-auto px-6 py-12">
              {/* Back button with consistent styling */}
              <div className="mb-8">
                <Button
                  variant="outline"
                  asChild
                  className="rounded-full bg-background/60 backdrop-blur-md border-border/50 hover:bg-background/80 transition-all duration-300 hover:scale-105"
                >
                  <Link to="/works" className="flex items-center gap-2">
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back to Projects</span>
                  </Link>
                </Button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-end">
                <div className="lg:col-span-2 space-y-6">
                  {project.featured && (
                    <div className="inline-flex items-center rounded-full bg-primary/10 backdrop-blur-sm px-4 py-2 text-sm font-medium text-primary border border-primary/20">
                      <Sparkles className="mr-2 h-4 w-4 animate-pulse" />
                      Featured Project
                    </div>
                  )}

                  <div className="space-y-3">
                    <div className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                      {project.category}
                    </div>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight bg-gradient-to-r from-foreground via-foreground to-muted-foreground bg-clip-text text-transparent">
                      {project.title}
                    </h1>
                    <p className="text-lg text-muted-foreground/90 max-w-2xl leading-relaxed">
                      {project.description}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row lg:flex-col gap-3 lg:items-end">
                  {project.link && (
                    <Button
                      asChild
                      size="lg"
                      className="rounded-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all duration-300 hover:scale-105"
                    >
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2"
                      >
                        <span>Visit Project</span>
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </Button>
                  )}
                  <Button
                    variant="outline"
                    size="lg"
                    className="rounded-full aspect-square p-0 w-12 h-12 bg-background/60 backdrop-blur-md border-border/50 hover:bg-background/80 transition-all duration-300 hover:scale-105"
                    onClick={handleShareProject}
                    aria-label="Share project"
                  >
                    <Share2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="relative z-10 py-16">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Sidebar - Consistent card styling */}
              <div className="lg:col-span-1">
                <div className="sticky top-24 space-y-6">
                  <div className="rounded-2xl bg-background/60 backdrop-blur-md border border-border/50 p-6">
                    <h3 className="text-sm font-semibold uppercase tracking-wider mb-6 text-muted-foreground">
                      Project Details
                    </h3>

                    <div className="space-y-6">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <User className="w-4 h-4 text-primary" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <dt className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">
                            Client
                          </dt>
                          <dd className="font-medium text-foreground">
                            {project.client}
                          </dd>
                        </div>
                      </div>

                      {project.date && (
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0">
                            <Calendar className="w-4 h-4 text-accent-foreground" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <dt className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">
                              Completed
                            </dt>
                            <dd className="font-medium text-foreground">
                              {new Date(project.date).toLocaleDateString(
                                "en-US",
                                {
                                  year: "numeric",
                                  month: "long",
                                  day: "numeric",
                                }
                              )}
                            </dd>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="rounded-2xl bg-background/60 backdrop-blur-md border border-border/50 p-6">
                    <h3 className="text-sm font-semibold uppercase tracking-wider mb-6 text-muted-foreground">
                      Technologies
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag, index) => (
                        <Badge
                          key={index}
                          variant="outline"
                          className="rounded-full bg-primary/5 hover:bg-primary/10 border-primary/20 text-foreground transition-all duration-200 hover:scale-105"
                        >
                          {tag.name}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Main Content - Consistent styling */}
              <div className="lg:col-span-3">
                <Tabs
                  defaultValue="overview"
                  value={activeTab}
                  onValueChange={setActiveTab}
                  className="w-full"
                >
                  <TabsList className="rounded-full bg-background/60 backdrop-blur-md border border-border/50 p-1 mb-8">
                    <TabsTrigger
                      value="overview"
                      className="rounded-full data-[state=active]:bg-background data-[state=active]:shadow-sm transition-all duration-200"
                    >
                      Overview
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="overview">
                    <div className="rounded-2xl bg-background/60 backdrop-blur-md border border-border/50 p-8">
                      <h2 className="text-2xl font-light mb-8 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
                        Project Overview
                      </h2>

                      <div className="prose prose-neutral dark:prose-invert max-w-none">
                        {project.full_description ? (
                          <div
                            dangerouslySetInnerHTML={{
                              __html: project.full_description,
                            }}
                            className="leading-relaxed text-muted-foreground/90"
                          />
                        ) : (
                          <p className="leading-relaxed text-muted-foreground/90">
                            {project.description}
                          </p>
                        )}
                      </div>

                      {project.thumbnail && (
                        <div className="mt-8 rounded-xl overflow-hidden border border-border/50">
                          <img
                            src={project.thumbnail}
                            alt={project.title}
                            className="w-full h-auto object-cover transition-transform duration-700 hover:scale-105"
                          />
                        </div>
                      )}
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Enhanced skeleton with consistent styling
const ProjectDetailSkeleton = () => (
  <div className="min-h-screen bg-background relative overflow-hidden">
    {/* Unified background system */}
    <div className="fixed inset-0 z-0">
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-muted/20" />
      <div className="absolute -top-40 -left-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute top-1/2 -right-32 w-64 h-64 bg-accent/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-0 left-1/3 w-48 h-48 bg-secondary/10 rounded-full blur-3xl animate-pulse" />
    </div>

    {/* Hero skeleton */}
    <div className="relative z-10">
      <div className="h-[70vh] relative flex items-end">
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/90 to-background/30" />

        <div className="relative z-10 w-full">
          <div className="max-w-7xl mx-auto px-6 py-12">
            <div className="mb-8">
              <Skeleton className="h-10 w-36 rounded-full" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-end">
              <div className="lg:col-span-2 space-y-6">
                <Skeleton className="h-8 w-40 rounded-full" />
                <div className="space-y-3">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-16 w-full max-w-2xl" />
                  <Skeleton className="h-6 w-full max-w-xl" />
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <Skeleton className="h-12 w-full rounded-full" />
                <Skeleton className="h-12 w-12 rounded-full" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar skeleton */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                <div className="rounded-2xl bg-background/60 backdrop-blur-md border border-border/50 p-6">
                  <Skeleton className="h-4 w-32 mb-6" />
                  <div className="space-y-6">
                    {[1, 2].map((i) => (
                      <div key={i} className="flex items-start gap-3">
                        <Skeleton className="w-10 h-10 rounded-xl" />
                        <div className="flex-1 space-y-2">
                          <Skeleton className="h-3 w-16" />
                          <Skeleton className="h-4 w-24" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-2xl bg-background/60 backdrop-blur-md border border-border/50 p-6">
                  <Skeleton className="h-4 w-28 mb-6" />
                  <div className="flex flex-wrap gap-2">
                    {[1, 2, 3, 4].map((i) => (
                      <Skeleton key={i} className="h-7 w-20 rounded-full" />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Main content skeleton */}
            <div className="lg:col-span-3">
              <Skeleton className="h-10 w-full max-w-md rounded-full mb-8" />

              <div className="rounded-2xl bg-background/60 backdrop-blur-md border border-border/50 p-8">
                <Skeleton className="h-8 w-48 mb-8" />
                <div className="space-y-4 mb-8">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                </div>
                <Skeleton className="h-80 w-full rounded-xl" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
