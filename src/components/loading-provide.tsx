import { ReactNode, useEffect, useState } from "react";
import LoadingScreen from "./ui/loading-screen";

// Interface for LoadingProvider props
interface LoadingProviderProps {
  children: ReactNode;
  companyName: string;
  criticalEndpoints?: string[];
}

const LoadingProvider = ({
  children,
  companyName,
  criticalEndpoints = [
    "https://api.ctrlbits.xyz/api/testimonials/",
    "https://api.ctrlbits.xyz/api/team/",
    "https://api.ctrlbits.xyz/api/companies/",
    "https://api.ctrlbits.xyz/api/tech/",
    "https://api.ctrlbits.xyz/api/projects/",
  ],
}: LoadingProviderProps) => {
  // Session storage key
  const SESSION_LOAD_KEY = "sessionLoadComplete";

  // Check if already loaded in this session
  const hasLoadedInThisSession =
    typeof window !== "undefined" &&
    sessionStorage.getItem(SESSION_LOAD_KEY) === "true";

  const [isLoading, setIsLoading] = useState(!hasLoadedInThisSession);

  useEffect(() => {
    if (hasLoadedInThisSession) return;

    const loadAllEndpoints = async () => {
      try {
        // Fetch all endpoints in parallel
        await Promise.all(
          criticalEndpoints.map((url) =>
            fetch(url).then((response) => {
              if (!response.ok) {
                throw new Error(`Failed to fetch ${url}`);
              }
              return response.json();
            })
          )
        );

        // Mark as loaded in this session
        sessionStorage.setItem(SESSION_LOAD_KEY, "true");
        setIsLoading(false);
      } catch (error) {
        console.error("Error loading critical endpoints:", error);
        // Continue anyway after a short delay
        setTimeout(() => {
          sessionStorage.setItem(SESSION_LOAD_KEY, "true");
          setIsLoading(false);
        }, 2000);
      }
    };

    loadAllEndpoints();

    // Safety timeout (10 seconds max)
    const safetyTimeout = setTimeout(() => {
      sessionStorage.setItem(SESSION_LOAD_KEY, "true");
      setIsLoading(false);
    }, 10000);

    return () => clearTimeout(safetyTimeout);
  }, [hasLoadedInThisSession, criticalEndpoints]);

  // Show loading screen or render children
  return isLoading ? (
    <LoadingScreen companyName={companyName} />
  ) : (
    <>{children}</>
  );
};

export default LoadingProvider;
