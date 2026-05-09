/**
 * SEO Content Optimization Guide
 * Keywords integrated across the website
 */

export const seoKeywords = {
  // Primary Keywords (High Volume, High Competition)
  primary: [
    "web development agency Nepal",
    "app development company Nepal",
    "custom software development Nepal",
    "UI/UX design agency Nepal",
    "creative services Nepal",
    "digital marketing agency Nepal"
  ],

  // Secondary Keywords (Medium Volume)
  secondary: [
    "web development agency Kathmandu",
    "app development agency Kathmandu",
    "custom software company Nepal",
    "creative services Kathmandu",
    "digital marketing agency Kathmandu",
    "website development company Nepal",
    "control bits",
    "control bits Nepal",
    "control bits web development",
    "control bits app development",
    "control bits creative services",
    "control bits digital marketing agency",
    "control bits website development agency"
  ],

  // Long-tail Keywords (Low Competition, High Intent)
  longTail: [
    "best web development agency in Kathmandu Nepal",
    "custom app development company for startups in Nepal",
    "custom software development agency for SMEs in Kathmandu",
    "UI UX design agency for SaaS products in Nepal",
    "creative services and video production company in Nepal",
    "digital marketing agency for local SEO and paid ads in Nepal",
    "website redesign and SEO migration services Nepal",
    "business dashboard and portal development company Nepal",
    "product design and interface design services Kathmandu",
    "web app and mobile app development company Nepal",
    "graphic design and branding agency Nepal",
    "animation and motion design services Kathmandu",
    "brand-aligned digital marketing for Nepal businesses"
  ],

  // Service-Specific Keywords
  services: {
    webDevelopment: [
      "website development services Nepal",
      "responsive website development",
      "CMS website development Kathmandu",
      "landing page development Nepal",
      "ecommerce website development Kathmandu"
    ],
    digitalMarketing: [
      "digital marketing services Nepal",
      "SEO services Nepal",
      "local SEO Kathmandu",
      "Google Ads management Nepal",
      "conversion rate optimization services"
    ],
    softwareDevelopment: [
      "custom software development services",
      "web app development Kathmandu",
      "mobile app development Nepal",
      "workflow software development Nepal",
      "portal development Kathmandu"
    ],
    uiux: [
      "UI/UX design Nepal",
      "user experience design Kathmandu",
      "interface design services",
      "design systems Nepal",
      "product design Kathmandu"
    ],
    creativeServices: [
      "video production services Nepal",
      "graphic design agency Nepal",
      "branding services Kathmandu",
      "animation and motion design Nepal",
      "illustration services"
    ]
  },

  // Location-Based Keywords
  location: [
    "Nepal web development agency",
    "Nepal app development company",
    "Nepal creative services",
    "Kathmandu web development agency",
    "Kathmandu custom software company",
    "Nepal digital marketing agency"
  ],

  // Industry Keywords
  industry: [
    "ecommerce development Nepal",
    "SaaS product design Nepal",
    "healthcare software Nepal",
    "education platform development Nepal",
    "business portal development Kathmandu"
  ]
};

/**
 * On-Page SEO Checklist Implementation
 */
export const seoImplementation = {
  technical: {
    sitemapXML: "✅ sitemap.xml created with priority pages",
    robots: "✅ robots.txt configured for crawling",
    schema: "✅ JSON-LD structured data for all pages",
    canonical: "✅ Canonical URLs on all pages",
    https: "⚠️  Ensure HTTPS in production",
    mobileResponsive: "✅ Mobile-first design implemented",
    pageSpeed: "⚠️  Optimize images (convert to WebP)",
    sitemapStructure: "✅ XML sitemap with changefreq and priority"
  },

  onPage: {
    titleTags: "✅ Unique, keyword-rich titles (50-60 chars)",
    metaDescriptions: "✅ Compelling descriptions (150-160 chars)",
    h1Tags: "✅ Single H1 per page with primary keywords",
    h2h3Tags: "✅ Hierarchical heading structure",
    keywordDensity: "✅ 1-2% keyword density in content",
    internalLinking: "✅ Contextual internal links",
    altText: "⏳ Add alt text to all images",
    urlStructure: "✅ Clean, descriptive URLs",
    contentLength: "⏳ Aim for 1000+ words on key pages",
    readability: "✅ Clear, scannable content"
  },

  content: {
    uniqueContent: "✅ Original, non-duplicated content",
    keywords: "✅ Natural keyword integration",
    longTailKeywords: "✅ Long-tail keywords included",
    localSEO: "✅ Location keywords (Kathmandu, Nepal)",
    callToAction: "✅ Clear CTAs on all pages",
    freshContent: "⏳ Regular blog updates needed"
  }
};

/**
 * Alt Text Templates for Images
 */
export const altTextTemplates = {
  hero: "Ctrl Bits team planning web development, app development, custom software, UI/UX design, and digital marketing projects in Nepal",
  services: {
    webDev: "Website development services in Nepal for responsive business websites, landing pages, and ecommerce",
    customSoftware: "Custom software and workflow systems for Nepal companies that want fewer manual steps",
    appDevelopment: "Web and app delivery for Nepal businesses built with scalable, maintainable architecture",
    creativeServices: "Video production, graphic design, branding, and animation services for Nepal businesses",
    digitalMarketing: "Growth-focused digital marketing and performance tracking for Nepal businesses",
    design: "UI/UX design services in Nepal for user-centered digital product interfaces"
  },
  team: "Ctrl Bits web, app, software, UI/UX, creative, and digital marketing team in Kathmandu, Nepal",
  portfolio: "Website, app, software, UI/UX, creative, and digital marketing portfolio delivered for Nepal clients",
  contact: "Contact Ctrl Bits for web development, app development, custom software, UI/UX design, creative services, and digital marketing in Nepal"
};

export default {
  seoKeywords,
  seoImplementation,
  altTextTemplates
};
