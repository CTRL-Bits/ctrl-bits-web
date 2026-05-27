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
  ogType?: string;
  canonical?: string;
  twitterTitle?: string;
  twitterDescription?: string;
  twitterCard?: "summary" | "summary_large_image" | "app" | "player";
  twitterImage?: string;
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
    const upsertMetaByName = (name: string, content?: string) => {
      if (!content) return;
      let tag = document.querySelector(`meta[name="${name}"]`);
      if (!tag) {
        tag = document.createElement("meta");
        tag.setAttribute("name", name);
        document.head.appendChild(tag);
      }
      tag.setAttribute("content", content);
    };

    const upsertMetaByProperty = (property: string, content?: string) => {
      if (!content) return;
      let tag = document.querySelector(`meta[property="${property}"]`);
      if (!tag) {
        tag = document.createElement("meta");
        tag.setAttribute("property", property);
        document.head.appendChild(tag);
      }
      tag.setAttribute("content", content);
    };

    const upsertCanonical = (href: string) => {
      let canonical = document.querySelector('link[rel="canonical"]');
      if (!canonical) {
        canonical = document.createElement("link");
        canonical.setAttribute("rel", "canonical");
        document.head.appendChild(canonical);
      }
      canonical.setAttribute("href", href);
    };

    // Update document title
    if (metadata.title) {
      const hasBrandInTitle = metadata.title.toLowerCase().includes("ctrl bits");
      document.title = hasBrandInTitle
        ? metadata.title
        : `${metadata.title} | Ctrl Bits`;
    } else {
      document.title = "Ctrl Bits";
    }

    // Update meta robots directive for indexing
    let robotsMeta = document.querySelector('meta[name="robots"]');
    if (!robotsMeta) {
      robotsMeta = document.createElement("meta");
      robotsMeta.setAttribute("name", "robots");
      document.head.appendChild(robotsMeta);
    }
    robotsMeta.setAttribute(
      "content",
      indexable ? "index, follow" : "noindex, follow"
    );

    // Core SEO tags
    upsertMetaByName("description", metadata.description);
    upsertMetaByName("keywords", metadata.keywords);

    // Open Graph
    upsertMetaByProperty("og:title", metadata.ogTitle || metadata.title);
    upsertMetaByProperty(
      "og:description",
      metadata.ogDescription || metadata.description,
    );
    upsertMetaByProperty("og:image", metadata.ogImage);
    upsertMetaByProperty(
      "og:url",
      metadata.ogUrl || `${window.location.origin}${location.pathname}`,
    );
    upsertMetaByProperty("og:type", metadata.ogType || "website");
    upsertMetaByProperty("og:site_name", "Ctrl Bits");

    // Twitter cards
    upsertMetaByName(
      "twitter:title",
      metadata.twitterTitle || metadata.ogTitle || metadata.title,
    );
    upsertMetaByName(
      "twitter:description",
      metadata.twitterDescription || metadata.ogDescription || metadata.description,
    );
    upsertMetaByName(
      "twitter:card",
      metadata.twitterCard || (metadata.ogImage ? "summary_large_image" : "summary"),
    );
    upsertMetaByName("twitter:image", metadata.twitterImage || metadata.ogImage);

    // Canonical URL
    const canonicalUrl =
      metadata.canonical ||
      metadata.ogUrl ||
      `${window.location.origin}${location.pathname}`;
    upsertCanonical(canonicalUrl);
  }, [metadata, location, indexable]);
};
