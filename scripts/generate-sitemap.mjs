import { writeFile } from "node:fs/promises";

const SITE_URL = process.env.SITE_URL || "https://www.ctrlbits.com";
const API_BASE_URL =
  process.env.API_BASE_URL ||
  process.env.VITE_API_BASE_URL ||
  "https://api.ctrlbits.com/api";

const today = new Date().toISOString().split("T")[0];
const outputPath = new URL("../public/sitemap.xml", import.meta.url);

const staticRoutes = [
  { path: "/", changefreq: "weekly", priority: "1.0" },
  { path: "/solutions", changefreq: "weekly", priority: "0.9" },
  { path: "/about", changefreq: "monthly", priority: "0.8" },
  { path: "/portfolio", changefreq: "weekly", priority: "0.8" },
  { path: "/contact", changefreq: "monthly", priority: "0.7" },
  { path: "/privacy", changefreq: "yearly", priority: "0.3" },
  { path: "/terms", changefreq: "yearly", priority: "0.3" },
];

function escapeXml(value) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function routeXml(loc, changefreq, priority) {
  return `  <url>\n    <loc>${escapeXml(loc)}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>${changefreq}</changefreq>\n    <priority>${priority}</priority>\n  </url>`;
}

function resolveNextUrl(next) {
  if (!next) return null;
  if (next.startsWith("http://") || next.startsWith("https://")) return next;

  const normalizedBase = API_BASE_URL.endsWith("/")
    ? API_BASE_URL
    : `${API_BASE_URL}/`;
  return new URL(next.replace(/^\//, ""), normalizedBase).toString();
}

async function fetchProjectSlugs() {
  const slugs = new Set();
  let next = `${API_BASE_URL.replace(/\/$/, "")}/projects/?limit=100`;

  while (next) {
    const response = await fetch(next);

    if (!response.ok) {
      throw new Error(`Failed to fetch projects for sitemap: ${response.status}`);
    }

    const payload = await response.json();
    const results = Array.isArray(payload) ? payload : payload.results || [];

    for (const project of results) {
      if (project?.slug && typeof project.slug === "string") {
        slugs.add(project.slug);
      }
    }

    next = resolveNextUrl(Array.isArray(payload) ? null : payload?.links?.next);
  }

  return Array.from(slugs);
}

async function generateSitemap() {
  const staticEntries = staticRoutes.map((route) =>
    routeXml(`${SITE_URL}${route.path}`, route.changefreq, route.priority),
  );

  const projectSlugs = await fetchProjectSlugs();
  const projectEntries = projectSlugs.map((slug) =>
    routeXml(`${SITE_URL}/projects/${slug}`, "monthly", "0.6"),
  );

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${[...staticEntries, ...projectEntries].join("\n")}\n</urlset>\n`;

  await writeFile(outputPath, xml, "utf8");
  console.log(`Sitemap generated with ${staticEntries.length + projectEntries.length} URLs.`);
}

generateSitemap().catch((error) => {
  console.error(error.message || error);
  process.exit(1);
});
