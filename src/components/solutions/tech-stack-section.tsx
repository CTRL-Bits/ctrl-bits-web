import { ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import TechStack from "@/components/tech-stack";

export default function TechStackSection() {
  return (
    <section>
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h2 className="text-3xl font-semibold mb-4">
            Technologies We Master
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A 360° Approach to Digital Growth
          </p>
        </motion.div>

        <TechStack />

        <div className="mt-4 flex flex-col md:flex-row gap-6 justify-center items-center">
          <Button
            asChild
            size="lg"
            className="h-12 rounded-full pl-6 pr-5 text-base shadow-lg shadow-primary/10 hover:shadow-primary/20 transition-all group"
          >
            <Link to="/portfolio">
              <span className="text-nowrap flex items-center">
                View Our Projects
                <ChevronRight className="ml-1 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
