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
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

interface Project {
  id: number;
  title: string;
  description: string;
  category: string;
  icon: React.ReactNode;
  link: string;
  client?: string;
  date?: string;
  tags?: string[];
  featured?: boolean;
  fullDescription?: string;
  thumbnailClass?: string;
}

type ViewMode = "grid" | "list";
type CategoryType = string;

export default function ProjectsPage(): React.ReactElement {
  const [searchQuery, setSearchQuery] = React.useState<string>("");
  const [activeCategory, setActiveCategory] =
    React.useState<CategoryType>("All");
  const [viewMode, setViewMode] = React.useState<ViewMode>("grid");
  const searchInputRef = React.useRef<HTMLInputElement>(null);

  const projects: Project[] = [
    {
      id: 1,
      title: "E-Commerce Platform",
      description:
        "Custom online store with integrated payment gateway, inventory management, and responsive design for a local retail business.",
      fullDescription:
        "We developed a comprehensive e-commerce solution that transformed the client's retail business. The platform features a custom product catalog, secure payment processing with multiple gateway options, real-time inventory management, customer account handling, and a responsive design that provides an exceptional shopping experience across all devices. The implementation included advanced analytics tools, allowing the client to track customer behavior and optimize their sales funnel.",
      category: "Web Development",
      icon: <ShoppingCart className="stroke-2" />,
      link: "/projects/ecommerce",
      client: "Urban Essentials",
      date: "March 2024",
      tags: ["React", "Node.js", "Stripe", "MongoDB", "Responsive Design"],
      featured: true,
      thumbnailClass: "bg-neutral-50 dark:bg-neutral-950",
    },
    {
      id: 2,
      title: "Corporate Website Redesign",
      description:
        "Modern, user-focused website overhaul with improved UX/UI, SEO optimization, and content management system for a financial services firm.",
      fullDescription:
        "We completely reimagined the client's corporate web presence with a focus on user experience and conversion optimization. The redesign involved creating a cleaner information architecture, implementing modern UX/UI principles, optimizing for search engines, and building a custom content management system that allows the client's marketing team to easily update content. The new site resulted in a 45% increase in lead generation and significantly improved user engagement metrics.",
      category: "UI/UX Design",
      icon: <Layout className="stroke-2" />,
      link: "/projects/corporate-redesign",
      client: "Meridian Financial",
      date: "January 2024",
      tags: ["Figma", "WordPress", "SEO", "Adobe XD", "Content Strategy"],
      featured: true,
      thumbnailClass: "bg-neutral-50 dark:bg-neutral-950",
    },
    {
      id: 3,
      title: "Brand Identity System",
      description:
        "Comprehensive visual identity including logo design, typography, color palette, and brand guidelines for a tech startup.",
      fullDescription:
        "We created a complete brand identity system for an emerging tech startup preparing for their market launch. The project encompassed primary and secondary logo variations, a carefully selected typography system, an adaptable color palette, custom iconography, and comprehensive usage guidelines. The result was a cohesive visual language that communicated the client's innovative approach and established a strong foundation for all their marketing and product materials.",
      category: "Graphic Design",
      icon: <Palette className="stroke-2" />,
      link: "/projects/brand-identity",
      client: "NexusAI",
      date: "November 2023",
      tags: [
        "Logo Design",
        "Typography",
        "Brand Guidelines",
        "Illustrator",
        "Identity Design",
      ],
      featured: false,
      thumbnailClass: "bg-neutral-50 dark:bg-neutral-950",
    },
    {
      id: 4,
      title: "Custom CRM Solution",
      description:
        "Tailored customer relationship management system with analytics dashboard, automated workflows, and third-party integrations.",
      fullDescription:
        "We developed a bespoke CRM system that addressed the unique operational challenges of our client's business. The solution included a comprehensive customer database, an intuitive analytics dashboard providing actionable insights, automated workflow tools to streamline processes, and seamless integrations with the client's existing software ecosystem. The implementation reduced administrative workload by 30% and provided valuable data for strategic decision-making.",
      category: "Software Development",
      icon: <Database className="stroke-2" />,
      link: "/projects/crm-solution",
      client: "Tectonic Solutions",
      date: "February 2024",
      tags: [
        "TypeScript",
        "React",
        "Node.js",
        "PostgreSQL",
        "Data Visualization",
      ],
      featured: false,
      thumbnailClass: "bg-neutral-50 dark:bg-neutral-950",
    },
    {
      id: 5,
      title: "Mobile Application",
      description:
        "Cross-platform mobile app with offline functionality, real-time notifications, and seamless synchronization for a healthcare provider.",
      fullDescription:
        "We built a sophisticated mobile application for healthcare providers that allows them to manage patient information securely while on the move. The app features offline functionality for use in areas with limited connectivity, real-time notifications for critical updates, seamless data synchronization across devices, and strict HIPAA-compliant security measures. The intuitive interface was designed specifically for high-pressure healthcare environments, minimizing training time and reducing input errors.",
      category: "App Development",
      icon: <Code className="stroke-2" />,
      link: "/projects/mobile-app",
      client: "MedSync Health",
      date: "December 2023",
      tags: [
        "React Native",
        "Firebase",
        "Offline-First",
        "Healthcare",
        "iOS/Android",
      ],
      featured: true,
      thumbnailClass: "bg-neutral-50 dark:bg-neutral-950",
    },
    {
      id: 6,
      title: "Multi-lingual Portal",
      description:
        "International web portal with content localization, cultural adaptations, and region-specific features for a global education company.",
      fullDescription:
        "We created a sophisticated multi-lingual web portal for an international education provider operating in 12 countries. The solution included comprehensive content localization systems, culturally adapted user interfaces, region-specific feature sets, and a centralized management dashboard. The architecture was designed to accommodate varying regulatory requirements across different markets while maintaining a consistent brand experience. The implementation helped the client expand their global reach and improve engagement across all regions.",
      category: "Web Development",
      icon: <Globe className="stroke-2" />,
      link: "/projects/multilingual-portal",
      client: "Global Learning Institute",
      date: "October 2023",
      tags: [
        "Internationalization",
        "React",
        "Next.js",
        "Content Localization",
        "Multi-region",
      ],
      featured: false,
      thumbnailClass: "bg-neutral-50 dark:bg-neutral-950",
    },
    {
      id: 7,
      title: "Data Visualization Dashboard",
      description:
        "Interactive analytics platform with real-time data processing, customizable visualizations, and automated reporting for a market research firm.",
      fullDescription:
        "We developed a sophisticated data visualization dashboard that transformed raw market research data into actionable insights. The platform features real-time data processing capabilities, a library of customizable visualization components, automated report generation, and an intuitive interface that allows non-technical users to explore complex datasets. The solution has become an essential decision-making tool for the client, enabling them to identify market trends and opportunities more efficiently.",
      category: "Data Visualization",
      icon: <Database className="stroke-2" />,
      link: "/projects/data-dashboard",
      client: "Insight Analytics",
      date: "January 2024",
      tags: [
        "D3.js",
        "React",
        "Data Processing",
        "Interactive Charts",
        "Real-time Updates",
      ],
      featured: false,
      thumbnailClass: "bg-neutral-50 dark:bg-neutral-950",
    },
    {
      id: 8,
      title: "E-Learning Platform",
      description:
        "Comprehensive online learning system with course management, interactive content delivery, student progress tracking, and certification features.",
      fullDescription:
        "We built a complete e-learning platform that revolutionized our client's training programs. The solution includes sophisticated course management tools, interactive lesson content with multimedia support, detailed student progress tracking, automated assessments, and a digital certification system. The platform provides administrators with comprehensive analytics on student engagement and performance, while offering learners a smooth, intuitive educational experience across all devices.",
      category: "Web Development",
      icon: <Layout className="stroke-2" />,
      link: "/projects/elearning",
      client: "EduTech Solutions",
      date: "November 2023",
      tags: [
        "Learning Management System",
        "React",
        "Node.js",
        "Interactive Content",
        "Assessment Tools",
      ],
      featured: false,
      thumbnailClass: "bg-neutral-50 dark:bg-neutral-950",
    },
    {
      id: 9,
      title: "IoT Control Application",
      description:
        "Secure system for monitoring and controlling smart devices with real-time data visualization, automation rules, and remote management capabilities.",
      fullDescription:
        "We created a sophisticated IoT control application that connects and manages an ecosystem of smart devices for industrial use. The system provides real-time monitoring and control capabilities, comprehensive data visualization tools, customizable automation rules, and secure remote management features. The architecture was designed with scalability in mind, allowing for easy integration of new device types as the client's needs evolve. Advanced security features protect sensitive operational data while ensuring reliable performance.",
      category: "App Development",
      icon: <Code className="stroke-2" />,
      link: "/projects/iot-control",
      client: "Nexus Industrial",
      date: "February 2024",
      tags: ["IoT", "React", "WebSockets", "MQTT", "Device Management"],
      featured: true,
      thumbnailClass: "bg-neutral-50 dark:bg-neutral-950",
    },
  ];

  const categories: CategoryType[] = [
    "All",
    "Web Development",
    "UI/UX Design",
    "Graphic Design",
    "Software Development",
    "App Development",
    "Data Visualization",
  ];

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
            tag.toLowerCase().includes(searchQuery.toLowerCase())
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
                {featuredProjects.map((project) =>
                  viewMode === "grid" ? (
                    <ProjectGridItem key={project.id} project={project} />
                  ) : (
                    <ProjectListItem key={project.id} project={project} />
                  )
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
                    <ProjectGridItem key={project.id} project={project} />
                  ) : (
                    <ProjectListItem key={project.id} project={project} />
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
                <ProjectGridItem key={project.id} project={project} />
              ) : (
                <ProjectListItem key={project.id} project={project} />
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
}

const ProjectGridItem = React.forwardRef<HTMLDivElement, ProjectItemProps>(
  ({ project }, ref) => {
    const { title, description, category, icon, link, tags, client } = project;
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
          {/* Project thumbnail area */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div
              className={cn(
                "transition-all duration-500",
                isHovered ? "scale-110 opacity-20" : "scale-100 opacity-30"
              )}
            >
              <div className="size-16">{icon}</div>
            </div>
          </div>

          {/* Overlay with project details on hover */}
          <div
            className={cn(
              "absolute inset-0 bg-black/10 dark:bg-white/10 flex items-center justify-center",
              "transition-opacity duration-300",
              isHovered ? "opacity-100" : "opacity-0"
            )}
          >
            <Link
              to={link}
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
          <Link to={link} className="group/link">
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
                  {tag}
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
  ({ project }, ref) => {
    const { title, description, category, icon, link, tags, client, date } =
      project;

    return (
      <div
        ref={ref}
        className="group border border-neutral-200 dark:border-neutral-800 rounded-lg p-6 transition-all duration-300 hover:shadow-sm hover:border-neutral-300 dark:hover:border-neutral-700"
      >
        <div className="flex flex-col md:flex-row gap-6">
          {/* Project icon */}
          <div
            className={cn(
              "flex-shrink-0 size-16 md:size-20 flex items-center justify-center rounded-md",
              project.thumbnailClass || "bg-neutral-50 dark:bg-neutral-950"
            )}
          >
            <div className="size-8 md:size-10">{icon}</div>
          </div>

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
                  {date}
                </div>
              )}
            </div>

            <Link to={link} className="group/link">
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
                        {tag}
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
                  to={link}
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
