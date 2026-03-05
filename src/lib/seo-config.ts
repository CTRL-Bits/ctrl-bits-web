/**
 * SEO Configuration for Ctrl Bits Website
 * Centralized SEO settings and metadata
 */

export const seoConfig = {
  // Base configuration
  siteName: "Ctrl Bits",
  siteUrl: "https://www.ctrlbits.com",
  defaultTitle:
    "Ctrl Bits — Web Development & Digital Marketing Agency in Kathmandu, Nepal",
  defaultDescription:
    "Ctrl Bits is a Kathmandu-based agency providing web development, digital marketing, SEO, video editing, graphic design, and custom software development services for Nepal and global clients.",
  
  // Social media handles
  social: {
    twitter: "https://x.com/ctrl_bits",
    facebook: "https://www.facebook.com/ctrlbits",
    linkedin: "https://www.linkedin.com/company/ctrlbits",
    instagram: "https://www.instagram.com/ctrl.bits/"
  },
  
  // Business information
  business: {
    name: "Ctrl Bits",
    legalName: "Ctrl Bits Pvt. Ltd.",
    address: {
      city: "Kathmandu",
      region: "Bagmati",
      country: "Nepal",
      countryCode: "NP"
    },
    contact: {
      email: "info@ctrlbits.com",
      phone: "+977-9709659012"
    },
    coordinates: {
      latitude: "27.7172",
      longitude: "85.3240"
    }
  },
  
  // Primary keywords for different services
  keywords: {
    primary: [
      "web development agency Kathmandu",
      "digital marketing agency Kathmandu",
      "SEO agency Kathmandu",
      "video editing services Kathmandu",
      "graphic design agency Kathmandu"
    ],
    secondary: [
      "web development agency Nepal",
      "web app development Nepal",
      "custom software development Nepal",
      "digital agency Kathmandu",
      "social media marketing Nepal",
      "branding and creative services Nepal",
      "motion graphics Nepal"
    ],
    services: [
      "web development",
      "digital marketing",
      "search engine optimization",
      "video editing",
      "graphic design",
      "software development",
      "web application development",
      "API integration"
    ]
  },
  
  // Default Open Graph images
  images: {
    og: "/og-image.jpg",
    twitter: "/twitter-image.jpg",
    logo: "/logo.webp"
  }
};

/**
 * Generate page-specific SEO metadata
 */
export const generatePageMeta = (page: {
  title?: string;
  description?: string;
  keywords?: string[];
  path?: string;
  image?: string;
}) => {
  const fullTitle = page.title 
    ? `${page.title} | ${seoConfig.siteName}`
    : seoConfig.defaultTitle;
  
  const url = page.path 
    ? `${seoConfig.siteUrl}${page.path}`
    : seoConfig.siteUrl;
  
  const description = page.description || seoConfig.defaultDescription;
  
  const keywords = page.keywords 
    ? [...seoConfig.keywords.primary, ...page.keywords].join(", ")
    : [...seoConfig.keywords.primary, ...seoConfig.keywords.secondary].join(", ");
  
  const image = page.image 
    ? `${seoConfig.siteUrl}${page.image}`
    : `${seoConfig.siteUrl}${seoConfig.images.og}`;
  
  return {
    title: fullTitle,
    description,
    keywords,
    url,
    image,
    canonical: url
  };
};

export default seoConfig;
