import ContactSection from "@/components/contact-form";
import SchemaMarkup from "@/components/schema-markup";
import { usePageMetadata } from "@/hooks/usePageMetadata";

const ContactPage = () => {
  usePageMetadata({
    title: "Contact Our Kathmandu Team",
    description:
      "Contact Ctrl Bits in Kathmandu for web development, digital marketing, SEO, video editing, graphic design, and software development inquiries.",
    keywords:
      "contact web development agency Kathmandu, digital marketing agency Kathmandu contact, SEO agency Kathmandu contact, Ctrl Bits contact",
    ogTitle: "Contact Ctrl Bits – Kathmandu Web Development & Marketing Team",
    ogDescription:
      "Get in touch with Ctrl Bits in Kathmandu for your next web development, marketing, or software project.",
    ogUrl: "https://www.ctrlbits.com/contact",
    canonical: "https://www.ctrlbits.com/contact",
    twitterCard: "summary_large_image",
  });

  return (
    <>
      <SchemaMarkup
        type="webpage"
        pageName="Contact"
        pageUrl="https://www.ctrlbits.com/contact"
      />
      <ContactSection />
    </>
  );
};

export default ContactPage;
