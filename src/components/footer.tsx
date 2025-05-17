import { useState, useEffect } from "react";
import Logo from "@/assets/images/logo(2).png";
import { Link } from "react-router-dom";
import { ArrowUpRight, Send, MapPin, Phone, Mail, Heart } from "lucide-react";
import axios from "axios";

const links = [
  {
    title: "Solutions",
    to: "/solutions",
  },
  {
    title: "About",
    to: "/about",
  },
  {
    title: "Works",
    to: "/works",
  },
  {
    title: "Contact",
    to: "/contact",
  },
];

const socialLinks = [
  {
    name: "X/Twitter",
    to: "https://x.com/ctrlbits",
    icon: (
      <svg
        className="size-5"
        xmlns="http://www.w3.org/2000/svg"
        width="1em"
        height="1em"
        viewBox="0 0 24 24"
      >
        <path
          fill="currentColor"
          d="M10.488 14.651L15.25 21h7l-7.858-10.478L20.93 3h-2.65l-5.117 5.886L8.75 3h-7l7.51 10.015L2.32 21h2.65zM16.25 19L5.75 5h2l10.5 14z"
        ></path>
      </svg>
    ),
  },
  {
    name: "Facebook",
    to: "https://facebook.com/ctrlbits",
    icon: (
      <svg
        className="size-5"
        xmlns="http://www.w3.org/2000/svg"
        width="1em"
        height="1em"
        viewBox="0 0 24 24"
      >
        <path
          fill="currentColor"
          d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95"
        ></path>
      </svg>
    ),
  },
  {
    name: "Threads",
    to: "https://threads.com/ctrl_bits",
    icon: (
      <svg
        className="size-5"
        xmlns="http://www.w3.org/2000/svg"
        width="1em"
        height="1em"
        viewBox="0 0 24 24"
      >
        <path
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          d="M19.25 8.505c-1.577-5.867-7-5.5-7-5.5s-7.5-.5-7.5 8.995s7.5 8.996 7.5 8.996s4.458.296 6.5-3.918c.667-1.858.5-5.573-6-5.573c0 0-3 0-3 2.5c0 .976 1 2 2.5 2s3.171-1.027 3.5-3c1-6-4.5-6.5-6-4"
          color="currentColor"
        ></path>
      </svg>
    ),
  },
  {
    name: "Instagram",
    to: "https://instagram.com/ctrl_bits",
    icon: (
      <svg
        className="size-5"
        xmlns="http://www.w3.org/2000/svg"
        width="1em"
        height="1em"
        viewBox="0 0 24 24"
      >
        <path
          fill="currentColor"
          d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4zm9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8A1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5a5 5 0 0 1-5 5a5 5 0 0 1-5-5a5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3a3 3 0 0 0 3 3a3 3 0 0 0 3-3a3 3 0 0 0-3-3"
        ></path>
      </svg>
    ),
  },
];

const contactInfo = [
  {
    icon: <MapPin className="h-4 w-4" />,
    text: "Kathmandu, Nepal",
  },
  {
    icon: <Phone className="h-4 w-4" />,
    text: "+977-9709659012",
  },
  {
    icon: <Mail className="h-4 w-4" />,
    text: "hello@ctrlbits.xyz",
  },
];

