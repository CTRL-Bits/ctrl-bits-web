import { useEffect, useState } from "react";
import { SkiperProgressNumber } from "./skiper-ui/skiper37";

interface LoadingScreenProps {
  companyName?: string;
  progress?: number;
}

const loadingStops = [
  { value: 0, label: "Start" },
  { value: 25, label: "Assets" },
  { value: 50, label: "Data" },
  { value: 75, label: "Build" },
  { value: 100, label: "Ready" },
];

const clampProgress = (value: number) => Math.min(100, Math.max(0, value));

const RollingPercentage = ({ value }: { value: number }) => {
  return (
    <div className="absolute bottom-5 right-4 flex min-w-[2.4em] justify-end font-semibold leading-none tracking-normal text-7xl text-white sm:right-8 sm:text-8xl md:text-9xl">
      <SkiperProgressNumber value={value} suffix="%" className="tabular-nums" />
    </div>
  );
};

const LoadingScreen = ({
  companyName = "Ctrl Bits",
  progress,
}: LoadingScreenProps) => {
  const [displayProgress, setDisplayProgress] = useState(progress ?? 0);
  const [targetProgress, setTargetProgress] = useState(progress ?? 0);

  const boundedProgress = clampProgress(displayProgress);
  const roundedProgress = Math.round(boundedProgress);
  const activeStage =
    [...loadingStops].reverse().find((stop) => boundedProgress >= stop.value)
      ?.label ?? loadingStops[0].label;

  useEffect(() => {
    if (typeof progress === "number") {
      setTargetProgress(clampProgress(progress));
      return;
    }

    const interval = setInterval(() => {
      setTargetProgress((current) => {
        if (current >= 99) return 8;
        return Math.min(99, current + Math.max(1, Math.round((100 - current) * 0.08)));
      });
    }, 220);

    return () => clearInterval(interval);
  }, [progress]);

  useEffect(() => {
    let animationFrame: number;

    const animate = () => {
      setDisplayProgress((current) => {
        const distance = targetProgress - current;

        if (Math.abs(distance) < 0.08) return targetProgress;
        return current + distance * 0.14;
      });

      animationFrame = requestAnimationFrame(animate);
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [targetProgress]);

  return (
    <div
      className="fixed inset-0 z-[9999] flex min-h-screen items-center justify-center overflow-hidden bg-[#05070d] text-white"
      aria-busy={boundedProgress < 100}
      aria-label={`${companyName} loading ${roundedProgress}%`}
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(128deg,#03050b_0%,#071531_32%,#001ea2_67%,#0058fc_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_8%,rgba(0,88,252,0.55),transparent_34%),radial-gradient(circle_at_72%_42%,rgba(54,168,255,0.26),transparent_32%),radial-gradient(circle_at_88%_92%,rgba(255,255,255,0.16),transparent_28%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.08)_0%,transparent_32%,rgba(3,5,11,0.64)_100%)]" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-[#03050b]/88 to-transparent" />
      </div>

      <div className="relative z-10 flex min-h-[calc(100vh-12rem)] w-full max-w-[88rem] items-center justify-center px-6 pb-24 text-center">
        <img
          src="/logo-w.png"
          alt=""
          aria-hidden="true"
          className="absolute left-1/2 top-1/2 w-[min(82vw,48rem)] -translate-x-1/2 -translate-y-1/2 select-none opacity-100 sm:w-[min(58vw,54rem)]"
        />

        <div className="relative mt-[min(44vw,24rem)]">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/50">
            {activeStage}
          </p>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-36 sm:h-40">
        <div className="absolute bottom-0 left-0 h-[3px] w-full bg-white/16" />
        <div
          className="absolute bottom-0 left-0 h-[3px] bg-white transition-[width] duration-500 ease-out"
          style={{ width: `${boundedProgress}%` }}
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={roundedProgress}
        />

        {loadingStops.map((stop) => {
          const isActive = boundedProgress >= stop.value;

          return (
            <div
              key={stop.value}
              className="absolute bottom-0 -translate-x-1/2"
              style={{ left: `${stop.value}%` }}
            >
              <div
                className={`h-5 w-px transition-colors duration-500 ${
                  isActive ? "bg-white" : "bg-white/25"
                }`}
              />
              <div
                className={`absolute -top-8 left-1/2 hidden -translate-x-1/2 whitespace-nowrap text-[10px] uppercase tracking-normal transition-colors duration-500 sm:block ${
                  isActive ? "text-white" : "text-white/38"
                }`}
              >
                {stop.label}
              </div>
            </div>
          );
        })}

        <div className="absolute bottom-6 left-4 text-xs uppercase tracking-normal text-white/48 sm:left-8">
          Loading interface
        </div>
        <RollingPercentage value={roundedProgress} />
      </div>

      <style>{`
        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </div>
  );
};

export default LoadingScreen;
