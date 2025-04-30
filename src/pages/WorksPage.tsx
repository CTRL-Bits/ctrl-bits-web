import { Button } from "@/components/ui/button";
import { ArrowRight, X } from "lucide-react";
import { Link } from "react-router-dom";
import * as React from "react";
import {
  Code,
  Layout,
  Palette,
  Database,
  Globe,
  ShoppingCart,
} from "lucide-react";

// Define TypeScript interfaces for our data structures
interface Project {
  id: number;
  title: string;
  description: string;
  category: string;
  icon: React.ReactNode;
  link: string;
}

interface ProjectCardProps {
  project: Project;
  isHovered: boolean;
  onHover: () => void;
  onLeave: () => void;
}

export default function WorksPage(): React.ReactElement {
  const [activeFilter, setActiveFilter] = React.useState<string>("All");
  const [hoveredProject, setHoveredProject] = React.useState<number | null>(
    null
  );

  const categories: string[] = [
    "All",
    "Web Development",
    "UI/UX Design",
    "Graphic Design",
    "Software Development",
    "App Development",
  ];

  const projects: Project[] = [
    {
      id: 1,
      title: "E-Commerce Platform",
      description:
        "Custom online store with integrated payment gateway, inventory management, and responsive design for a local retail business.",
      category: "Web Development",
      icon: <ShoppingCart className="stroke-2" />,
      link: "/projects/ecommerce",
    },
    {
      id: 2,
      title: "Corporate Website Redesign",
      description:
        "Modern, user-focused website overhaul with improved UX/UI, SEO optimization, and content management system for a financial services firm.",
      category: "UI/UX Design",
      icon: <Layout className="stroke-2" />,
      link: "/projects/corporate-redesign",
    },
    {
      id: 3,
      title: "Brand Identity System",
      description:
        "Comprehensive visual identity including logo design, typography, color palette, and brand guidelines for a tech startup.",
      category: "Graphic Design",
      icon: <Palette className="stroke-2" />,
      link: "/projects/brand-identity",
    },
    {
      id: 4,
      title: "Custom CRM Solution",
      description:
        "Tailored customer relationship management system with analytics dashboard, automated workflows, and third-party integrations.",
      category: "Software Development",
      icon: <Database className="stroke-2" />,
      link: "/projects/crm-solution",
    },
    {
      id: 5,
      title: "Mobile Application",
      description:
        "Cross-platform mobile app with offline functionality, real-time notifications, and seamless synchronization for a healthcare provider.",
      category: "App Development",
      icon: <Code className="stroke-2" />,
      link: "/projects/mobile-app",
    },
    {
      id: 6,
      title: "Multi-lingual Portal",
      description:
        "International web portal with content localization, cultural adaptations, and region-specific features for a global education company.",
      category: "Web Development",
      icon: <Globe className="stroke-2" />,
      link: "/projects/multilingual-portal",
    },
  ];

  const filteredProjects: Project[] =
    activeFilter === "All"
      ? projects
      : projects.filter((project) => project.category === activeFilter);

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

          {/* Categories */}
          <div className="mt-24 flex flex-wrap justify-center gap-4">
            {categories.slice(1).map((category) => (
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
  const { title, description, category, icon, link } = project;

  return (
    <div
      className="group relative flex flex-col h-full"
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      <div className="relative overflow-hidden h-80 w-full mb-6 bg-neutral-100 dark:bg-neutral-900">
        {/* Project thumbnail area */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className={`
            transition-all duration-500 
            ${isHovered ? "scale-110 opacity-20" : "scale-100 opacity-30"}
          `}
          >
            <div className="size-24">{icon}</div>
          </div>
        </div>

        {/* Overlay with project details on hover */}
        <div
          className={`
          absolute inset-0 bg-black/10 dark:bg-white/10 flex items-center justify-center
          transition-opacity duration-500 
          ${isHovered ? "opacity-100" : "opacity-0"}
        `}
        >
          <Link
            to={link}
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
