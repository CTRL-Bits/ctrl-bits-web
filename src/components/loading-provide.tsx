import { ReactNode, useEffect, useState } from "react";
import LoadingScreen from "./ui/loading-screen";

interface ILoadingProvider {
  children: ReactNode;
  companyName: string;
  criticalEndpoints?: string[];
}

// Default critical API endpoints
const DEFAULT_CRITICAL_ENDPOINTS = [
  "https://api.ctrlbits.xyz/api/testimonials/",
  "https://api.ctrlbits.xyz/api/team/",
  "https://api.ctrlbits.xyz/api/companies/",
  "https://api.ctrlbits.xyz/api/tech/",
  "https://api.ctrlbits.xyz/api/projects/",
];
//using session storage
const SESSION_LOAD_KEY = "sessionLoadComplete";

const LoadingProvider: React.FC<ILoadingProvider> = ({
  children,
  companyName,
  criticalEndpoints,
}) => {
  const endpointsToLoad = criticalEndpoints || DEFAULT_CRITICAL_ENDPOINTS;

  //checkin session storage
  const hasLoadedInThisSession =
    typeof window !== "undefined" &&
    sessionStorage.getItem(SESSION_LOAD_KEY) === "true";

  const [isLoading, setIsLoading] = useState(!hasLoadedInThisSession);

  useEffect(() => {
    if (hasLoadedInThisSession) {
      return;
    }

    console.log("Loading endpoints for this session");

    const loadAllEndpoints = async () => {
      try {
        // Fetch all endpoints in parallel
        await Promise.all(
          endpointsToLoad.map((url) =>
            fetch(url).then((response) => {
              console.log(`Endpoint ${url} status: ${response.status}`);
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

        setTimeout(() => {
          sessionStorage.setItem(SESSION_LOAD_KEY, "true");
          setIsLoading(false);
        }, 2000);
      }
    };

    loadAllEndpoints();

    // Safety timeout
    const safetyTimeout = setTimeout(() => {
      console.log("Safety timeout reached, skipping loading");
      sessionStorage.setItem(SESSION_LOAD_KEY, "true");
      setIsLoading(false);
    }, 10000);

    return () => clearTimeout(safetyTimeout);
  }, [hasLoadedInThisSession, endpointsToLoad]);

  //loading
  if (isLoading) {
    return <LoadingScreen companyName={companyName} />;
  }

  // Once loaded, show the app
  return <>{children}</>;
};

export default LoadingProvider;
