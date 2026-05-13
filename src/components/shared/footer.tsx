import { useState } from "react";
import type { FormEvent, ReactNode } from "react";
import { Link } from "react-router-dom";
import {
  ArrowUpRight,
  Facebook,
  Github,
  Heart,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Send,
} from "lucide-react";
import axios from "axios";
import { API_BASE_URL } from "@/services/api";
import LogoIcon from "@/components/shared/LogoIcon";

const footerLinks = [
  { title: "Solutions", to: "/solutions" },
  { title: "Portfolio", to: "/portfolio" },
  { title: "Contact", to: "/contact" },
  { title: "About", to: "/about" },
  { title: "BitsBlog", to: "https://blog.ctrlbits.com" },
];

const serviceLinks = [
  "Web development",
  "App development",
  "Custom software",
  "UI/UX design",
  "Digital marketing",
  "Creative services",
];

const socialLinks: {
  name: string;
  to: string;
  icon: ReactNode;
}[] = [
  {
    name: "X",
    to: "https://x.com/ctrl_bits",
    icon: <XIcon />,
  },
  {
    name: "Instagram",
    to: "https://instagram.com/ctrl.bits",
    icon: <Instagram className="h-4 w-4" aria-hidden="true" />,
  },
  {
    name: "Facebook",
    to: "https://facebook.com/ctrlbits",
    icon: <Facebook className="h-4 w-4" aria-hidden="true" />,
  },
  {
    name: "LinkedIn",
    to: "https://linkedin.com/company/ctrlbits",
    icon: <Linkedin className="h-4 w-4" aria-hidden="true" />,
  },
  {
    name: "GitHub",
    to: "https://github.com/ctrlbits",
    icon: <Github className="h-4 w-4" aria-hidden="true" />,
  },
];

const contactInfo = [
  {
    icon: <MapPin className="h-4 w-4" aria-hidden="true" />,
    text: "Kathmandu, Nepal",
  },
  {
    icon: <Phone className="h-4 w-4" aria-hidden="true" />,
    text: "+977-9709659012",
    href: "tel:+9779709659012",
  },
  {
    icon: <Mail className="h-4 w-4" aria-hidden="true" />,
    text: "hi@ctrlbits.com",
    href: "mailto:hi@ctrlbits.com",
  },
];

