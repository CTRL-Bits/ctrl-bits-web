import { useEffect, useState } from "react";

interface LoadingScreenProps {
  companyName: string;
}

const LoadingScreen = ({ companyName }: LoadingScreenProps) => {
  const [progress, setProgress] = useState(0);

  // Simple progress animation
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        // Gradually slow down as we approach 90%
        if (prev < 90) {
          return Math.min(90, prev + Math.max(1, 5 * (1 - prev / 100)));
        }
        return prev;
      });
    }, 200);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen ">
      <div className="w-full max-w-sm px-4">
        {/* Logo */}
        <div className="mb-8 flex justify-center">
          <img src="/logo.png" alt={companyName} className="h-12 w-auto" />
        </div>

        {/* Progress bar */}
        <div className="h-1 w-full bg-gray-200 rounded-full mb-3">
          <div
            className="h-full bg-blue-500 rounded-full transition-all duration-200"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Company name and loading indicator */}
        <div className="flex items-center justify-between text-sm text-gray-600">
          <span className="font-medium">{companyName}</span>
          <div className="flex items-center space-x-1">
            <span>Loading</span>
            <span className="flex space-x-1 ml-1">
              <span className="w-1 h-1 bg-blue-500 rounded-full animate-pulse"></span>
              <span className="w-1 h-1 bg-blue-500 rounded-full animate-pulse delay-100"></span>
              <span className="w-1 h-1 bg-blue-500 rounded-full animate-pulse delay-200"></span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
