/**
 * SEO Configuration for Ctrl Bits Website
 * Centralized SEO settings and metadata
 */

export const seoConfig = {
  // Base configuration
  siteName: "Ctrl Bits",
  siteUrl: "https://www.ctrlbits.com",
  defaultTitle: "Ctrl Bits - Leading Web Development Company in Nepal | Custom IT Solutions",
  defaultDescription: "Ctrl Bits is Nepal's premier web development company offering custom software development, automation services, and IT solutions in Kathmandu.",
  
  // Social media handles
  social: {
    twitter: "@ctrlbits",
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
      email: "hello@ctrlbits.xyz",
      phone: "+977-XXX-XXXXXX"
    },
    coordinates: {
      latitude: "27.7172",
      longitude: "85.3240"
    }
  },
  
  // Primary keywords for different services
  keywords: {
    primary: [
      "web development company Nepal",
      "IT solutions Nepal",
      "software development company Nepal",
      "custom web development Kathmandu",
      "automation services Nepal"
    ],
    secondary: [
      "web app development Nepal",
      "IT company Kathmandu",
      "digital transformation Nepal",
      "business automation Nepal",
      "cloud solutions Nepal",
      "Nepal tech company"
    ],
    services: [
      "custom software development",
      "web application development",
      "mobile app development",
      "business process automation",
      "cloud infrastructure",
      "UI/UX design",
      "data analytics",
      "API development"
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
