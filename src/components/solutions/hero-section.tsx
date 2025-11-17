import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import ShinyText from "../react-bits/animations/TextAnimations/ShinyText/ShinyText";
import { ContainerTextFlip } from "../ui/container-text-flip";

export default function SolutionsHero() {
  return (
    <section className="py-24 md:py-32 lg:py-40 relative overflow-hidden">
      {/* Content */}
      <div className="mx-auto max-w-5xl px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-3xl space-y-6 text-center"
        >
          <div className="flex items-center justify-center space-x-2 mb-6">
            <span className="cursor-target inline-flex items-center rounded-full px-2.5 py-1 sm:px-3 sm:py-1.5 text-xs sm:text-sm font-medium text-primary ring-1 ring-primary/20 backdrop-blur-sm">
              <Sparkles className="mr-1 sm:mr-1.5 h-3 w-3 sm:h-3.5 sm:w-3.5 animate-pulse" />
              <ShinyText
                text="Transformative Tech Solutions"
                disabled={false}
                speed={3}
              />
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold">
            Solutions That{" "}
            <ContainerTextFlip
              className="cursor-target"
              words={[
                "Empower",
                "Accelerate",
                "Transform",
                "Innovate",
                "Elevate",
                "Unlock",
              ]}
            />
            {""}
            <br />
            Your <ShinyText text="Growth" hasSVG />.
          </h1>
          <p className="text-lg max-w-2xl mx-auto">
            At Ctrl Bits, we blend code, creativity, and cutting-edge tools,
            helping businesses thrive in the digital era— bit by{" "}
            <span className="font-medium text-foreground relative">
              bit
              <span className="absolute bottom-0 left-0 w-full h-0.5 rounded-full"></span>
            </span>
            .
          </p>
        </motion.div>
      </div>
    </section>
  );
}