export default function FooterSection() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [loaded, setLoaded] = useState(false);

  // Animation on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoaded(true);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  interface SubscribeEvent extends React.FormEvent<HTMLFormElement> {}

  const handleSubscribe = async (e: SubscribeEvent): Promise<void> => {
    e.preventDefault();
    if (!email || isSubmitting) return;

    setIsSubmitting(true);
    try {
      await axios.post(`https://api.ctrlbits.xyz/api/subscribers/`, { email });
      setIsSubscribed(true);
      setEmail("");
    } catch (error) {
      console.error("Subscription failed:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer className="relative bg-muted/10 pt-16 pb-12 md:pt-24 md:pb-16 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute -top-32 -right-32 h-64 w-64 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      </div>

      <div
        className={`mx-auto max-w-6xl px-6 transition-all duration-700 ${
          loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand Column */}
          <div className="space-y-6">
            <Link to="/" aria-label="go home" className="block">
              <div className="flex items-center space-x-2">
                <img
                  src={Logo}
                  alt="CtrlBits Logo"
                  className="h-10 w-auto invert dark:invert-0"
                />
              </div>
            </Link>

            <p className="text-sm text-muted-foreground max-w-xs">
              Crafting powerful, scalable, and future-ready digital solutions
              that transform businesses bit by bit.
            </p>

            {/* Social Links - Desktop */}
            <div className="hidden md:flex space-x-3">
              {socialLinks.map((link, index) => (
                <Link
                  key={index}
                  to={link.to}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.name}
                  className="text-muted-foreground hover:text-primary flex items-center justify-center h-9 w-9 rounded-full bg-primary/5 ring-1 ring-primary/10 hover:ring-primary/30 hover:bg-primary/10 transition-all duration-200"
                >
                  {link.icon}
                </Link>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">
              Quick Links
            </h3>
            <ul className="space-y-4">
              {links.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.to}
                    className="text-muted-foreground hover:text-primary flex items-center group transition-all duration-200"
                  >
                    <span className="mr-1.5 h-1 w-1 rounded-full bg-primary/40 group-hover:bg-primary group-hover:w-2 transition-all duration-200"></span>
                    <span>{link.title}</span>
                    <ArrowUpRight className="ml-1.5 h-3 w-3 opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">
              Contact Us
            </h3>
            <ul className="space-y-4">
              {contactInfo.map((item, index) => (
                <li
                  key={index}
                  className="flex items-center text-sm text-muted-foreground"
                >
                  <div className="mr-3 flex h-6 w-6 items-center justify-center rounded-full bg-primary/10">
                    {item.icon}
                  </div>
                  {item.text}
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-6">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">
              Stay Updated
            </h3>
            <p className="text-sm text-muted-foreground">
              Subscribe to our newsletter for the latest updates and insights.
            </p>
            <form onSubmit={handleSubscribe} className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full rounded-lg border-0 bg-primary/5 py-2.5 pl-4 pr-12 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                disabled={isSubmitting || isSubscribed}
                required
              />
              <button
                type="submit"
                className="absolute inset-y-0 right-0 flex items-center justify-center px-3 text-primary disabled:text-muted-foreground/50"
                disabled={isSubmitting || isSubscribed}
              >
                {isSubmitting ? (
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                ) : isSubscribed ? (
                  <Heart className="h-4 w-4 text-primary animate-pulse" />
                ) : (
                  <Send className="h-4 w-4" />
                )}
              </button>
            </form>
            {isSubscribed && (
              <p className="text-xs text-primary animate-fade-in">
                Thanks for subscribing!
              </p>
            )}
          </div>
        </div>

        {/* Divider */}
        <div className="mt-12 border-t border-muted/20 pt-8">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            {/* Copyright */}
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Ctrl Bits. All rights reserved.
            </p>

            {/* Social Links - Mobile */}
            <div className="flex md:hidden space-x-4 mt-4 md:mt-0">
              {socialLinks.map((link, index) => (
                <Link
                  key={index}
                  to={link.to}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.name}
                  className="text-muted-foreground hover:text-primary transition-colors duration-200"
                >
                  {link.icon}
                </Link>
              ))}
            </div>

            {/* Legal Links */}
            <div className="flex space-x-6">
              <Link
                to="/privacy"
                className="text-xs text-muted-foreground hover:text-primary transition-colors duration-200"
              >
                Privacy Policy
              </Link>
              <Link
                to="/terms"
                className="text-xs text-muted-foreground hover:text-primary transition-colors duration-200"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Animation keyframes */}
      <style>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-in-out;
        }
      `}</style>
    </footer>
  );
}
