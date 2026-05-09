import { Helmet } from "react-helmet-async";

interface SchemaMarkupProps {
  type?:
    | "organization"
    | "localBusiness"
    | "service"
    | "breadcrumb"
    | "webpage"
    | "website";
  customSchema?: Record<string, any>;
  pageName?: string;
  pageUrl?: string;
}

export const SchemaMarkup = ({
  type = "organization",
  customSchema,
  pageName,
  pageUrl,
}: SchemaMarkupProps) => {
  const organizationSchema: Record<string, any> = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://www.ctrlbits.com/#organization",
    name: "Ctrl Bits",
    alternateName: ["Ctrl Bits", "ctrl bits", "Control Bits"],
    url: "https://www.ctrlbits.com",
    logo: "https://www.ctrlbits.com/logo.webp",
    description:
      "Ctrl Bits is a Nepal-based agency providing web development, app development, custom software, UI/UX design, creative services, and digital marketing.",
    knowsAbout: [
      "Website Development",
      "Web Development",
      "App Development",
      "Custom Software",
      "UI/UX Design",
      "Creative Services",
      "Digital Marketing",
    ],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Kathmandu",
      addressCountry: "Nepal",
    },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "Customer Service",
      telephone: "+977-9709659012",
      email: "hi@ctrlbits.com",
      areaServed: ["Kathmandu", "Nepal"],
      availableLanguage: ["English", "Nepali"],
    },
    sameAs: [
      "https://www.facebook.com/ctrlbits",
      "https://www.linkedin.com/company/ctrlbits",
      "https://x.com/ctrl_bits",
      "https://www.instagram.com/ctrl.bits/",
    ],
    hasPart: [
      {
        "@type": "WebPage",
        name: "Our Services",
        url: "https://www.ctrlbits.com/solutions",
      },
      {
        "@type": "WebPage",
        name: "Portfolio",
        url: "https://www.ctrlbits.com/portfolio",
      },
      {
        "@type": "WebPage",
        name: "Contact",
        url: "https://www.ctrlbits.com/contact",
      },
    ],
  };

  const websiteSchema: Record<string, any> = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://www.ctrlbits.com/#website",
    url: "https://www.ctrlbits.com/",
    name: "Ctrl Bits",
    alternateName: ["ctrl bits", "control bits"],
    description:
      "Ctrl Bits is a Nepal-based agency delivering web development, app development, custom software, UI/UX design, creative services, and digital marketing.",
    inLanguage: "en",
    publisher: {
      "@id": "https://www.ctrlbits.com/#organization",
    },
  };

  const localBusinessSchema: Record<string, any> = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://www.ctrlbits.com/#localbusiness",
    name: "Ctrl Bits",
    alternateName: ["ctrl bits", "control bits"],
    image: "https://www.ctrlbits.com/logo.webp",
    description:
      "Nepal agency offering web development, app development, custom software, UI/UX design, creative services, and digital marketing.",
    url: "https://www.ctrlbits.com/",
    parentOrganization: {
      "@id": "https://www.ctrlbits.com/#organization",
    },
    areaServed: [
      {
        "@type": "City",
        name: "Kathmandu",
      },
      {
        "@type": "Country",
        name: "Nepal",
      },
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Ctrl Bits Service Catalog",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Website Development",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "App Development",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Custom Software",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "UI/UX Design",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Digital Marketing",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Creative Services",
          },
        },
      ],
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Kathmandu",
      addressRegion: "Bagmati",
      addressCountry: "Nepal",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "27.7172",
      longitude: "85.3240",
    },
    telephone: "+977-9709659012",
    email: "hi@ctrlbits.com",
    priceRange: "$$",
  };

  const serviceSchema: Record<string, any> = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": "https://www.ctrlbits.com/#service",
    serviceType:
      "Web Development, App Development, Custom Software, UI/UX Design, Creative Services, and Digital Marketing",
    provider: {
      "@id": "https://www.ctrlbits.com/#organization",
    },
    areaServed: [
      {
        "@type": "City",
        name: "Kathmandu",
      },
      {
        "@type": "Country",
        name: "Nepal",
      },
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Our Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Website Development",
            description:
              "Website design and development, CMS builds, landing pages, and performance-focused business sites.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "App Development",
            description:
              "Mobile and web apps with clean architecture and secure APIs.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Custom Software",
            description:
              "Internal tools, portals, dashboards, and workflow systems tailored to operations.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "UI/UX Design",
            description:
              "Research-led interfaces, wireframes, and design systems that make products easier to use.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Digital Marketing",
            description:
              "SEO, local SEO, content, and paid campaigns.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Creative Services",
            description:
              "Video production, graphic design, branding, animation, and illustration.",
          },
        },
      ],
    },
  };

  const breadcrumbSchema: Record<string, any> | null = pageName
    ? {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: "https://www.ctrlbits.com",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: pageName,
            item:
              pageUrl || `https://www.ctrlbits.com/${pageName.toLowerCase()}`,
          },
        ],
      }
    : null;

  const webPageSchema: Record<string, any> = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${pageUrl || "https://www.ctrlbits.com"}#webpage`,
    name:
      pageName ||
      "Ctrl Bits - Web Development, App Development, Custom Software, UI/UX Design, and Digital Marketing in Nepal",
    url: pageUrl || "https://www.ctrlbits.com",
    description:
      "Nepal-based agency offering web development, app development, custom software, UI/UX design, creative services, and digital marketing.",
    inLanguage: "en",
    isPartOf: {
      "@id": "https://www.ctrlbits.com/#website",
    },
    about: {
      "@id": "https://www.ctrlbits.com/#organization",
    },
    publisher: {
      "@id": "https://www.ctrlbits.com/#organization",
    },
  };

  let schemaToRender: Record<string, any> | Record<string, any>[] =
    organizationSchema;

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
