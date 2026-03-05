import { Helmet } from "react-helmet-async";

interface SchemaMarkupProps {
  type?: "organization" | "localBusiness" | "service" | "breadcrumb" | "webpage" | "website";
  customSchema?: Record<string, any>;
  pageName?: string;
  pageUrl?: string;
}

export const SchemaMarkup = ({ 
  type = "organization", 
  customSchema,
  pageName,
  pageUrl 
}: SchemaMarkupProps) => {
  
  // Organization Schema - for all pages
  const organizationSchema: Record<string, any> = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://www.ctrlbits.com/#organization",
    "name": "Ctrl Bits",
    "alternateName": ["Ctrl Bits", "ctrl bits"],
    "url": "https://www.ctrlbits.com",
    "logo": "https://www.ctrlbits.com/logo.webp",
    "description": "Ctrl Bits is a Kathmandu-based digital agency providing web development, digital marketing, SEO, video editing, graphic design, and custom software development services.",
    "knowsAbout": [
      "Web Development",
      "Digital Marketing",
      "SEO",
      "Video Editing",
      "Graphic Design",
      "Software Development"
    ],
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Kathmandu",
      "addressCountry": "Nepal"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "Customer Service",
      "telephone": "+977-9709659012",
      "email": "info@ctrlbits.com",
      "areaServed": ["Kathmandu", "Nepal"],
      "availableLanguage": ["English", "Nepali"]
    },
    "sameAs": [
      "https://www.facebook.com/ctrlbits",
      "https://www.linkedin.com/company/ctrlbits",
      "https://x.com/ctrl_bits",
      "https://www.instagram.com/ctrl.bits/"
    ],
    "hasPart": [
      {
        "@type": "WebPage",
        "name": "Our Services",
        "url": "https://www.ctrlbits.com/solutions"
      },
      {
        "@type": "WebPage",
        "name": "About",
        "url": "https://www.ctrlbits.com/about"
      },
      {
        "@type": "WebPage",
        "name": "Projects",
        "url": "https://www.ctrlbits.com/projects"
      }
    ]
  };

  const websiteSchema: Record<string, any> = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://www.ctrlbits.com/#website",
    "url": "https://www.ctrlbits.com/",
    "name": "Ctrl Bits",
    "alternateName": ["ctrl bits"],
    "description": "Ctrl Bits is a Kathmandu-based digital agency for web development, digital marketing, SEO, video editing, graphic design, and custom software development.",
    "inLanguage": "en",
    "publisher": {
      "@id": "https://www.ctrlbits.com/#organization"
    }
  };

  // Local Business Schema - for homepage and about page
  const localBusinessSchema: Record<string, any> = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://www.ctrlbits.com/#localbusiness",
    "name": "Ctrl Bits",
    "alternateName": ["ctrl bits"],
    "image": "https://www.ctrlbits.com/logo.webp",
    "description": "Kathmandu-based digital agency offering web development, digital marketing, SEO, video editing, graphic design, and custom software development.",
    "url": "https://www.ctrlbits.com/",
    "parentOrganization": {
      "@id": "https://www.ctrlbits.com/#organization"
    },
    "areaServed": [
      {
        "@type": "City",
        "name": "Kathmandu"
      },
      {
        "@type": "Country",
        "name": "Nepal"
      }
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Ctrl Bits Service Catalog",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Web Development"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Digital Marketing"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "SEO Services"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Video Editing"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Graphic Design"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Custom Software Development"
          }
        }
      ]
    },
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Kathmandu",
      "addressRegion": "Bagmati",
      "addressCountry": "Nepal"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "27.7172",
      "longitude": "85.3240"
    },
    "telephone": "+977-9709659012",
    "email": "info@ctrlbits.com",
    "priceRange": "$$"
  };

  // Service Schema - for solutions page
  const serviceSchema: Record<string, any> = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": "https://www.ctrlbits.com/#service",
    "serviceType": "Web Development, Digital Marketing & Creative Services",
    "provider": {
      "@id": "https://www.ctrlbits.com/#organization"
    },
    "areaServed": [
      {
        "@type": "City",
        "name": "Kathmandu"
      },
      {
        "@type": "Country",
        "name": "Nepal"
      }
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Our Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Web Development",
            "description": "Responsive websites, web apps, e-commerce development, and CMS implementation."
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Digital Marketing",
            "description": "Paid campaigns, social media marketing, and conversion-focused growth strategies."
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "SEO Services",
            "description": "Technical SEO, on-page optimization, local SEO, and content SEO strategy."
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Video Editing & Motion Graphics",
            "description": "Editing for ads, product demos, social reels, and brand storytelling content."
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Graphic Design & Branding",
            "description": "Brand identity, marketing creatives, and UI graphics for digital channels."
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Custom Software Development",
            "description": "Tailored software systems, API integration, and workflow automation solutions."
          }
        }
      ]
    }
  };

  // Breadcrumb Schema
  const breadcrumbSchema: Record<string, any> | null = pageName ? {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://www.ctrlbits.com"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": pageName,
        "item": pageUrl || `https://www.ctrlbits.com/${pageName.toLowerCase()}`
      }
    ]
  } : null;

  // WebPage Schema
  const webPageSchema: Record<string, any> = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${pageUrl || "https://www.ctrlbits.com"}#webpage`,
    "name": pageName || "Ctrl Bits - Kathmandu Web Development & Digital Marketing Agency",
    "url": pageUrl || "https://www.ctrlbits.com",
    "description": "Kathmandu-based agency offering web development, digital marketing, SEO, video editing, graphic design, and custom software development.",
    "inLanguage": "en",
    "isPartOf": {
      "@id": "https://www.ctrlbits.com/#website"
    },
    "about": {
      "@id": "https://www.ctrlbits.com/#organization"
    },
    "publisher": {
      "@id": "https://www.ctrlbits.com/#organization"
    }
  };

  let schemaToRender: Record<string, any> | Record<string, any>[] = organizationSchema;

  if (customSchema) {
    schemaToRender = customSchema;
  } else if (type === "localBusiness") {
    schemaToRender = [organizationSchema, websiteSchema, localBusinessSchema];
  } else if (type === "service") {
    schemaToRender = [organizationSchema, websiteSchema, serviceSchema];
  } else if (type === "website") {
    schemaToRender = [organizationSchema, websiteSchema];
  } else if (type === "webpage") {
    schemaToRender = [organizationSchema, websiteSchema, webPageSchema];
  } else if (type === "breadcrumb" && breadcrumbSchema) {
    schemaToRender = breadcrumbSchema;
  }

  // Combine multiple schemas if needed
  const schemas: Record<string, any>[] = Array.isArray(schemaToRender)
    ? [...schemaToRender]
    : [schemaToRender];
  if (breadcrumbSchema && type !== "breadcrumb") {
    schemas.push(breadcrumbSchema);
  }

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schemas.length === 1 ? schemas[0] : schemas)}
      </script>
    </Helmet>
  );
};

export default SchemaMarkup;
