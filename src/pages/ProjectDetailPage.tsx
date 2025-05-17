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
import { Separator } from "@/components/ui/separator";
import { Project } from "@/types";
import { Link, useParams } from "react-router-dom";
import React from "react";
import { fetchProjectBySlug } from "@/services/projectService";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";

// // Function to map icon string to the appropriate Lucide icon component
// const getIconComponent = (iconName: string | null) => {
//   switch (iconName) {
//     case "ShoppingCart":
//       return <ShoppingCart className="stroke-2" />;
//     case "ChefHat":
//       return <ChefHat className="stroke-2" />;
//     case "Layout":
//       return <Layout className="stroke-2" />;
//     case "Palette":
//       return <Palette className="stroke-2" />;
//     case "Database":
//       return <Database className="stroke-2" />;
//     case "Globe":
//       return <Globe className="stroke-2" />;
//     case "Code":
//       return <Code className="stroke-2" />;
//     default:
//       return <Layout className="stroke-2" />;
//   }
// };

export default function ProjectDetailPage(): React.ReactElement {
  const { slug } = useParams<{ slug: string }>();
  // const navigate = useNavigate();
  const [project, setProject] = React.useState<Project | null>(null);
  // const [relatedProjects, setRelatedProjects] = React.useState<Project[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [activeTab, setActiveTab] = React.useState("overview");
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
        // Fallback if share API fails or is cancelled
        navigator.clipboard.writeText(window.location.href);
        alert("Link copied to clipboard!");
      }
    } else {
      // Fallback for browsers that don't support the Web Share API
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

          // Fetch related projects based on category or tags
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

  // Scroll to top when navigating between projects
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (loading) {
    return <ProjectDetailSkeleton />;
  }

  if (error || !project) {
    return (
      <div className="min-h-screen relative overflow-hidden bg-background flex items-center justify-center">
        {/* Background gradients */}
        <div className="absolute inset-0 bg-mesh-gradient pointer-events-none" />
        <div className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-primary/10 blur-3xl transform-gpu" />
        <div className="absolute top-1/2 -right-48 h-96 w-96 rounded-full bg-secondary/10 blur-3xl transform-gpu" />

        <div className="text-center max-w-md p-8 rounded-xl bg-background/70 backdrop-blur-md border border-muted/50 shadow-lg">
          <div className="size-16 bg-muted/30 rounded-full mx-auto mb-6 flex items-center justify-center">
            <FileText className="size-8 text-muted-foreground" />
          </div>
          <h3 className="text-2xl font-medium mb-3">
            {error ? "Failed to load project" : "Project not found"}
          </h3>
          <p className="text-muted-foreground mb-6">
            {error ||
              "The project you're looking for doesn't exist or has been moved."}
          </p>
          <Button
            asChild
            className="h-12 rounded-full pl-6 pr-5 text-base font-medium shadow-lg shadow-primary/20 hover:shadow-primary/30 hover:scale-105 transition-all group overflow-hidden relative"
          >
            <Link to="/works">
              <span className="relative z-10 flex items-center">
                Back to Projects
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
              <span className="absolute inset-0 bg-gradient-to-r from-primary to-primary/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <section className="bg-background relative overflow-hidden">
      {/* Background gradients */}
      <div className="absolute inset-0 bg-mesh-gradient pointer-events-none" />
      <div
        className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-primary/10 blur-3xl transform-gpu"
        style={{ transform: `translateY(${scrollY * 0.1}px)` }}
      />
      <div
        className="absolute top-1/2 -right-48 h-96 w-96 rounded-full bg-secondary/10 blur-3xl transform-gpu"
        style={{ transform: `translateY(${scrollY * -0.15}px)` }}
      />
      <div
        className="absolute bottom-24 left-1/3 h-64 w-64 rounded-full bg-accent/10 blur-3xl transform-gpu"
        style={{ transform: `translateY(${scrollY * 0.05}px)` }}
      />

      {/* Hero section with parallax */}
      <div
        className="h-[50vh] md:h-[60vh] relative flex items-end bg-gradient-to-b from-background to-background/0"
        style={{
          backgroundImage: project.thumbnail
            ? `url(${project.thumbnail})`
            : "none",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />

        <div className="relative z-10 mx-auto max-w-7xl px-6 py-16">
          {/* Back button */}
          <div className="mb-6">
            <Button
              variant="outline"
              asChild
              className="rounded-full backdrop-blur-md bg-background/50 border-muted/50 hover:bg-background/80 transition-all"
            >
              <Link to="/works" className="flex items-center gap-2">
                <ArrowLeft className="size-4" />
                <span>Back to Projects</span>
              </Link>
            </Button>
          </div>

          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div className="animate-in fade-in slide-in-from-bottom-3 duration-700 delay-150">
              {project.featured && (
                <div className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1.5 text-sm font-medium text-primary ring-1 ring-primary/20 backdrop-blur-sm mb-3">
                  <Sparkles className="mr-1.5 h-3.5 w-3.5 animate-pulse" />
                  Featured Project
                </div>
              )}
              <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
                {project.category}
              </div>
              <h1 className="font-light text-4xl md:text-5xl lg:text-6xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary via-foreground to-secondary">
                {project.title}
              </h1>
              <p className="text-muted-foreground text-lg max-w-3xl mt-4">
                {project.description}
              </p>
            </div>

            <div className="flex items-center gap-3 animate-in fade-in slide-in-from-bottom-3 duration-700 delay-300">
              {project.link && (
                <Button asChild className="rounded-full px-6">
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2"
                  >
                    <span>Visit Project</span>
                    <ExternalLink className="size-4" />
                  </a>
                </Button>
              )}
              <Button
                variant="outline"
                className="rounded-full aspect-square p-0 size-10"
                onClick={handleShareProject}
                aria-label="Share project"
              >
                <Share2 className="size-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="py-12 md:py-20">
        <div className="mx-auto max-w-7xl px-6">
          {/* Project main content area */}
          <div className="flex flex-col lg:flex-row gap-12">
            {/* Project Info Sidebar */}
            <div className="w-full lg:w-80 lg:flex-shrink-0 space-y-8 animate-in fade-in slide-in-from-bottom-3 duration-700 delay-300">
              <div className="sticky top-24">
                <div className="rounded-xl bg-background/50 backdrop-blur-md border border-muted/50 p-6 space-y-8">
                  {/* Client info */}
                  <div>
                    <h3 className="text-sm font-medium uppercase tracking-wider mb-4 text-muted-foreground">
                      Project Details
                    </h3>
                    <Separator className="mb-4" />

                    <dl className="space-y-4">
                      <div className="flex items-start gap-3">
                        <div className="size-8 flex-shrink-0 rounded-full bg-primary/10 flex items-center justify-center">
                          <User className="size-4 text-primary" />
                        </div>
                        <div>
                          <dt className="text-muted-foreground text-sm mb-0.5">
                            Client
                          </dt>
                          <dd className="font-medium">{project.client}</dd>
                        </div>
                      </div>

                      {project.date && (
                        <div className="flex items-start gap-3">
                          <div className="size-8 flex-shrink-0 rounded-full bg-primary/10 flex items-center justify-center">
                            <Calendar className="size-4 text-primary" />
                          </div>
                          <div>
                            <dt className="text-muted-foreground text-sm mb-0.5">
                              Completed
                            </dt>
                            <dd className="font-medium">
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
                    </dl>
                  </div>

                  {/* Technologies */}
                  <div>
                    <h3 className="text-sm font-medium uppercase tracking-wider mb-4 text-muted-foreground">
                      Technologies
                    </h3>
                    <Separator className="mb-4" />
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag, index) => (
                        <Badge
                          key={index}
                          variant="outline"
                          className="bg-primary/5 hover:bg-primary/10 border-primary/20 text-foreground transition-colors"
                        >
                          {tag.name}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Project Content */}
            <div className="flex-1 animate-in fade-in slide-in-from-bottom-3 duration-700 delay-450">
              <Tabs
                defaultValue="overview"
                value={activeTab}
                onValueChange={setActiveTab}
                className="w-full mb-8"
              >
                <TabsList className="rounded-full bg-muted/30 backdrop-blur-md border border-muted/50 p-1">
                  <TabsTrigger
                    value="overview"
                    className="rounded-full data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm"
                  >
                    Overview
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="mt-6">
                  <div className="rounded-xl bg-background/50 backdrop-blur-md border border-muted/50 p-6 md:p-8">
                    <h2 className="text-2xl font-medium mb-6">
                      Project Overview
                    </h2>
                    <div className="prose dark:prose-invert max-w-none">
                      {project.full_description ? (
                        <div
                          dangerouslySetInnerHTML={{
                            __html: project.full_description,
                          }}
                        />
                      ) : (
                        <p>{project.description}</p>
                      )}
                    </div>

                    {/* Project Image - only shown in overview tab */}
                    {project.thumbnail && (
                      <div className="mt-8 rounded-xl overflow-hidden">
                        <img
                          src={project.thumbnail}
                          alt={project.title}
                          className="w-full h-auto object-cover"
                        />
                      </div>
                    )}
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>

          {/* Related Projects Section */}
          {/* {relatedProjects.length > 0 && (
            <div className="mt-16 md:mt-24 animate-in fade-in slide-in-from-bottom-3 duration-700 delay-700">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-medium">Related Projects</h2>
                <Button variant="ghost" asChild>
                  <Link to="/works" className="flex items-center gap-2">
                    View All
                    <ArrowRight className="size-4" />
                  </Link>
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedProjects.map((relatedProject) => (
                  <div
                    key={relatedProject.id}
                    onClick={() =>
                      navigate(
                        `/projects/${relatedProject.slug || relatedProject.id}`
                      )
                    }
                    className="group cursor-pointer relative flex flex-col rounded-xl overflow-hidden bg-background/50 backdrop-blur-md border border-muted/50 transition-all duration-300 hover:shadow-lg hover:border-primary/20 hover:scale-[1.02]"
                  >
                    <div className="h-48 relative overflow-hidden">
                      {relatedProject.thumbnail ? (
                        <img
                          src={relatedProject.thumbnail}
                          alt={`${relatedProject.title} thumbnail`}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <div className="absolute inset-0 bg-muted/30 flex items-center justify-center">
                          <div className="size-16 opacity-30">
                            {getIconComponent(relatedProject.icon)}
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="p-5">
                      <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
                        {relatedProject.category}
                      </div>
                      <h3 className="text-lg font-medium mb-2 transition-all duration-300 group-hover:text-primary">
                        {relatedProject.title}
                      </h3>
                      <p className="text-muted-foreground text-sm line-clamp-2">
                        {relatedProject.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )} */}
        </div>
      </div>
    </section>
  );
}

// Enhanced skeleton loader with more modern design
const ProjectDetailSkeleton = () => (
  <section className="bg-background relative overflow-hidden min-h-screen">
    {/* Background gradients */}
    <div className="absolute inset-0 bg-mesh-gradient pointer-events-none" />
    <div className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-primary/10 blur-3xl transform-gpu" />
    <div className="absolute top-1/2 -right-48 h-96 w-96 rounded-full bg-secondary/10 blur-3xl transform-gpu" />

    {/* Hero skeleton */}
    <div className="h-[50vh] md:h-[60vh] relative flex items-end">
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
      <div className="relative z-10 mx-auto max-w-7xl px-6 py-16">
        {/* Back button skeleton */}
        <div className="mb-6">
          <Skeleton className="h-10 w-36 rounded-full" />
        </div>

        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <Skeleton className="h-6 w-32 rounded-full mb-2" />
            <Skeleton className="h-4 w-24 mb-2" />
            <Skeleton className="h-12 w-80 mb-4" />
            <Skeleton className="h-6 w-full max-w-3xl" />
          </div>
          <div className="flex items-center gap-3">
            <Skeleton className="h-10 w-32 rounded-full" />
            <Skeleton className="h-10 w-10 rounded-full" />
          </div>
        </div>
      </div>
    </div>

    <div className="py-12 md:py-20">
      <div className="mx-auto max-w-7xl px-6">
        {/* Project main content area */}
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Project Info Sidebar skeleton */}
          <div className="w-full lg:w-80 lg:flex-shrink-0">
            <div className="sticky top-24">
              <div className="rounded-xl bg-background/50 backdrop-blur-md border border-muted/50 p-6 space-y-8">
                <div>
                  <Skeleton className="h-5 w-36 mb-4" />
                  <Skeleton className="h-px w-full mb-4" />

                  <div className="space-y-4">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="flex items-start gap-3">
                        <Skeleton className="size-8 rounded-full" />
                        <div className="flex-1">
                          <Skeleton className="h-4 w-24 mb-1" />
                          <Skeleton className="h-5 w-36" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <Skeleton className="h-5 w-36 mb-4" />
                  <Skeleton className="h-px w-full mb-4" />
                  <div className="flex flex-wrap gap-2">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Skeleton key={i} className="h-8 w-20 rounded-full" />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Project Content skeleton */}
          <div className="flex-1">
            <div className="mb-8">
              <Skeleton className="h-10 w-full max-w-md rounded-full" />
            </div>

            <div className="rounded-xl bg-background/50 backdrop-blur-md border border-muted/50 p-6 md:p-8">
              <Skeleton className="h-8 w-48 mb-6" />
              <div className="space-y-4">
                <Skeleton className="h-5 w-full" />
                <Skeleton className="h-5 w-full" />
                <Skeleton className="h-5 w-full" />
                <Skeleton className="h-5 w-3/4" />
              </div>

              <Skeleton className="h-[400px] w-full mt-8 rounded-xl" />
            </div>
          </div>
        </div>

        {/* Related Projects Section skeleton */}
        <div className="mt-16 md:mt-24">
          <div className="flex items-center justify-between mb-8">
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-10 w-24" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="rounded-xl overflow-hidden border border-muted/50"
              >
                <Skeleton className="h-48 w-full" />
                <div className="p-5">
                  <Skeleton className="h-4 w-24 mb-2" />
                  <Skeleton className="h-6 w-full mb-2" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4 mt-1" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </section>
);
