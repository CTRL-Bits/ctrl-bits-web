import { useRef, useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Users, Zap, BarChart3 } from "lucide-react";
import { BlazingSpeed, Dashboard, Fingerprint, WrapAround } from "./SVG";

// Floating elements component
const FloatingElement = ({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) => (
  <div
    className={`absolute animate-float ${className}`}
    style={{ animationDelay: `${delay}s` }}
  >
    {children}
  </div>
);

export default function FeaturesSection() {
  const containerRef = useRef(null);
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative overflow-hidden bg-gradient-to-b from-muted/30 via-background to-muted/20 py-16 md:py-24 lg:py-32"
    >
      {/* Background elements with parallax */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute -top-32 -left-32 h-64 w-64 rounded-full bg-primary/10 blur-3xl"
          style={{ transform: `translateY(${scrollY * 0.05}px)` }}
        />
        <div
          className="absolute top-1/2 -right-32 h-96 w-96 rounded-full bg-secondary/8 blur-3xl"
          style={{ transform: `translateY(${scrollY * -0.08}px)` }}
        />
        <div
          className="absolute bottom-0 left-1/3 h-48 w-48 rounded-full bg-accent/12 blur-3xl"
          style={{ transform: `translateY(${scrollY * 0.03}px)` }}
        />
      </div>

      {/* Floating decorative elements */}
      <FloatingElement className="top-20 right-20 opacity-20" delay={0}>
        <div className="h-3 w-3 rounded-full bg-primary"></div>
      </FloatingElement>
      <FloatingElement className="top-40 left-10 opacity-30" delay={1}>
        <div className="h-2 w-2 rounded-full bg-secondary"></div>
      </FloatingElement>
      <FloatingElement className="bottom-32 right-1/4 opacity-25" delay={2}>
        <div className="h-4 w-4 rounded-full bg-accent"></div>
      </FloatingElement>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        {/* Enhanced header */}
        <div
          className={`text-center mb-16 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="inline-flex items-center rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary ring-1 ring-primary/20 backdrop-blur-sm mb-6">
            <Zap className="mr-2 h-4 w-4 animate-pulse" />
            Powerful Features
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary via-foreground to-secondary mb-6">
            Our Features
          </h1>

          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Experience the perfect blend of innovation and reliability with our
            <span className="font-medium text-foreground">
              {" "}
              cutting-edge solutions
            </span>
          </p>
        </div>

        {/* Enhanced features grid */}
        <div className="relative">
          <div className="relative z-10 grid grid-cols-6 gap-6">
            {/* Customizable Feature - Enhanced */}
            <Card
              className={`relative col-span-full lg:col-span-2 overflow-hidden group hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 border-primary/20 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: "100ms" }}
            >
              <CardContent className="relative p-8 h-full flex flex-col justify-center">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                <div className="relative flex h-24 w-full items-center justify-center mb-6">
                  <WrapAround />
                  <span className="relative z-10 text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                    100%
                  </span>
                </div>

                <h2 className="text-center text-3xl font-bold mb-3 group-hover:text-primary transition-colors">
                  Customizable
                </h2>

                <p className="text-center text-muted-foreground text-sm leading-relaxed">
                  Tailor every aspect to your unique needs with our flexible
                  architecture
                </p>
              </CardContent>
            </Card>

            {/* Secure Feature - Enhanced */}
            <Card
              className={`relative col-span-full sm:col-span-3 lg:col-span-2 overflow-hidden group hover:shadow-2xl hover:shadow-secondary/10 transition-all duration-500 border-secondary/20 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: "200ms" }}
            >
              <CardContent className="p-8 h-full flex flex-col">
                <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                <div className="relative mx-auto flex aspect-square size-20 rounded-full border-2 border-secondary/30 mb-6 group-hover:border-secondary/60 transition-colors duration-300 before:absolute before:-inset-3 before:rounded-full before:border before:border-secondary/10 group-hover:before:border-secondary/20 before:transition-colors before:duration-300">
                  <Fingerprint />
                </div>

                <div className="relative z-10 flex-1 flex flex-col justify-center text-center">
                  <h2 className="text-2xl font-bold mb-3  transition-colors">
                    Secure
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    Your data, secured with cutting-edge encryption — trust
                    CtrlBits for peace of mind.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Fast Feature - Enhanced */}
            <Card
              className={`relative col-span-full sm:col-span-3 lg:col-span-2 overflow-hidden group hover:shadow-2xl hover:shadow-accent/10 transition-all duration-500 border-accent/20 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: "300ms" }}
            >
              <CardContent className="p-8 h-full flex flex-col">
                <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                <div className="relative mb-8">
                  <BlazingSpeed />
                </div>

                <div className="relative z-10 flex-1 flex flex-col justify-center text-center">
                  <h2 className="text-2xl font-bold mb-3 transition-colors">
                    Lightning Fast
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    Blazing speed, zero compromise — CtrlBits keeps you moving
                    forward.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Dashboard Feature - Enhanced */}
            <Card
              className={`relative col-span-full lg:col-span-3 overflow-hidden group hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 border-primary/20 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: "400ms" }}
            >
              <CardContent className="grid h-full p-8 sm:grid-cols-2 gap-6">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                <div className="relative z-10 flex flex-col justify-between space-y-6">
                  <div className="relative flex aspect-square size-16 rounded-full border-2 border-primary/30 group-hover:border-primary/60 transition-colors duration-300 before:absolute before:-inset-3 before:rounded-full before:border before:border-primary/10 group-hover:before:border-primary/20 before:transition-colors before:duration-300">
                    <BarChart3 className="m-auto size-8 text-primary" />
                  </div>

                  <div className="space-y-3">
                    <h2 className="text-2xl font-bold text-zinc-800 dark:text-white group-hover:text-primary transition-colors">
                      Dashboard / Analytics
                    </h2>
                    <p className="text-muted-foreground leading-relaxed">
                      Real-time insights that drive smarter decisions — powered
                      by CtrlBits intelligence.
                    </p>
                  </div>
                </div>

                <div className="relative -mb-8 -mr-8 mt-6 h-fit rounded-tl-2xl border-l-2 border-t-2 border-primary/20 bg-gradient-to-br from-background/80 to-muted/40 p-6 py-8 backdrop-blur-sm sm:ml-6 group-hover:border-primary/40 transition-colors duration-300">
                  <div className="absolute left-4 top-3 flex gap-1.5">
                    <span className="block size-2.5 rounded-full bg-red-400/60 border"></span>
                    <span className="block size-2.5 rounded-full bg-yellow-400/60 border"></span>
                    <span className="block size-2.5 rounded-full bg-green-400/60 border"></span>
                  </div>
                  <Dashboard />
                </div>
              </CardContent>
            </Card>

            {/* Support Feature - Enhanced */}
            <Card
              className={`relative col-span-full lg:col-span-3 overflow-hidden group hover:shadow-2xl hover:shadow-secondary/10 transition-all duration-500 border-secondary/20 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: "500ms" }}
            >
              <CardContent className="grid h-full p-8 sm:grid-cols-2 gap-6">
                <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                <div className="relative z-10 flex flex-col justify-between space-y-6">
                  <div className="relative flex aspect-square size-16 rounded-full border-2 border-secondary/30 group-hover:border-secondary/60 transition-colors duration-300 before:absolute before:-inset-3 before:rounded-full before:border before:border-secondary/10 group-hover:before:border-secondary/20 before:transition-colors before:duration-300">
                    <Users className="m-auto size-8 text-secondary" />
                  </div>

                  <div className="space-y-3">
                    <h2 className="text-2xl font-bold  transition-colors">
                      Realtime Support
                    </h2>
                    <p className="text-muted-foreground leading-relaxed">
                      Instant support, whenever you need it — because your
                      uptime is our priority.
                    </p>
                  </div>
                </div>

                <div className="relative before:bg-gradient-to-b before:from-secondary/20 before:to-transparent before:absolute before:inset-0 before:mx-auto before:w-px sm:-my-8 sm:-mr-8">
                  <div className="relative flex h-full flex-col justify-center space-y-4 py-8 bg-gradient-to-br from-background/80 to-muted/20 rounded-2xl p-6 backdrop-blur-sm">
                    {[
                      {
                        name: "Aviral",
                        avatar:
                          "https://avatars.githubusercontent.com/u/121365480?v=4",
                        side: "right",
                      },
                      {
                        name: "Ritesh",
                        avatar:
                          "https://avatars.githubusercontent.com/u/138800649?v=4",
                        side: "left",
                      },
                      {
                        name: "Aadarsha",
                        avatar:
                          "https://avatars.githubusercontent.com/u/145144811?v=4",
                        side: "right",
                      },
                      {
                        name: "Gaurav",
                        avatar:
                          "https://avatars.githubusercontent.com/u/138800995?v=4",
                        side: "left",
                      },
                      {
                        name: "Meriyan",
                        avatar:
                          "https://avatars.githubusercontent.com/u/165222299?v=4",
                        side: "right",
                      },
                    ].map((person, i) => (
                      <div
                        key={person.name}
                        className={`relative flex items-center gap-3 ${
                          person.side === "right"
                            ? "justify-end"
                            : "justify-start"
                        } transition-all duration-300 hover:scale-105`}
                        style={{ animationDelay: `${i * 0.1}s` }}
                      >
                        {person.side === "right" && (
                          <span className="block h-fit rounded-xl bg-primary/10 border border-primary/20 px-3 py-2 text-xs font-medium shadow-sm backdrop-blur-sm">
                            {person.name}
                          </span>
                        )}
                        <div className="ring-background size-8 ring-2 ring-primary/20 rounded-full overflow-hidden group-hover:ring-primary/40 transition-all">
                          <img
                            className="size-full object-cover"
                            src={person.avatar}
                            alt={person.name}
                          />
                        </div>
                        {person.side === "left" && (
                          <span className="block h-fit rounded-xl bg-secondary/10 border border-secondary/20 px-3 py-2 text-xs font-medium shadow-sm backdrop-blur-sm">
                            {person.name}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Enhanced floating animations */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-8px) rotate(1deg); }
          66% { transform: translateY(-4px) rotate(-1deg); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}
