import { useEffect, useState } from "react";

interface LoadingScreenProps {
  companyName?: string;
}

const LoadingScreen = ({ companyName = "Ctrl Bits" }: LoadingScreenProps) => {
  const [breatheScale, setBreatheScale] = useState(1);
  const [dots, setDots] = useState(0);

  // Gentle breathing animation for the logo
  useEffect(() => {
    const interval = setInterval(() => {
      setBreatheScale(() => {
        const time = Date.now() / 1000;
        return 1 + Math.sin(time * 0.8) * 0.05; // Very subtle scale change
      });
    }, 50);

    return () => clearInterval(interval);
  }, []);

  // Animated dots
  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev + 1) % 4);
    }, 600);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-background via-background to-background/95">
      {/* Subtle ambient elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Gentle floating orbs */}
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-foreground/3 blur-xl"
            style={{
              width: `${60 + i * 20}px`,
              height: `${60 + i * 20}px`,
              left: `${20 + ((i * 15) % 70)}%`,
              top: `${15 + ((i * 25) % 60)}%`,
              animation: `float-${i} ${8 + i * 2}s ease-in-out infinite`,
              animationDelay: `${i * 0.5}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 text-center">
        {/* Main logo with breathing effect */}
        <div className="mb-8">
          <div
            className="w-20 h-20 mx-auto mb-6 rounded-3xl bg-background/90 backdrop-blur-sm shadow-2xl border border-border/50 flex items-center justify-center transition-all duration-100 ease-out overflow-hidden"
            style={{
              transform: `scale(${breatheScale})`,
              boxShadow: `0 8px 32px rgba(0,0,0,0.12), 0 0 0 1px rgba(255,255,255,0.05)`,
            }}
          >
            <img src="/logo.png" alt="CtrlBits' Logo" />

            {/* Subtle inner glow */}
            <div
              className="absolute inset-2 rounded-2xl bg-foreground/5 transition-opacity duration-1000"
              style={{ opacity: 0.3 + Math.sin(Date.now() / 2000) * 0.2 }}
            />
          </div>

          <h1 className="text-2xl font-light text-foreground/90 tracking-wide">
            {companyName}
          </h1>
        </div>

        {/* Elegant loading indicator */}
        <div className="flex items-center justify-center space-x-1">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-2 h-2 rounded-full bg-foreground/40 transition-all duration-300"
              style={{
                opacity: dots > i ? 0.8 : 0.2,
                transform: dots > i ? "scale(1.2)" : "scale(1)",
              }}
            />
          ))}
        </div>
      </div>

      <style>{`
        @keyframes float-0 {
          0%, 100% { transform: translateY(0px) translateX(0px); opacity: 0.4; }
          50% { transform: translateY(-15px) translateX(5px); opacity: 0.8; }
        }
        @keyframes float-1 {
          0%, 100% { transform: translateY(0px) translateX(0px); opacity: 0.3; }
          33% { transform: translateY(-10px) translateX(-8px); opacity: 0.6; }
          66% { transform: translateY(5px) translateX(3px); opacity: 0.5; }
        }
        @keyframes float-2 {
          0%, 100% { transform: translateY(0px) translateX(0px); opacity: 0.5; }
          40% { transform: translateY(-8px) translateX(10px); opacity: 0.7; }
          80% { transform: translateY(3px) translateX(-5px); opacity: 0.4; }
        }
        @keyframes float-3 {
          0%, 100% { transform: translateY(0px) translateX(0px); opacity: 0.2; }
          25% { transform: translateY(-12px) translateX(-3px); opacity: 0.5; }
          75% { transform: translateY(8px) translateX(7px); opacity: 0.6; }
        }
        @keyframes float-4 {
          0%, 100% { transform: translateY(0px) translateX(0px); opacity: 0.6; }
          30% { transform: translateY(-5px) translateX(-12px); opacity: 0.3; }
          70% { transform: translateY(10px) translateX(4px); opacity: 0.8; }
        }
        @keyframes float-5 {
          0%, 100% { transform: translateY(0px) translateX(0px); opacity: 0.3; }
          45% { transform: translateY(-18px) translateX(6px); opacity: 0.7; }
          85% { transform: translateY(6px) translateX(-9px); opacity: 0.4; }
        }
      `}</style>
    </div>
  );
};

export default LoadingScreen;
