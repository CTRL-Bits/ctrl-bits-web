import { ReactNode, useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import LoadingScreen from "./ui/loading-screen";
import { API_BASE_URL } from "@/services/api";

const DEFAULT_CRITICAL_ENDPOINTS = [
  `${API_BASE_URL}/testimonials/`,
  `${API_BASE_URL}/team/`,
  `${API_BASE_URL}/companies/`,
  `${API_BASE_URL}/tech/`,
  `${API_BASE_URL}/projects/`,
];

interface LoadingProviderProps {
  children: ReactNode;
  companyName: string;
  criticalEndpoints?: string[];
}

const LoadingProvider = ({
  children,
  companyName,
  criticalEndpoints = DEFAULT_CRITICAL_ENDPOINTS,
}: LoadingProviderProps) => {
  const shouldReduceMotion = useReducedMotion();

  const [isLoading, setIsLoading] = useState(true);
  const [loadProgress, setLoadProgress] = useState(0);

  useEffect(() => {
    let isCancelled = false;
    let hasFinished = false;
    const controller = new AbortController();
    let completionTimer: ReturnType<typeof setTimeout> | undefined;

    const finishLoading = () => {
      if (isCancelled || hasFinished) return;

      hasFinished = true;
      setLoadProgress(100);

      completionTimer = setTimeout(() => {
        if (!isCancelled) setIsLoading(false);
      }, 550);
    };

    const loadAllEndpoints = async () => {
      try {
        const totalEndpoints = criticalEndpoints.length;
        let completedEndpoints = 0;

        setLoadProgress(8);

        const results = await Promise.allSettled(
          criticalEndpoints.map(async (url) => {
            try {
              const response = await fetch(url, {
                signal: controller.signal,
              });

              if (!response.ok) {
                throw new Error(`Failed to fetch ${url}`);
              }

              const data: unknown = await response.json();

              if (data === null || typeof data === "undefined") {
                throw new Error(`No data returned from ${url}`);
              }

              return data;
            } finally {
              completedEndpoints += 1;

              if (!isCancelled && totalEndpoints > 0) {
                setLoadProgress(
                  Math.min(
                    92,
                    Math.round(12 + (completedEndpoints / totalEndpoints) * 70),
                  ),
                );
              }
            }
          }),
        );

        const failedEndpoint = results.find(
          (result) => result.status === "rejected",
        );

        if (failedEndpoint) {
          throw new Error("One or more critical endpoints failed to load");
        }

        finishLoading();
      } catch (error) {
        if (controller.signal.aborted) return;

        console.error("Error loading critical endpoints:", error);
      }
    };

    loadAllEndpoints();

    return () => {
      isCancelled = true;
      controller.abort();
      if (completionTimer) clearTimeout(completionTimer);
    };
  }, [criticalEndpoints]);

  return (
    <>
      <motion.div
        aria-hidden={isLoading}
        className={isLoading ? "pointer-events-none" : undefined}
        initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
        animate={
          isLoading && !shouldReduceMotion
            ? { opacity: 0.96, y: 12 }
            : { opacity: 1, y: 0 }
        }
        transition={{ duration: 0.45, ease: "easeOut" }}
      >
        {children}
      </motion.div>

      <AnimatePresence>
        {isLoading && (
          <LoadingScreen companyName={companyName} progress={loadProgress} />
        )}
      </AnimatePresence>
    </>
  );
};

export default LoadingProvider;
