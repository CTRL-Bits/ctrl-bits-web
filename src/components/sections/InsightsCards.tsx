import { useEffect, useMemo, useState } from "react";
import { ArrowUpRight, CalendarDays, Eye, MessageCircle } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import EmptyState from "@/components/shared/EmptyState";
import ErrorState from "@/components/shared/ErrorState";
import LoadingState from "@/components/shared/LoadingState";
import SectionHeader from "@/components/shared/SectionHeader";
import { fetchInsights } from "@/services/insightsService";
import {
  fallbackPublishedPosts,
  getBlogPostUrl,
} from "@/services/blogService";
import type { Insight } from "@/types/insight";

function getCategoryName(post: Insight): string {
  if (!post.category) return "Expert View";
  return typeof post.category === "string" ? post.category : post.category.name || "Expert View";
}

function getAuthorName(post: Insight): string {
  if (!post.author) return "Ctrl Bits";
  return `${post.author.first_name || ""} ${post.author.last_name || ""}`.trim() || post.author.username || "Ctrl Bits";
}

function formatDate(value?: string): string {
  if (!value) return "Latest";
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value));
}

export default function InsightsCards({ preview = false }: { preview?: boolean }) {
  const [posts, setPosts] = useState<Insight[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState("All");
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const controller = new AbortController();

    fetchInsights(controller.signal)
      .then((data) => {
        setPosts(data.length > 0 ? data : fallbackPublishedPosts);
        setError(null);
      })
      .catch(() => {
        if (!controller.signal.aborted) {
          setPosts(fallbackPublishedPosts);
          setError(null);
        }
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });

    return () => controller.abort();
  }, []);

  const categories = useMemo(
    () => ["All", ...Array.from(new Set(posts.map(getCategoryName)))],
    [posts],
  );

  const visiblePosts = useMemo(
    () =>
      posts
        .filter((post) => activeCategory === "All" || getCategoryName(post) === activeCategory)
        .slice(0, preview ? 3 : posts.length),
    [activeCategory, posts, preview],
  );

  return (
    <section className="bg-[#f5f5f5] px-4 py-20 md:px-8 md:py-28">
      <div className="mx-auto max-w-[88rem]">
        <div className="mb-10 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <SectionHeader
            eyebrow="Insights"
            title="Expert views from the Ctrl Bits desk"
            description="Fresh thinking from the Ctrl Bits blog on web development, software delivery, automation, SEO, digital strategy, and product decisions for Nepal and global teams."
          />
          {!preview && categories.length > 1 && (
            <div className="flex max-w-xl flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => setActiveCategory(category)}
                  className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                    activeCategory === category
                      ? "bg-[#0058fc] text-white"
                      : "bg-white text-neutral-600 hover:text-[#0058fc]"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          )}
        </div>

        {loading ? (
          <LoadingState label="Loading expert views" count={3} />
        ) : error ? (
          <ErrorState message={error} />
        ) : visiblePosts.length === 0 ? (
          <EmptyState message="Expert views will be updated soon." />
        ) : (
          <motion.div
            className="grid gap-4 md:grid-cols-3"
            initial={shouldReduceMotion ? false : "hidden"}
            whileInView={shouldReduceMotion ? undefined : "visible"}
            viewport={{ once: true, margin: "-80px" }}
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.08,
                },
              },
            }}
          >
            {visiblePosts.map((post) => (
              <motion.a
                key={post.id || post.slug}
                href={getBlogPostUrl(post)}
                target="_blank"
                rel="noopener noreferrer"
                className="group overflow-hidden rounded-[2rem] bg-white outline-none transition-shadow focus-visible:ring-2 focus-visible:ring-[#0058fc]"
                variants={{
                  hidden: { opacity: 0, y: 22 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.48, ease: [0.22, 1, 0.36, 1] },
                  },
                }}
                whileHover={
                  shouldReduceMotion
                    ? undefined
                    : {
                        y: -6,
                        transition: { duration: 0.22, ease: "easeOut" },
                      }
                }
              >
                <div className="aspect-[1.45] overflow-hidden bg-neutral-100">
                  {post.featured_image || post.image ? (
                    <img
                      src={post.featured_image || post.image}
                      alt={post.title || "Ctrl Bits expert view"}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                      loading="lazy"
                    />
                  ) : (
                    <div className="h-full bg-[linear-gradient(135deg,#0058fc,#111827)]" />
                  )}
                </div>
                <div className="p-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#0058fc]">
                    {getCategoryName(post)}
                  </p>
                  <h3 className="mt-5 text-2xl font-semibold tracking-[-0.05em] text-neutral-950">
                    {post.title}
                  </h3>
                  <p className="mt-4 line-clamp-4 text-sm leading-6 text-neutral-600">
                    {post.excerpt}
                  </p>
                  <div className="mt-6 flex flex-wrap items-center gap-4 text-xs text-neutral-500">
                    <span>{getAuthorName(post)}</span>
                    <span className="inline-flex items-center gap-1">
                      <CalendarDays className="h-3.5 w-3.5" aria-hidden="true" />
                      {formatDate(post.published_at || post.created_at)}
                    </span>
                    {typeof post.views === "number" && (
                      <span className="inline-flex items-center gap-1">
                        <Eye className="h-3.5 w-3.5" aria-hidden="true" />
                        {post.views}
                      </span>
                    )}
                    {typeof post.comments_count === "number" && (
                      <span className="inline-flex items-center gap-1">
                        <MessageCircle className="h-3.5 w-3.5" aria-hidden="true" />
                        {post.comments_count}
                      </span>
                    )}
                  </div>
                  <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#0058fc]">
                    Read on BitsBlog
                    <ArrowUpRight
                      className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      aria-hidden="true"
                    />
                  </span>
                </div>
              </motion.a>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}
