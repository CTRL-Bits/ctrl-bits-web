import { useEffect, useState } from "react";
import { Sparkles, Zap, Code } from "lucide-react";

interface LoadingScreenProps {
  companyName: string;
}

const LoadingScreen = ({ companyName }: LoadingScreenProps) => {
  const [progress, setProgress] = useState(0);
  const [currentIcon, setCurrentIcon] = useState(0);
  const icons = [<Sparkles />, <Zap />, <Code />];

  // Progress animation
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        // Gradually slow down as we approach 90%
        if (prev < 90) {
          return Math.min(90, prev + Math.max(1, 5 * (1 - prev / 100)));
        }
        return prev;
      });
    }, 100);

    // Simulate complete loading
    const finalTimer = setTimeout(() => {
      setProgress(100);
    }, 1800);

    return () => {
      clearInterval(interval);
      clearTimeout(finalTimer);
    };
  }, []);

  // Icon rotation animation
  useEffect(() => {
    const iconInterval = setInterval(() => {
      setCurrentIcon((prev) => (prev + 1) % icons.length);
    }, 800);

    return () => clearInterval(iconInterval);
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-background via-background to-background/90 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0">
        <div className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute bottom-24 right-24 h-64 w-64 rounded-full bg-secondary/10 blur-3xl" />
      </div>

      {/* Simple particles */}
      <div className="absolute inset-0">
        {Array.from({ length: 20 }).map((_, i) => {
          const size = Math.random() * 3 + 1;
          const left = `${Math.random() * 100}%`;
          const top = `${Math.random() * 100}%`;
          const opacity = Math.random() * 0.4;

          return (
            <div
              key={i}
              className="absolute rounded-full bg-primary/30"
              style={{
                width: `${size}px`,
                height: `${size}px`,
                left,
                top,
                opacity,
                animation: `pulse ${
                  Math.random() * 3 + 2
                }s infinite ease-in-out`,
              }}
            />
          );
        })}
      </div>

      <div className="w-full max-w-md px-8 relative z-10">
        {/* Logo and icon container */}
        <div className="mb-10 flex flex-col items-center">
          <div className="mb-6 relative">
            <div className="h-20 w-20 flex items-center justify-center rounded-full bg-background/80 backdrop-blur-md shadow-xl ring-1 ring-primary/20">
              <img src="/logo.png" alt={companyName} className="h-12 w-auto" />
            </div>

            {/* Rotating orbital icon */}
            <div
              className="absolute top-0 left-0 w-full h-full animate-spin-slow"
              style={{ animationDuration: "8s" }}
            >
              <div className="absolute -right-2 top-8 h-8 w-8 flex items-center justify-center rounded-full bg-primary/10 backdrop-blur-md shadow-lg ring-1 ring-primary/20">
                <div className="text-primary h-4 w-4">{icons[currentIcon]}</div>
              </div>
            </div>
          </div>

          <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary via-foreground to-secondary">
            {companyName}
          </h1>
        </div>

        {/* Progress bar */}
        <div className="h-1.5 w-full bg-muted/50 rounded-full mb-4 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-primary to-secondary rounded-full transition-all duration-200"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Status text */}
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span className="font-medium">Initializing Experience</span>
          <div className="flex items-center space-x-1">
            <span>{Math.round(progress)}%</span>
          </div>
        </div>

        {/* Animated dots */}
        <div className="flex justify-center mt-6">
          <div className="flex space-x-2">
            <span
              className="w-2 h-2 bg-primary/60 rounded-full animate-bounce"
              style={{ animationDelay: "0ms" }}
            ></span>
            <span
              className="w-2 h-2 bg-primary/60 rounded-full animate-bounce"
              style={{ animationDelay: "150ms" }}
            ></span>
            <span
              className="w-2 h-2 bg-primary/60 rounded-full animate-bounce"
              style={{ animationDelay: "300ms" }}
            ></span>
          </div>
        </div>
      </div>

      {/* Keyframe animation for pulse effect */}
      <style>{`
        @keyframes pulse {
          0%,
          100% {
            transform: scale(1);
            opacity: 0.3;
          }
          50% {
            transform: scale(1.5);
            opacity: 0.6;
          }
        }

        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default LoadingScreen;
