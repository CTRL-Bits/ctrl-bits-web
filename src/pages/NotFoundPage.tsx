import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Home } from "lucide-react";
import { usePageMetadata } from "@/hooks/usePageMetadata";

export default function NotFoundPage() {
  usePageMetadata({
    title: "404 - Page Not Found",
    description:
      "The page you're looking for doesn't exist. Return to CtrlBits home page.",
    keywords: "404, not found, error page",
    ogTitle: "404 - Page Not Found | CtrlBits",
    ogDescription: "The page you're looking for doesn't exist.",
  });

  const navigate = useNavigate();

  return (
    <>
      <main className="relative flex flex-col justify-center items-center overflow-hidden bg-background transition-all duration-700 ease-out min-h-[calc(100vh-200px)]">
        <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 flex flex-col items-center justify-center text-center">
          {/* Animated 404 Text */}
          <div className="mb-8 relative">
            <div className="text-9xl sm:text-[150px] font-bold bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 bg-clip-text text-transparent animate-pulse">
              404
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 opacity-20 blur-3xl -z-10"></div>
          </div>

          {/* Error Message */}
          <div className="mb-8 space-y-4">
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground">
              Page Not Found
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
              Oops! We couldn't find the page you were looking for. It might
              have been moved or deleted.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-12">
            <Button
              size="lg"
              onClick={() => navigate(-1)}
              variant="outline"
              className="group"
            >
              <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
              Go Back
            </Button>
            <Button
              size="lg"
              onClick={() => navigate("/")}
              className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700"
            >
              <Home className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </div>

          {/* Helpful Links */}
          <div className="mt-16 pt-12 border-t border-border">
            <p className="text-sm text-muted-foreground mb-6">
              Quick Navigation
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl mx-auto">
              <button
                onClick={() => navigate("/")}
                className="p-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors text-sm font-medium text-foreground"
              >
                Home
              </button>
              <button
                onClick={() => navigate("/solutions")}
                className="p-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors text-sm font-medium text-foreground"
              >
                Solutions
              </button>
              <button
                onClick={() => navigate("/portfolio")}
                className="p-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors text-sm font-medium text-foreground"
              >
                Portfolio
              </button>
              <button
                onClick={() => navigate("/about")}
                className="p-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors text-sm font-medium text-foreground"
              >
                About
              </button>
              <button
                onClick={() => navigate("/contact")}
                className="p-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors text-sm font-medium text-foreground"
              >
                Contact
              </button>
              <button
                onClick={() => navigate("/projects")}
                className="p-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors text-sm font-medium text-foreground"
              >
                Projects
              </button>
              <button
                onClick={() => navigate("/terms")}
                className="p-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors text-sm font-medium text-foreground"
              >
                Terms
              </button>
              <button
                onClick={() => navigate("/privacy")}
                className="p-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors text-sm font-medium text-foreground"
              >
                Privacy
              </button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
