import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ArrowUpRight,
  BriefcaseBusiness,
  Home,
  MessageCircle,
  Search,
  Sparkles,
} from "lucide-react";
import { usePageMetadata } from "@/hooks/usePageMetadata";

const routes = [
  {
    label: "Home",
    description: "Return to the homepage",
    to: "/",
    icon: Home,
  },
  {
    label: "Portfolio",
    description: "Browse case studies",
    to: "/portfolio",
    icon: BriefcaseBusiness,
  },
  {
    label: "Solutions",
    description: "See services and systems",
    to: "/solutions",
    icon: Sparkles,
  },
  {
    label: "Contact",
    description: "Start a project inquiry",
    to: "/contact",
    icon: MessageCircle,
  },
];

export default function NotFoundPage() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  usePageMetadata({
    title: "Page Not Found | Ctrl Bits",
    description:
      "The page you're looking for doesn't exist. Return to Ctrl Bits home page.",
    keywords: "404, not found, error page",
    ogTitle: "Page Not Found | Ctrl Bits",
    ogDescription: "The page you're looking for doesn't exist.",
    canonical: "https://www.ctrlbits.com/404",
    twitterCard: "summary",
    indexable: false,
  });

  const filteredRoutes = useMemo(() => {
    const term = query.trim().toLowerCase();
    if (!term) return routes;

    return routes.filter(
      (route) =>
        route.label.toLowerCase().includes(term) ||
        route.description.toLowerCase().includes(term),
    );
  }, [query]);

  return (
    <main className="min-h-[calc(100vh-5rem)] bg-white px-4 py-24 text-neutral-950 md:px-8">
      <section className="mx-auto flex min-h-[calc(100vh-13rem)] max-w-5xl flex-col justify-center">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="mb-10 inline-flex w-fit items-center gap-2 text-sm font-semibold text-neutral-500 transition-colors hover:text-neutral-950"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Go back
        </button>

        <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#0058fc]">
              404
            </p>
            <h1 className="mt-5 max-w-2xl text-6xl font-semibold leading-[0.9] tracking-[-0.085em] md:text-8xl">
              Page not found.
            </h1>
            <p className="mt-6 max-w-xl text-base leading-8 text-neutral-600">
              The page may have moved or the URL may be incorrect. Use one of
              the routes below to get back on track.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/"
                className="inline-flex items-center gap-2 rounded-full bg-neutral-950 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-neutral-800"
              >
                Go home
                <Home className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link
                to="/portfolio"
                className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-5 py-3 text-sm font-semibold text-neutral-800 transition-colors hover:border-neutral-300 hover:bg-neutral-50"
              >
                View work
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </div>

          <div className="rounded-[1.5rem] border border-neutral-200 bg-[#f7f7f7] p-3">
            <div className="rounded-[1.1rem] bg-white p-4">
              <div className="flex items-center gap-3 border-b border-neutral-100 pb-4">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-neutral-100 text-neutral-500">
                  <Search className="h-4 w-4" aria-hidden="true" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-neutral-400">
                    Quick routes
                  </p>
                  <input
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder="Search"
                    className="mt-1 w-full bg-transparent text-lg font-semibold tracking-[-0.035em] text-neutral-950 outline-none placeholder:text-neutral-300"
                    autoComplete="off"
                  />
                </div>
              </div>

              <div className="mt-3 space-y-1">
                {filteredRoutes.map((route) => {
                  const Icon = route.icon;

                  return (
                    <Link
                      key={route.to}
                      to={route.to}
                      className="group flex items-center justify-between rounded-2xl p-3 text-neutral-600 transition-colors hover:bg-neutral-50 hover:text-neutral-950"
                    >
                      <span className="flex items-center gap-3">
                        <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-neutral-100 text-neutral-500 group-hover:text-[#0058fc]">
                          <Icon className="h-4 w-4" aria-hidden="true" />
                        </span>
                        <span>
                          <span className="block text-sm font-semibold">
                            {route.label}
                          </span>
                          <span className="mt-0.5 block text-xs text-neutral-400">
                            {route.description}
                          </span>
                        </span>
                      </span>
                      <ArrowUpRight
                        className="h-4 w-4 opacity-0 transition-opacity group-hover:opacity-100"
                        aria-hidden="true"
                      />
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
