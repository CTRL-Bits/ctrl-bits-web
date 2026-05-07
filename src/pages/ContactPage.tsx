import ContactForm from "@/components/contact-form";
import RouteHero from "@/components/sections/RouteHero";
import SchemaMarkup from "@/components/schema-markup";
import { usePageMetadata } from "@/hooks/usePageMetadata";

const ContactPage = () => {
  usePageMetadata({
    title: "Contact Ctrl Bits | Start a Web, App, SEO or Software Project",
    description:
      "Contact Ctrl Bits for web development, app development, custom software, SEO, automation, UI/UX, branding, and digital product development inquiries.",
    keywords:
      "contact Ctrl Bits, web development agency Kathmandu contact, app development Nepal contact, software company Kathmandu contact, SEO agency Nepal contact",
    ogTitle: "Contact Ctrl Bits",
    ogDescription:
      "Start a project with Ctrl Bits for websites, apps, systems, SEO, automation, and digital product work.",
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
      <main className="bg-[#f5f5f5]">
        <RouteHero
          eyebrow="Contact"
          title="Tell us what you are trying to build, fix, or automate."
          description="Share the goal, timeline, and constraints. We will help shape the scope and recommend the right path for a website, app, software system, SEO, automation, or digital product."
        />
        <div className="px-4 pb-24 md:px-8">
          <div className="mx-auto max-w-[88rem] overflow-hidden rounded-[2.5rem] bg-white">
            <ContactForm />
          </div>
        </div>
      </main>
    </>
  );
};

export default ContactPage;
