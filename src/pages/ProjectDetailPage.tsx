import {
  ArrowLeft,
  Calendar,
  ChefHat,
  ExternalLink,
  Globe,
  Layout,
  Palette,
  ShoppingCart,
  User,
  Code,
  Database,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import { Project } from "@/types";
import { Link, useParams } from "react-router-dom";
import React from "react";
import { fetchProjectBySlug } from "@/services/projectService";

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

export default function ProjectDetailPage(): React.ReactElement {
  const { slug } = useParams<{ slug: string }>();
  const [project, setProject] = React.useState<Project | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

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

  if (loading) {
    return <ProjectDetailSkeleton />;
  }

  if (error || !project) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h3 className="text-xl font-medium mb-2">
            Failed to load project details
          </h3>
          <p className="text-neutral-500 dark:text-neutral-400 mb-6">
            {error || "Project not found"}
          </p>
          <Button asChild>
            <Link to="/works">Back to Projects</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <section className="bg-white dark:bg-black">
      <div className="py-40">
        <div className="mx-auto max-w-7xl px-6">
          {/* Back button */}
          <div className="mb-12">
            <Button variant="ghost" asChild>
              <Link to="/works" className="flex items-center gap-2">
                <ArrowLeft className="size-4" />
                <span>Back to Projects</span>
              </Link>
            </Button>
          </div>

          {/* Project Header */}
          <div className="mb-12">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-6">
              <div>
                <div className="text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider mb-2">
                  {project.category}
                </div>
                <h1 className="font-serif text-5xl font-light tracking-tight">
                  {project.title}
                </h1>
              </div>
              {project.link && (
                <Button asChild variant="outline">
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2"
                  >
                    <span>Visit Site</span>
                    <ExternalLink className="size-4" />
                  </a>
                </Button>
              )}
            </div>
            <p className="text-neutral-500 dark:text-neutral-400 text-lg max-w-3xl">
              {project.description}
            </p>
          </div>

          {/* Project Image */}
          <div className="mb-16 aspect-video bg-neutral-100 dark:bg-neutral-900 overflow-hidden">
            {project.thumbnail ? (
              <img
                src={project.thumbnail}
                alt={project.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <div className="size-32 opacity-30">
                  {project.icon ? (
                    getIconComponent(project.icon)
                  ) : (
                    <Layout className="stroke-2" />
                  )}
                </div>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Project Info Sidebar */}
            <div className="md:col-span-1 space-y-6">
              <div>
                <h3 className="text-sm font-medium uppercase tracking-wider mb-3">
                  Project Details
                </h3>
                <Separator className="mb-4" />

                <dl className="space-y-4">
                  <div>
                    <dt className="flex items-center gap-2 text-neutral-500 dark:text-neutral-400 text-sm mb-1">
                      <User className="size-4" />
                      <span>Client</span>
                    </dt>
                    <dd className="text-sm pl-6">{project.client}</dd>
                  </div>

                  {project.date && (
                    <div>
                      <dt className="flex items-center gap-2 text-neutral-500 dark:text-neutral-400 text-sm mb-1">
                        <Calendar className="size-4" />
                        <span>Completed</span>
                      </dt>
                      <dd className="text-sm pl-6">
                        {new Date(project.date).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </dd>
                    </div>
                  )}
                </dl>
              </div>

              <div>
                <h3 className="text-sm font-medium uppercase tracking-wider mb-3">
                  Technologies
                </h3>
                <Separator className="mb-4" />
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, index) => (
                    <Badge key={index} variant="outline">
                      {tag.name}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            {/* Project Description */}
            <div className="md:col-span-2">
              <h2 className="text-2xl font-medium mb-6">Project Overview</h2>
              <div className="prose dark:prose-invert max-w-none">
                {project.full_description ? (
                  <div
                    dangerouslySetInnerHTML={{
                      __html: project.full_description,
                    }}
                  />
                ) : (
                  <p>{project.full_description}</p>
                )}
              </div>
            </div>
          </div>

          {/* Related Projects Section (can be implemented if needed) */}
        </div>
      </div>
    </section>
  );
}

// Skeleton loader for project detail page
const ProjectDetailSkeleton = () => (
  <section className="bg-white dark:bg-black">
    <div className="py-40">
      <div className="mx-auto max-w-7xl px-6">
        {/* Back button skeleton */}
        <div className="mb-12">
          <Skeleton className="h-10 w-36" />
        </div>

        {/* Project Header skeleton */}
        <div className="mb-12">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-6">
            <div>
              <Skeleton className="h-4 w-24 mb-2" />
              <Skeleton className="h-12 w-80" />
            </div>
            <Skeleton className="h-10 w-32" />
          </div>
          <Skeleton className="h-6 w-full max-w-3xl" />
        </div>

        {/* Project Image skeleton */}
        <Skeleton className="mb-16 aspect-video w-full" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Project Info Sidebar skeleton */}
          <div className="md:col-span-1 space-y-6">
            <div>
              <Skeleton className="h-5 w-36 mb-3" />
              <Skeleton className="h-px w-full mb-4" />

              <div className="space-y-4">
                <div>
                  <Skeleton className="h-5 w-24 mb-1" />
                  <Skeleton className="h-5 w-48 ml-6" />
                </div>
                <div>
                  <Skeleton className="h-5 w-24 mb-1" />
                  <Skeleton className="h-5 w-48 ml-6" />
                </div>
              </div>
            </div>

            <div>
              <Skeleton className="h-5 w-36 mb-3" />
              <Skeleton className="h-px w-full mb-4" />
              <div className="flex flex-wrap gap-2">
                <Skeleton className="h-8 w-24" />
                <Skeleton className="h-8 w-24" />
                <Skeleton className="h-8 w-24" />
              </div>
            </div>
          </div>

          {/* Project Description skeleton */}
          <div className="md:col-span-2">
            <Skeleton className="h-8 w-48 mb-6" />
            <div className="space-y-4">
              <Skeleton className="h-5 w-full" />
              <Skeleton className="h-5 w-full" />
              <Skeleton className="h-5 w-full" />
              <Skeleton className="h-5 w-3/4" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);
