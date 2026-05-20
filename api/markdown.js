const SITE_URL = "https://www.ctrlbits.com";

const SERVICES = [
  [
    "Web Development",
    "Business websites, landing pages, CMS builds, ecommerce websites, and SEO-ready site architecture.",
  ],
  [
    "App Development",
    "Web applications, mobile applications, secure APIs, user flows, dashboards, and startup product builds.",
  ],
  [
    "Custom Software",
    "Internal tools, client portals, admin dashboards, workflow systems, and integration-heavy business applications.",
  ],
  [
    "UI/UX Design",
    "User research, wireframes, interface design, design systems, product flows, and usability improvements.",
  ],
  [
    "Creative Services",
    "Video production, graphic design, branding, animation, and illustration.",
  ],
  [
    "Digital Marketing",
    "SEO, local SEO, content strategy, paid advertising, and conversion-focused growth campaigns.",
  ],
];

const navigation = `## Key Pages
- [Home](${SITE_URL}/)
- [Solutions](${SITE_URL}/solutions)
- [About](${SITE_URL}/about)
- [Portfolio](${SITE_URL}/portfolio)
- [Contact](${SITE_URL}/contact)
- [Privacy](${SITE_URL}/privacy)
- [Terms](${SITE_URL}/terms)
- [API catalog](${SITE_URL}/.well-known/api-catalog)
- [LLM summary](${SITE_URL}/llm.txt)`;

const contact = `## Contact
- Email: hi@ctrlbits.com
- Phone: +977-9709659012
- Location: Kathmandu, Nepal
- Project inquiries: ${SITE_URL}/contact
- Facebook: https://www.facebook.com/ctrlbits
- Instagram: https://www.instagram.com/ctrl.bits/
- LinkedIn: https://www.linkedin.com/company/ctrlbits
- X: https://x.com/ctrl_bits`;

function frontmatter({ title, description, canonical }) {
  return `---
title: ${title}
description: ${description}
canonical: ${canonical}
---
`;
}

function servicesMarkdown() {
  return SERVICES.map(([title, description]) => `### ${title}\n${description}`).join("\n\n");
}

function page(title, description, canonical, body) {
  return `${frontmatter({ title, description, canonical })}
# ${title}

${description}

${body}

${navigation}

${contact}
`;
}

