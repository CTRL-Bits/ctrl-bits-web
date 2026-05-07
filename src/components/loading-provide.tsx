import { ReactNode, useEffect, useState } from "react";
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
  const SESSION_LOAD_KEY = "sessionLoadComplete";

  const hasLoadedInThisSession =
    typeof window !== "undefined" &&
    sessionStorage.getItem(SESSION_LOAD_KEY) === "true";

  const [isLoading, setIsLoading] = useState(!hasLoadedInThisSession);
  const [loadProgress, setLoadProgress] = useState(
    hasLoadedInThisSession ? 100 : 0,
  );

  useEffect(() => {
    if (hasLoadedInThisSession) return;

    let isCancelled = false;
    let hasFinished = false;
    let completionTimer: ReturnType<typeof setTimeout> | undefined;
    let errorTimer: ReturnType<typeof setTimeout> | undefined;

    const finishLoading = () => {
      if (isCancelled || hasFinished) return;

      hasFinished = true;
      setLoadProgress(100);
      sessionStorage.setItem(SESSION_LOAD_KEY, "true");

      completionTimer = setTimeout(() => {
        if (!isCancelled) setIsLoading(false);
      }, 350);
    };

    const loadAllEndpoints = async () => {
      try {
        const totalEndpoints = criticalEndpoints.length;
        let completedEndpoints = 0;

        setLoadProgress(8);

        const results = await Promise.allSettled(
          criticalEndpoints.map(async (url) => {
            try {
              const response = await fetch(url);

              if (!response.ok) {
                throw new Error(`Failed to fetch ${url}`);
              }

              return response.json();
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
        console.error("Error loading critical endpoints:", error);
        errorTimer = setTimeout(finishLoading, 2000);
      }
    };

    loadAllEndpoints();

    const safetyTimeout = setTimeout(finishLoading, 10000);

    return () => {
      isCancelled = true;
      clearTimeout(safetyTimeout);
      if (completionTimer) clearTimeout(completionTimer);
      if (errorTimer) clearTimeout(errorTimer);
    };
  }, [hasLoadedInThisSession, criticalEndpoints]);

  return isLoading ? (
    <LoadingScreen companyName={companyName} progress={loadProgress} />
  ) : (
    <>{children}</>
  );
};

export default LoadingProvider;
