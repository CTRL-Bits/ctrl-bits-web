import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import { TechData } from "@/types";

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

// Define props for our component
interface TechStackProps {
  className?: string;
}

export default function TechStack({ className = "" }: TechStackProps) {
  // Using a type-safe approach to state
  type CategoryKey = keyof typeof techData;
  const [activeCategory, setActiveCategory] = useState<string>("frontend");

  return (
    <div className={`w-full py-6 max-w-3xl mx-auto ${className}`}>
      <div className="text-center mb-4">
        <h3 className="text-xl font-bold">Our Tech Stack</h3>
      </div>

      <Tabs
        defaultValue="frontend"
        value={activeCategory}
        onValueChange={(value: string) => setActiveCategory(value)}
        className="w-full"
      >
        <div className="flex justify-center mb-6">
          <TabsList className="rounded-full p-1">
            <TabsTrigger
              value="frontend"
              className="rounded-full text-xs px-4 py-2 data-[state=active]:bg-slate-900 data-[state=active]:text-white"
            >
              Frontend
            </TabsTrigger>
            <TabsTrigger
              value="backend"
              className="rounded-full text-xs px-4 py-2 data-[state=active]:bg-slate-900 data-[state=active]:text-white"
            >
              Backend
            </TabsTrigger>
            <TabsTrigger
              value="devops"
              className="rounded-full text-xs px-4 py-2 data-[state=active]:bg-slate-900 data-[state=active]:text-white"
            >
              DevOps
            </TabsTrigger>
            <TabsTrigger
              value="tools"
              className="rounded-full text-xs px-4 py-2 data-[state=active]:bg-slate-900 data-[state=active]:text-white"
            >
              Tools
            </TabsTrigger>
          </TabsList>
        </div>

        {(Object.keys(techData) as CategoryKey[]).map((category) => (
          <TabsContent
            key={category}
            value={category as string}
            className="mt-0"
          >
            <div className="flex flex-wrap items-center justify-center gap-4">
              {techData[category].map((tech, index) => (
                <motion.div
                  key={tech.name}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="flex flex-col items-center"
                >
                  <div className="w-12 h-12 rounded-full flex items-center justify-center overflow-hidden transition-transform hover:scale-110 cursor-pointer">
                    <img
                      src={tech.icon}
                      alt={tech.name}
                      width={48}
                      height={48}
                      title={tech.name}
                    />
                  </div>
                  <span className="sr-only">{tech.name}</span>
                </motion.div>
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
