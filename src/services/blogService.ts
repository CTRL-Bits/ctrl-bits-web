import axios from "axios";
import type { Insight } from "@/types/insight";

const BLOG_API_URL =
  import.meta.env.VITE_BLOG_API_URL ||
  "https://api-blog.ctrlbits.com/api/posts/";

export const BLOG_SITE_URL =
  import.meta.env.VITE_BLOG_SITE_URL || "https://blog.ctrlbits.com";

type BlogResponse = {
  count?: number;
  next?: string | null;
  previous?: string | null;
  results?: Insight[];
};

export const fallbackPublishedPosts: Insight[] = [
  {
    id: 6,
    title: "Software Development Life Cycle : For 2026 Developers",
    slug: "software-development-life-cycle-for-2026-developers",
    excerpt:
      "Most teams fail because they lack process, not talent. This guide breaks down the Software Development Life Cycle into practical phases for teams that want to ship reliably.",
    featured_image:
      "https://cdn.ctrlbits.com/blog/covers/2026/03/8eabb9d5530a4ce9a16d31365a58bbc4.png",
    category: "Web Development",
    author: {
      first_name: "Abiral",
      last_name: "Ale",
      username: "aviral",
    },
    views: 182,
    comments_count: 0,
    status: "published",
    published_at: "2026-03-30T11:35:10.731225Z",
  },
  {
    id: 4,
    title: "5 Tech Shifts in Feb 2026 That Will Change How You Ship",
    slug: "5-tech-shifts-in-feb-2026-that-will-change-how-you-ship-even-in-nepal",
    excerpt:
      "A practical look at operational tech shifts affecting performance, discoverability, security, compliance, and product delivery for Nepal and global teams.",
    featured_image:
      "https://cdn.ctrlbits.com/blog/covers/2026/02/8f105b2e1d314e57ba7b400953c8dd0b.jpg",
    category: "Technology & Product Strategy",
    author: {
      first_name: "Abiral",
      last_name: "Ale",
      username: "aviral",
    },
    views: 194,
    comments_count: 1,
    status: "published",
    published_at: "2026-02-12T16:22:36.487991Z",
  },
  {
    id: 3,
    title: "Why Most Business Websites in Nepal Fail to Generate Leads",
    slug: "why-most-business-websites-in-nepal-fail-to-generate-leads-and-what-actually-works",
    excerpt:
      "Why traffic alone does not convert, where business websites underperform, and what high-converting websites do differently in Nepal-specific markets.",
    featured_image:
      "https://cdn.ctrlbits.com/blog/covers/2026/02/898340b179104545baf04135cba62b7a.jpg",
    category: "Digital Business in Nepal",
    author: {
      first_name: "Ctrl",
      last_name: "Bits",
      username: "ctrlbits",
    },
    views: 303,
    comments_count: 0,
    status: "published",
    published_at: "2026-02-04T05:01:28.894891Z",
  },
];

function unwrapPosts(payload: BlogResponse | Insight[]): Insight[] {
  if (Array.isArray(payload)) return payload;
  return payload.results || [];
}

export function getBlogPostUrl(post: Insight): string {
  if (post.url) return post.url;
  if (post.link) return post.link;
  return post.slug ? `${BLOG_SITE_URL}/post/${post.slug}` : BLOG_SITE_URL;
}

export async function fetchPublishedPosts(
  signal?: AbortSignal,
): Promise<Insight[]> {
  const response = await axios.get<BlogResponse | Insight[]>(BLOG_API_URL, {
    params: {
      page: 1,
      status: "published",
    },
    signal,
    timeout: 10000,
  });

  return unwrapPosts(response.data);
}
