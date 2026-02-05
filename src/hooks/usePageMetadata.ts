import { useEffect } from "react";
import { useLocation } from "react-router-dom";

interface PageMetadata {
  title: string;
  description?: string;
  keywords?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogUrl?: string;
  indexable?: boolean; // defaults to true
}

/**
 * Hook to manage page metadata and title
 * Usage: usePageMetadata({ title: "Home", description: "Welcome to Ctrl Bits" })
 */
export const usePageMetadata = (metadata: PageMetadata) => {
  const location = useLocation();
  const indexable = metadata.indexable !== false; // default to true

  useEffect(() => {
    // Update document title
    document.title = metadata.title
      ? `${metadata.title} | Ctrl Bits`
      : "Ctrl Bits";

    // Update meta robots directive for indexing
    let robotsMeta = document.querySelector('meta[name="robots"]');
    if (!robotsMeta) {
      robotsMeta = document.createElement("meta");
      robotsMeta.setAttribute("name", "robots");
      document.head.appendChild(robotsMeta);
    }
    robotsMeta.setAttribute(
      "content",
      indexable ? "index, follow" : "noindex, nofollow"
    );

    // Update meta description
    if (metadata.description) {
      let metaDescription = document.querySelector('meta[name="description"]');
      if (!metaDescription) {
        metaDescription = document.createElement("meta");
        metaDescription.setAttribute("name", "description");
        document.head.appendChild(metaDescription);
      }
      metaDescription.setAttribute("content", metadata.description);
    }

    // Update meta keywords
    if (metadata.keywords) {
      let metaKeywords = document.querySelector('meta[name="keywords"]');
      if (!metaKeywords) {
        metaKeywords = document.createElement("meta");
        metaKeywords.setAttribute("name", "keywords");
        document.head.appendChild(metaKeywords);
      }
      metaKeywords.setAttribute("content", metadata.keywords);
    }

    // Update Open Graph meta tags
    if (metadata.ogTitle) {
      let ogTitle = document.querySelector('meta[property="og:title"]');
      if (!ogTitle) {
        ogTitle = document.createElement("meta");
        ogTitle.setAttribute("property", "og:title");
        document.head.appendChild(ogTitle);
      }
      ogTitle.setAttribute("content", metadata.ogTitle);
    }

    if (metadata.ogDescription) {
      let ogDescription = document.querySelector(
        'meta[property="og:description"]',
      );
      if (!ogDescription) {
        ogDescription = document.createElement("meta");
        ogDescription.setAttribute("property", "og:description");
        document.head.appendChild(ogDescription);
      }
      ogDescription.setAttribute("content", metadata.ogDescription);
    }

    if (metadata.ogImage) {
      let ogImage = document.querySelector('meta[property="og:image"]');
      if (!ogImage) {
        ogImage = document.createElement("meta");
        ogImage.setAttribute("property", "og:image");
        document.head.appendChild(ogImage);
      }
      ogImage.setAttribute("content", metadata.ogImage);
    }

    if (metadata.ogUrl) {
      let ogUrl = document.querySelector('meta[property="og:url"]');
      if (!ogUrl) {
        ogUrl = document.createElement("meta");
        ogUrl.setAttribute("property", "og:url");
        document.head.appendChild(ogUrl);
      }
      ogUrl.setAttribute("content", metadata.ogUrl);
    }
  }, [metadata, location, indexable]);
};
