import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

type TestimonialType = {
  id: string | number;
  name: string;
  position: string;
  company: string;
  avatar: string;
  content: string;
  rating?: number;
  featured?: boolean;
  date?: string;
};

const DURATION = 5000; // ms
const BAR_WIDTH = 50;
const CIRCLE_SIZE = 12;

export function TestimonialsSection() {
  const [index, setIndex] = useState(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [testimonials, setTestimonials] = useState<TestimonialType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchTestimonials() {
      try {
        const response = await fetch(
          "https://api.ctrlbits.xyz/api/testimonials"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch testimonials");
        }
        const data = await response.json();
        setTestimonials(data.results || []);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : String(err);
        setError(errorMessage);
        console.error("Error fetching testimonials:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchTestimonials();
  }, []);

  useEffect(() => {
    if (testimonials.length === 0) return;

    timeoutRef.current = setTimeout(() => {
      setIndex((prev) => (prev + 1) % testimonials.length);
    }, DURATION);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [index, testimonials.length]);

  if (loading) {
    return (
      <section className="bg-background relative flex flex-col items-center py-16">
        <div className="flex w-full max-w-5xl flex-col items-center justify-center px-4">
          <div className="text-foreground text-xl">Loading testimonials...</div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="bg-background relative flex flex-col items-center py-16">
        <div className="flex w-full max-w-5xl flex-col items-center justify-center px-4">
          <div className="text-red-500 text-xl">Error: {error}</div>
        </div>
      </section>
    );
  }

  if (testimonials.length === 0) {
    return (
      <section className="bg-background relative flex flex-col items-center py-16">
        <div className="flex w-full max-w-5xl flex-col items-center justify-center px-4">
          <div className="text-foreground text-xl">
            No testimonials available
          </div>
        </div>
      </section>
    );
  }

  const currentTestimonial = testimonials[index];

  // Helper function to get initials from name
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase())
      .join("")
      .slice(0, 2); // Limit to 2 characters
  };

  return (
    <section className="bg-background relative flex flex-col items-center py-16">
      <div className="flex w-full max-w-5xl flex-col items-center justify-center px-4">
        <div className="min-h-[120px] w-full">
          <AnimatePresence mode="wait">
            <motion.blockquote
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="text-foreground mb-8 text-center text-2xl leading-tight font-semibold md:text-4xl"
            >
              "{currentTestimonial.content}"
            </motion.blockquote>
          </AnimatePresence>
        </div>
        <div className="flex w-full max-w-lg items-center justify-center gap-8 pt-8">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={index}
              initial={{ opacity: 0, filter: "blur(8px)" }}
              animate={{ opacity: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, filter: "blur(8px)" }}
              transition={{ type: "spring", duration: 0.5 }}
              className="flex items-center gap-4"
            >
              {currentTestimonial.avatar ? (
                <img
                  src={currentTestimonial.avatar}
                  alt={currentTestimonial.name + " avatar"}
                  width={48}
                  height={48}
                  className="bg-foreground/10 h-12 w-12 rounded-full border object-cover"
                />
              ) : (
                <div className="bg-foreground/10 h-12 w-12 rounded-full border flex items-center justify-center">
                  <span className="text-foreground font-medium text-sm">
                    {getInitials(currentTestimonial.name)}
                  </span>
                </div>
              )}
              <div className="border-muted-foreground/30 mx-4 h-8 border-l" />
              <div className="text-left">
                <div className="text-foreground text-lg font-medium italic">
                  {currentTestimonial.name}
                </div>
                <div className="text-muted-foreground text-base">
                  {currentTestimonial.company}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
        {/* Progress Bar & Circles Indicator */}
        <div className="mx-auto mt-8 flex w-full max-w-lg justify-center gap-3">
          {testimonials.map((_, i) => {
            const isActive = i === index;
            return (
              <motion.span
                key={i}
                layout
                initial={false}
                animate={{
                  width: isActive ? BAR_WIDTH : CIRCLE_SIZE,
                  height: CIRCLE_SIZE,
                  borderRadius: isActive ? 8 : 999,
                }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 30,
                  duration: 0.4,
                }}
                className="bg-foreground/10 relative block overflow-hidden cursor-pointer"
                style={{
                  minWidth: CIRCLE_SIZE,
                  maxWidth: BAR_WIDTH,
                  border: "none",
                }}
                onClick={() => setIndex(i)}
              >
                {isActive && (
                  <motion.div
                    key={index}
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    exit={{ width: 0 }}
                    transition={{ duration: DURATION / 1000, ease: "linear" }}
                    className="bg-[#007dff] absolute top-0 left-0 h-full rounded-lg"
                  />
                )}
              </motion.span>
            );
          })}
        </div>
      </div>
    </section>
  );
}
