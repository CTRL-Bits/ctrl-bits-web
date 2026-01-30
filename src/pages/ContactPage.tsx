import ContactSection from "@/components/contact-form";
import { usePageMetadata } from "@/hooks/usePageMetadata";

const ContactPage = () => {
  usePageMetadata({
    title: "Contact",
    description:
      "Have a project in mind? Contact CtrlBits and start building today with our Kathmandu-based development team.",
    keywords:
      "contact us, web development, Nepal, get in touch, project inquiry",
    ogTitle: "Contact CtrlBits – Web Development Company in Nepal",
    ogDescription:
      "Get in touch with CtrlBits for your next web development project.",
  });

  return (
    <>
      <ContactSection />
    </>
  );
};

export default ContactPage;
