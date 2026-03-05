import { useState } from "react";

interface Tech {
  name: string;
  icon: string;
}

interface TechData {
  frontend: Tech[];
  backend: Tech[];
  devops: Tech[];
  tools: Tech[];
}

const techData: TechData = {
  frontend: [
    { name: "React", icon: "https://skillicons.dev/icons?i=react" },
    { name: "Next.js", icon: "https://skillicons.dev/icons?i=nextjs" },
    { name: "TypeScript", icon: "https://skillicons.dev/icons?i=ts" },
    { name: "Tailwind CSS", icon: "https://skillicons.dev/icons?i=tailwind" },
    { name: "JavaScript", icon: "https://skillicons.dev/icons?i=js" },
    { name: "HTML", icon: "https://skillicons.dev/icons?i=html" },
    { name: "CSS", icon: "https://skillicons.dev/icons?i=css" },
    { name: "Sass", icon: "https://skillicons.dev/icons?i=sass" },
  ],
  backend: [
    { name: "Django", icon: "https://skillicons.dev/icons?i=django" },
    { name: "Node.js", icon: "https://skillicons.dev/icons?i=nodejs" },
    { name: "Express", icon: "https://skillicons.dev/icons?i=express" },
    { name: "PostgreSQL", icon: "https://skillicons.dev/icons?i=postgres" },
    { name: "MongoDB", icon: "https://skillicons.dev/icons?i=mongodb" },
    { name: "Firebase", icon: "https://skillicons.dev/icons?i=firebase" },
    { name: "Redis", icon: "https://skillicons.dev/icons?i=redis" },
    { name: "Supabase", icon: "https://skillicons.dev/icons?i=supabase" },
  ],
  devops: [
    { name: "Docker", icon: "https://skillicons.dev/icons?i=docker" },
    { name: "Kubernetes", icon: "https://skillicons.dev/icons?i=kubernetes" },
    { name: "GitHub", icon: "https://skillicons.dev/icons?i=github" },
    { name: "Vercel", icon: "https://skillicons.dev/icons?i=vercel" },
    { name: "GitLab", icon: "https://skillicons.dev/icons?i=gitlab" },
  ],
  tools: [
    { name: "Figma", icon: "https://skillicons.dev/icons?i=figma" },
    { name: "VS Code", icon: "https://skillicons.dev/icons?i=vscode" },
    { name: "Webpack", icon: "https://skillicons.dev/icons?i=webpack" },
    { name: "Vite", icon: "https://skillicons.dev/icons?i=vite" },
    { name: "Postman", icon: "https://skillicons.dev/icons?i=postman" },
    { name: "NPM", icon: "https://skillicons.dev/icons?i=npm" },
    { name: "Adobe After Effects", icon: "https://skillicons.dev/icons?i=ae" },
    { name: "Adobe Premiere Pro", icon: "https://skillicons.dev/icons?i=pr" },
    { name: "Adobe Illustrator", icon: "https://skillicons.dev/icons?i=ai" },
    { name: "Adobe Photoshop", icon: "https://skillicons.dev/icons?i=ps" },
  ],
};

const categories = [
  { key: "frontend", label: "Frontend" },
  { key: "backend", label: "Backend" },
  { key: "devops", label: "DevOps" },
  { key: "tools", label: "Tools" },
];

interface TechCardProps {
  tech: Tech;
  index: number;
}

const TechCard = ({ tech, index }: TechCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        animation: `fadeIn 400ms ease-out ${index * 40}ms backwards`,
      }}
    >
      <div
        className="w-16 h-16 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 flex items-center justify-center transition-all duration-300 cursor-pointer"
        style={{
          transform: isHovered ? "translateY(-4px)" : "translateY(0)",
          borderColor: isHovered ? "#3b82f6" : undefined,
          boxShadow: isHovered
            ? "0 8px 24px rgba(59, 130, 246, 0.15)"
            : "0 2px 8px rgba(0, 0, 0, 0.04)",
        }}
      >
        <img
          src={tech.icon}
          alt={`${tech.name} - technology used by Ctrl Bits Kathmandu web development and digital growth agency`}
          className="w-10 h-10 transition-transform duration-300"
          style={{
            transform: isHovered ? "scale(1.1)" : "scale(1)",
          }}
        />
      </div>

      {/* Tooltip */}
      <div
        className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 px-2.5 py-1 bg-gray-900 dark:bg-gray-800 text-white text-xs rounded-md whitespace-nowrap pointer-events-none"
        style={{
          opacity: isHovered ? 1 : 0,
          transform: isHovered
            ? "translateX(-50%) translateY(0)"
            : "translateX(-50%) translateY(4px)",
          transition: "opacity 200ms, transform 200ms",
        }}
      >
        {tech.name}
      </div>
    </div>
  );
};

export default function TechStack({ className = "" }: { className?: string }) {
  const [activeCategory, setActiveCategory] = useState<string>("frontend");

  return (
    <section className={`w-full bg-white dark:bg-black py-16 ${className}`}>
      <div className="max-w-5xl mx-auto px-6">
        {/* Category Tabs */}
        <div className="flex justify-center gap-2 mb-10">
          {categories.map((category) => {
            const isActive = activeCategory === category.key;
            return (
              <button
                key={category.key}
                onClick={() => setActiveCategory(category.key)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-blue-500 text-white"
                    : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-900"
                }`}
              >
                {category.label}
              </button>
            );
          })}
        </div>

        {/* Tech Grid */}
        <div className="">
          {categories.map((category) => (
            <div
              key={category.key}
              className={`${
                activeCategory === category.key ? "block" : "hidden"
              }`}
            >
              <div className="flex flex-wrap justify-center gap-4">
                {techData[category.key as keyof TechData].map((tech, index) => (
                  <TechCard key={tech.name} tech={tech} index={index} />
                ))}
              </div>
            </div>
          ))}
        </div>
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
      `}</style>
    </section>
  );
}
