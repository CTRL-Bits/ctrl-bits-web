import ContactForm from "@/components/contact-form";
import RouteHero from "@/components/sections/RouteHero";
import SchemaMarkup from "@/components/schema-markup";
import { usePageMetadata } from "@/hooks/usePageMetadata";

const ContactPage = () => {
  usePageMetadata({
    title: "Contact Ctrl Bits | Web & Marketing Projects",
    description:
      "Contact Ctrl Bits to start web development, app development, custom software, UI/UX design, creative services, or digital marketing across Nepal.",
    keywords:
      "contact Ctrl Bits, contact control bits, contact web development agency Nepal, contact app development agency Nepal, custom software inquiry Nepal, UI/UX design Nepal, creative services Nepal, digital marketing agency Nepal",
    ogTitle: "Contact Ctrl Bits | Web & Marketing Projects",
    ogDescription:
      "Start a project with Ctrl Bits for web development, app development, custom software, UI/UX design, creative services, and digital marketing.",
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
          title="Tell us what needs to work better in your business."
          description="Share the goal, timeline, and budget. We will help shape the clearest next step."
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