export default function FooterSection() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = async (
    e: FormEvent<HTMLFormElement>,
  ): Promise<void> => {
    e.preventDefault();
    if (!email || isSubmitting) return;

    setIsSubmitting(true);
    try {
      await axios.post(`${API_BASE_URL}/subscribers/`, { email });
      setIsSubscribed(true);
      setEmail("");
    } catch (error) {
      console.error("Subscription failed:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer className="relative overflow-hidden bg-[#05070d] px-4 pt-20 text-white md:px-8 md:pt-24">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_16%_0%,rgba(0,88,252,0.18),transparent_34%),radial-gradient(circle_at_88%_100%,rgba(255,255,255,0.08),transparent_30%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

      <div className="relative mx-auto max-w-[88rem]">
        <div className="grid gap-10 border-b border-white/10 pb-12 lg:grid-cols-[1.1fr_0.8fr_0.8fr_1fr]">
          <div>
            <Link to="/" aria-label="Ctrl Bits home" className="inline-flex">
              <LogoIcon invert={false} className="text-white" />
            </Link>
            <p className="mt-6 max-w-sm text-sm leading-7 text-white/56">
              Web development, app development, custom software, UI/UX design,
              digital marketing, and creative services for teams that need their
              web presence to work with less noise.
            </p>
            <div className="mt-7 flex flex-wrap gap-2">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.to}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.name}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.06] text-white/64 transition-colors hover:border-white/20 hover:bg-white/[0.12] hover:text-white"
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>

          <FooterColumn title="Explore">
            {footerLinks.map((link) =>
              link.to.startsWith("http") ? (
                <a
                  key={link.title}
                  href={link.to}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-1.5 text-sm text-white/56 transition-colors hover:text-white"
                >
                  {link.title}
                  <ArrowUpRight
                    className="h-3.5 w-3.5 opacity-0 transition-opacity group-hover:opacity-100"
                    aria-hidden="true"
                  />
                </a>
              ) : (
                <Link
                  key={link.title}
                  to={link.to}
                  className="group inline-flex items-center gap-1.5 text-sm text-white/56 transition-colors hover:text-white"
                >
                  {link.title}
                  <ArrowUpRight
                    className="h-3.5 w-3.5 opacity-0 transition-opacity group-hover:opacity-100"
                    aria-hidden="true"
                  />
                </Link>
              ),
            )}
          </FooterColumn>

          <FooterColumn title="Capabilities">
            {serviceLinks.map((item) => (
              <span key={item} className="text-sm text-white/56">
                {item}
              </span>
            ))}
          </FooterColumn>

          <div>
            <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-white/38">
              Stay Updated
            </h2>
            <p className="mt-5 text-sm leading-7 text-white/56">
              Occasional notes on websites, apps, software, UI/UX, and digital
              marketing.
            </p>
            <form onSubmit={handleSubscribe} className="mt-5">
              <div className="flex rounded-full border border-white/10 bg-white/[0.07] p-1 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email address"
                  className="min-w-0 flex-1 bg-transparent px-4 text-sm text-white outline-none placeholder:text-white/34"
                  disabled={isSubmitting || isSubscribed}
                  required
                />
                <button
                  type="submit"
                  className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-[#001ea2] transition-colors hover:bg-[#dbe8ff] disabled:bg-white/50"
                  disabled={isSubmitting || isSubscribed}
                  aria-label="Subscribe"
                >
                  {isSubmitting ? (
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-[#001ea2] border-t-transparent" />
                  ) : isSubscribed ? (
                    <Heart className="h-4 w-4" aria-hidden="true" />
                  ) : (
                    <Send className="h-4 w-4" aria-hidden="true" />
                  )}
                </button>
              </div>
            </form>
            {isSubscribed && (
              <p className="mt-3 text-xs text-white/58">
                Thanks for subscribing.
              </p>
            )}
          </div>
        </div>

        <div className="grid gap-8 border-b border-white/10 py-10 md:grid-cols-[1fr_1fr] md:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/34">
              Contact
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              {contactInfo.map((item) => {
                const content = (
                  <>
                    <span className="text-white/44">{item.icon}</span>
                    <span>{item.text}</span>
                  </>
                );

                return item.href ? (
                  <a
                    key={item.text}
                    href={item.href}
                    className="inline-flex items-center gap-2 rounded-full bg-white/[0.06] px-4 py-2 text-sm text-white/58 transition-colors hover:bg-white/[0.10] hover:text-white"
                  >
                    {content}
                  </a>
                ) : (
                  <span
                    key={item.text}
                    className="inline-flex items-center gap-2 rounded-full bg-white/[0.06] px-4 py-2 text-sm text-white/58"
                  >
                    {content}
                  </span>
                );
              })}
            </div>
          </div>

          <p className="text-balance text-5xl font-semibold leading-[0.92] tracking-[-0.075em] text-white md:text-right md:text-7xl">
            Ctrl the code, bit by bit.
          </p>
        </div>

        <div className="flex flex-col gap-4 py-7 text-xs text-white/38 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} Ctrl Bits. All rights reserved.</p>
          <div className="flex gap-5">
            <Link to="/privacy" className="hover:text-white/70">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-white/70">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div>
      <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-white/38">
        {title}
      </h2>
      <div className="mt-5 flex flex-col gap-3">{children}</div>
    </div>
  );
}

function XIcon() {
  return (
    <svg
      className="h-4 w-4"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M13.52 10.67 20.94 2h-1.76l-6.44 7.52L7.6 2H1.67l7.78 11.38L1.67 22h1.76l6.8-7.47L15.67 22h5.93zm-2.41 2.81-.79-1.13L4.05 3.32h2.71l5.06 7.29.79 1.13 6.58 9.48h-2.71z" />
    </svg>
  );
}
