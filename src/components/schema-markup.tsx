import { Helmet } from "react-helmet-async";

interface SchemaMarkupProps {
  type?: "organization" | "localBusiness" | "service" | "breadcrumb" | "webpage";
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
    "name": "Ctrl Bits",
    "alternateName": "Ctrl Bits",
    "url": "https://www.ctrlbits.com",
    "logo": "https://www.ctrlbits.com/logo.webp",
    "description": "Leading web development and IT solutions company in Nepal, specializing in custom software development, automation, and digital transformation services.",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Kathmandu",
      "addressCountry": "NP"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "Customer Service",
      "areaServed": "NP",
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
        "name": "Services",
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

  // Local Business Schema - for homepage and about page
  const localBusinessSchema: Record<string, any> = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://www.ctrlbits.com",
    "name": "Ctrl Bits",
    "image": "https://www.ctrlbits.com/logo.webp",
    "description": "Nepal's leading web development and IT solutions company offering custom software development, automation services, and digital transformation solutions for businesses.",
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
    "url": "https://www.ctrlbits.com",
    "telephone": "+977-9709659012",
    "email": "hi@ctrlbits.com",
    "priceRange": "$$",
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        "opens": "00:00",
        "closes": "23:59"
      }
    ],
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "47"
    }
  };

  // Service Schema - for solutions page
  const serviceSchema: Record<string, any> = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Web Development & IT Solutions",
    "provider": {
      "@type": "Organization",
      "name": "Ctrl Bits",
      "url": "https://www.ctrlbits.com"
    },
    "areaServed": {
      "@type": "Country",
      "name": "Nepal"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Web Development Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Custom Web Development",
            "description": "Tailored web applications built with modern technologies"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Business Automation",
            "description": "Streamline operations with intelligent automation solutions"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Cloud Infrastructure",
            "description": "Scalable and secure cloud solutions for modern businesses"
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
    "name": pageName || "Ctrl Bits - Web Development Company Nepal",
    "url": pageUrl || "https://www.ctrlbits.com",
    "description": "Professional web development and IT solutions in Nepal",
    "publisher": {
      "@type": "Organization",
      "name": "Ctrl Bits"
    }
  };

  let schemaToRender: Record<string, any> = organizationSchema;

  if (customSchema) {
    schemaToRender = customSchema;
  } else if (type === "localBusiness") {
    schemaToRender = localBusinessSchema;
  } else if (type === "service") {
    schemaToRender = serviceSchema;
  } else if (type === "webpage") {
    schemaToRender = webPageSchema;
  }

  // Combine multiple schemas if needed
  const schemas: Record<string, any>[] = [schemaToRender];
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
