/**
 * SEO Configuration for Ctrl Bits Website
 * Centralized SEO settings and metadata
 */

export const seoConfig = {
  siteName: "Ctrl Bits",
  siteUrl: "https://www.ctrlbits.com",
  defaultTitle:
    "Web Development, App Development, Custom Software, UI/UX Design, Creative Services & Digital Marketing in Kathmandu | Ctrl Bits",
  defaultDescription:
    "Ctrl Bits is a Nepal-based agency delivering web development, app development, custom software, UI/UX design, creative services, and digital marketing across Nepal.",

  social: {
    facebook: "https://www.facebook.com/ctrlbits",
    instagram: "https://www.instagram.com/ctrl.bits/",
  },

  business: {
    name: "Ctrl Bits",
    legalName: "Ctrl Bits Pvt. Ltd.",
    address: {
      city: "Kathmandu",
      region: "Bagmati",
      country: "Nepal",
      countryCode: "NP",
    },
    contact: {
      email: "hi@ctrlbits.com",
      phone: "+977-9709659012",
    },
    coordinates: {
      latitude: "27.7172",
      longitude: "85.3240",
    },
  },

  keywords: {
    primary: [
      "web development agency Nepal",
      "app development company Nepal",
      "custom software development Nepal",
      "UI/UX design agency Nepal",
      "creative services Nepal",
      "digital marketing agency Nepal",
    ],
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
      "control bits digital marketing",
    ],
    services: [
      "website development",
      "web development",
      "app development",
      "custom software",
      "ui/ux design",
      "creative services",
      "video production",
      "graphic design",
      "animation",
      "digital marketing",
      "website design",
      "web application development",
    ],
  },

  images: {
    og: "/og-image.jpg",
    twitter: "/twitter-image.jpg",
    logo: "/logo.webp",
  },
};

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
    : [...seoConfig.keywords.primary, ...seoConfig.keywords.secondary].join(
        ", ",
      );

  const image = page.image
    ? `${seoConfig.siteUrl}${page.image}`
    : `${seoConfig.siteUrl}${seoConfig.images.og}`;

  return {
    title: fullTitle,
    description,
    keywords,
    url,
    image,
    canonical: url,
  };
};

export default seoConfig;
