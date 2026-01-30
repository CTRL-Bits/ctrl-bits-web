/**
 * EXAMPLE: How to use Helmet and usePageMetadata in your pages
 * 
 * Option 1: Using Helmet (simpler, recommended for page-specific metadata)
 * ========================================================================
 * 
 * import { Helmet } from "react-helmet-async";
 * 
 * export default function HomePage() {
 *   return (
 *     <>
 *       <Helmet>
 *         <title>Home | CTRL Bits</title>
 *         <meta name="description" content="Welcome to CTRL Bits - Your digital solutions partner" />
 *         <meta name="keywords" content="web development, design, solutions" />
 *         <meta property="og:title" content="CTRL Bits - Home" />
 *         <meta property="og:description" content="Welcome to CTRL Bits" />
 *       </Helmet>
 *       <div>Your page content</div>
 *     </>
 *   );
 * }
 * 
 * 
 * Option 2: Using usePageMetadata Hook (simpler, cleaner)
 * ========================================================
 * 
 * import { usePageMetadata } from "@/hooks/usePageMetadata";
 * 
 * export default function HomePage() {
 *   usePageMetadata({
 *     title: "Home",
 *     description: "Welcome to CTRL Bits - Your digital solutions partner",
 *     keywords: "web development, design, solutions",
 *     ogTitle: "CTRL Bits - Home",
 *     ogDescription: "Welcome to CTRL Bits",
 *   });
 * 
 *   return <div>Your page content</div>;
 * }
 * 
 * 
 * Google Analytics
 * ================
 * The Google Analytics code (gtag) is now loaded globally in App.tsx with ID: G-B3Z5X0ZL4B
 * It will track all pages automatically.
 * 
 * You can manually track custom events using:
 * window.gtag('event', 'page_view', { page_path: '/custom' });
 */
