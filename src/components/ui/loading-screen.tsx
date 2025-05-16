import { useEffect, useState } from "react";

interface ILoading {
  companyName: string;
}

const LoadingScreen: React.FC<ILoading> = ({ companyName }) => {
  const [progress, setProgress] = useState(0);

  // Animated progress bar
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev < 90) {
          const increment = Math.max(1, 10 * (1 - prev / 100));
          return Math.min(90, prev + increment);
        }
        return prev;
      });
    }, 200);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-500/5 via-indigo-500/5 to-purple-500/5">
      <div className="w-full max-w-md px-8 py-12">
        {/* logo container */}
        <div className="mb-16 flex justify-center">
          <img
            src="/logo.png"
            alt={`${companyName}`}
            className="h-16 w-auto object-contain"
          />
        </div>

        {/* progress bar */}
        <div className="relative h-1 w-full bg-gray-100 rounded-full overflow-hidden mb-6">
          <div
            className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Loading text*/}
        <div className="flex items-center justify-between text-sm text-gray-500">
          <span className="font-medium">{companyName}</span>
          <div className="flex items-center">
            <span className="mr-2 font-medium">Loading</span>
            <span className="relative w-6 h-6">
              <span className="absolute top-0 left-0 w-1.5 h-1.5 bg-indigo-600 rounded-full animate-ping opacity-75"></span>
              <span
                className="absolute top-0 left-3 w-1.5 h-1.5 bg-indigo-600 rounded-full animate-ping opacity-75"
                style={{ animationDelay: "0.2s" }}
              ></span>
              <span
                className="absolute top-0 left-6 w-1.5 h-1.5 bg-indigo-600 rounded-full animate-ping opacity-75"
                style={{ animationDelay: "0.4s" }}
              ></span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
