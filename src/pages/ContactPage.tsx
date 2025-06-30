import ContactSection from "@/components/contact-form";
import { Helmet } from "react-helmet-async";

const ContactPage = () => {
  return (
    <>
      <Helmet>
        <title>Contact CtrlBits – Web Development Company in Nepal</title>
        <meta
          name="description"
          content="Have a project in mind? Contact CtrlBits and start building today with our Kathmandu-based development team."
        />
      </Helmet>
      <ContactSection />
    </>
  );
};

export default ContactPage;