const pages = new Map([
  [
    "/",
    page(
      "Ctrl Bits - Web Development and Digital Marketing in Nepal",
      "Ctrl Bits is a Kathmandu-based digital agency for web development, app development, custom software, UI/UX design, creative services, and digital marketing.",
      `${SITE_URL}/`,
      `## What Ctrl Bits Does
We build clear, fast, search-friendly digital experiences for businesses that need practical delivery and measurable outcomes.

## Core Services
${servicesMarkdown()}

## Service Area
Ctrl Bits serves businesses in Kathmandu Valley, across Nepal, and remote international clients.

## Useful Agent Resources
- API catalog: ${SITE_URL}/.well-known/api-catalog
- Sitemap: ${SITE_URL}/sitemap.xml
- Robots policy: ${SITE_URL}/robots.txt
- Machine-readable company summary: ${SITE_URL}/llm.txt`,
    ),
  ],
  [
    "/solutions",
    page(
      "Ctrl Bits Services - Web, Software, Design, Creative, and Marketing",
      "Ctrl Bits provides web development, app development, custom software, UI/UX design, creative services, and digital marketing for businesses across Nepal.",
      `${SITE_URL}/solutions`,
      `## Services Built To Move
Practical services for teams that need sharper digital presence, cleaner systems, and better growth paths.

${servicesMarkdown()}

## Process
### 01. Diagnose
Clarify business goals, users, technical constraints, and the highest-value path.

### 02. Shape
Turn the goal into scope, structure, content, interface direction, and delivery milestones.

### 03. Build
Design, develop, integrate, test, and refine the product or campaign.

### 04. Improve
Launch, measure performance, and continue improving search, conversion, reliability, and usability.`,
    ),
  ],
  [
    "/about",
    page(
      "About Ctrl Bits - Digital Team in Nepal",
      "Meet Ctrl Bits, a Nepal-based agency delivering web development, app development, custom software, UI/UX design, creative services, and digital marketing.",
      `${SITE_URL}/about`,
      `## Company Profile
Ctrl Bits brings strategy, design, development, creative work, and growth work into one focused delivery team.

## Focus
- Practical software and websites for real business needs.
- Clear UI/UX and content structure.
- Search-friendly technical foundations.
- Creative assets and campaigns that support growth.

## Location
Kathmandu, Nepal.`,
    ),
  ],
  [
    "/portfolio",
    page(
      "Ctrl Bits Portfolio - Web and Digital Work",
      "Explore Ctrl Bits portfolio and case studies across web development, app development, custom software, UI/UX design, creative services, and digital marketing work.",
      `${SITE_URL}/portfolio`,
      `## Work Archive
Ctrl Bits publishes case studies and project work across websites, apps, custom software, UI/UX, creative production, and digital marketing.

## Project API
Agents can discover public project data through:

- ${SITE_URL}/.well-known/api-catalog
- https://api.ctrlbits.com/api/projects/`,
    ),
  ],
  [
    "/contact",
    page(
      "Contact Ctrl Bits - Start a Web or Marketing Project",
      "Contact Ctrl Bits to start web development, app development, custom software, UI/UX design, creative services, or digital marketing across Nepal.",
      `${SITE_URL}/contact`,
      `## Start A Project
Share the goal, timeline, and budget. Ctrl Bits will help shape the clearest next step.

## Inquiry Types
- New website or redesign.
- Web app, mobile app, or custom software.
- UI/UX design and product flow improvements.
- Creative services, branding, animation, or video.
- SEO, local SEO, paid ads, and digital marketing.`,
    ),
  ],
  [
    "/docs/api",
    page(
      "Ctrl Bits API Documentation",
      "Public API endpoints used by ctrlbits.com.",
      `${SITE_URL}/docs/api`,
      `## Projects
\`GET https://api.ctrlbits.com/api/projects/\`

Returns portfolio project records.

\`GET https://api.ctrlbits.com/api/projects/{slug}\`

Returns a single project detail record.

## Team
\`GET https://api.ctrlbits.com/api/team/\`

Returns active team members.

## Companies
\`GET https://api.ctrlbits.com/api/companies/\`

Returns company, client, and partner records.

## Testimonials
\`GET https://api.ctrlbits.com/api/testimonials/\`

Returns testimonial records.

## Tech
\`GET https://api.ctrlbits.com/api/tech/\`

Returns technology and stack data.

## Contact
\`POST https://api.ctrlbits.com/api/contact/\`

Accepts project inquiry form submissions.

## Subscribers
\`POST https://api.ctrlbits.com/api/subscribers/\`

Accepts newsletter or update subscription requests.

## Posts
\`GET https://api-blog.ctrlbits.com/api/posts/\`

Returns published blog posts.

## Discovery
- API catalog: ${SITE_URL}/.well-known/api-catalog
- OpenAPI description: ${SITE_URL}/.well-known/openapi.json
- Status endpoint: ${SITE_URL}/.well-known/api-status
- OAuth authorization server metadata: ${SITE_URL}/.well-known/oauth-authorization-server
- OAuth protected resource metadata: ${SITE_URL}/.well-known/oauth-protected-resource
- OAuth JWKS: ${SITE_URL}/.well-known/oauth-jwks.json
- MCP server card: ${SITE_URL}/.well-known/mcp/server-card.json
- MCP transport endpoint: ${SITE_URL}/mcp
- Agent skills index: ${SITE_URL}/.well-known/agent-skills/index.json`,
    ),
  ],
  [
    "/privacy",
    page(
      "Privacy Policy - Ctrl Bits",
      "Learn how Ctrl Bits protects privacy and handles personal data.",
      `${SITE_URL}/privacy`,
      `## Summary
Ctrl Bits collects information needed to respond to inquiries, provide services, improve the website, and communicate with clients.

## Typical Data
- Contact details submitted through forms.
- Project inquiry information.
- Basic analytics and website usage data.

## Rights
Users can contact Ctrl Bits about privacy questions, data access, corrections, or deletion requests at hi@ctrlbits.com.`,
    ),
  ],
  [
    "/terms",
    page(
      "Terms and Conditions - Ctrl Bits",
      "Read the terms and conditions for Ctrl Bits services and website usage.",
      `${SITE_URL}/terms`,
      `## Summary
These terms govern access to ctrlbits.com and related services provided by Ctrl Bits.

## Services
Ctrl Bits provides agency services including web development, app development, custom software, UI/UX design, creative services, and digital marketing.

## Contact
Questions about these terms can be sent to hi@ctrlbits.com.`,
    ),
  ],
]);

function normalizePath(value) {
  const rawPath = Array.isArray(value) ? value[0] : value || "/";
  const pathOnly = rawPath.split("?")[0].replace(/\/+$/, "") || "/";
  if (pathOnly === "/works") return "/portfolio";
  if (pathOnly.startsWith("/projects/")) return "/portfolio";
  return pathOnly;
}

function estimateTokens(markdown) {
  const words = markdown.trim().split(/\s+/).filter(Boolean).length;
  return String(Math.max(1, Math.ceil(words * 1.33)));
}

export default function handler(req, res) {
  if (!["GET", "HEAD"].includes(req.method || "GET")) {
    res.statusCode = 405;
    res.setHeader("Allow", "GET, HEAD");
    res.end("Method Not Allowed");
    return;
  }

  const path = normalizePath(req.query?.path);
  const markdown =
    pages.get(path) ||
    page(
      "Page Not Found - Ctrl Bits",
      "The requested Ctrl Bits page was not found.",
      `${SITE_URL}${path}`,
      "Use the key pages below to continue browsing Ctrl Bits in markdown.",
    );

  res.statusCode = pages.has(path) ? 200 : 404;
  res.setHeader("Content-Type", "text/markdown; charset=utf-8");
  res.setHeader("Vary", "Accept");
  res.setHeader("X-Markdown-Tokens", estimateTokens(markdown));
  res.setHeader(
    "Link",
    '</.well-known/api-catalog>; rel="api-catalog"; type="application/linkset+json"',
  );
  res.setHeader("Cache-Control", "public, max-age=3600, s-maxage=86400");

  if (req.method === "HEAD") {
    res.end();
    return;
  }

  res.end(markdown);
}
