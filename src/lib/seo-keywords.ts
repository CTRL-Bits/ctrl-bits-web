/**
 * SEO Content Optimization Guide
 * Keywords integrated across the website
 */

export const seoKeywords = {
  // Primary Keywords (High Volume, High Competition)
  primary: [
    "web development company Nepal",
    "IT solutions Nepal",
    "software development company Nepal",
    "custom web development Kathmandu",
    "automation services Nepal"
  ],

  // Secondary Keywords (Medium Volume)
  secondary: [
    "web app development Nepal",
    "IT company Kathmandu",
    "digital transformation Nepal",
    "business automation Nepal",
    "Nepal tech company",
    "software company Kathmandu"
  ],

  // Long-tail Keywords (Low Competition, High Intent)
  longTail: [
    "best web development company in Kathmandu Nepal",
    "affordable custom software development Nepal",
    "business process automation solutions Kathmandu",
    "professional web development services Nepal",
    "enterprise IT solutions provider Nepal",
    "custom web application development Kathmandu",
    "cloud infrastructure services Nepal",
    "mobile app development company Kathmandu",
    "e-commerce website development Nepal",
    "startup web development services Nepal",
    "API development and integration Nepal",
    "database design and optimization Kathmandu",
    "UI UX design services Nepal",
    "data analytics solutions Nepal",
    "DevOps consulting services Kathmandu"
  ],

  // Service-Specific Keywords
  services: {
    webDevelopment: [
      "React web development",
      "Next.js development Nepal",
      "responsive web design",
      "progressive web apps Nepal",
      "full-stack development Kathmandu"
    ],
    automation: [
      "workflow automation Nepal",
      "business process automation",
      "RPA solutions Nepal",
      "automation consulting Kathmandu"
    ],
    cloudInfrastructure: [
      "AWS cloud services Nepal",
      "cloud migration services",
      "serverless architecture Nepal",
      "cloud infrastructure setup Kathmandu"
    ],
    uiux: [
      "UI UX design Nepal",
      "user experience design Kathmandu",
      "interface design services",
      "product design Nepal"
    ],
    dataAnalytics: [
      "business intelligence Nepal",
      "data visualization services",
      "analytics dashboards Kathmandu",
      "data-driven insights Nepal"
    ]
  },

  // Location-Based Keywords
  location: [
    "Kathmandu web development",
    "Nepal software company",
    "Bagmati IT solutions",
    "web developers in Kathmandu valley"
  ],

  // Industry Keywords
  industry: [
    "fintech development Nepal",
    "e-commerce solutions Kathmandu",
    "healthcare software Nepal",
    "education technology Nepal",
    "restaurant management system Nepal"
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
  hero: "Professional web development team in Kathmandu Nepal working on custom software projects",
  services: {
    webDev: "Custom web development services Nepal - modern responsive websites and applications",
    automation: "Business process automation solutions for Nepal companies - workflow optimization",
    cloud: "Cloud infrastructure and AWS services Nepal - scalable hosting solutions",
    analytics: "Data analytics and business intelligence dashboards Nepal",
    design: "UI UX design services Nepal - user-centered interface design"
  },
  team: "Expert software development team at Ctrl Bits Kathmandu Nepal",
  portfolio: "Web development portfolio - successful projects delivered in Nepal",
  contact: "Contact Ctrl Bits web development company Kathmandu Nepal office"
};

export default {
  seoKeywords,
  seoImplementation,
  altTextTemplates
};
