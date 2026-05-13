import { ArrowUpRight, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import LogoIcon from "@/components/shared/LogoIcon";

const navItems = [
  { label: "Services", to: "/solutions" },
  { label: "Work", to: "/portfolio" },
  { label: "Company", to: "/about" },
  { label: "Blog", to: "https://blog.ctrlbits.com" },
  { label: "Contact", to: "/contact" },
];

export default function NavbarSection() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";

  useEffect(() => {
    setOpen(false);
  }, [location.pathname, location.hash]);

  return (
    <header className="fixed left-0 top-0 z-40 w-full px-4 py-4 md:px-8">
      <nav
        aria-label="Primary navigation"
        className={`liquid-glass-nav relative mx-auto flex max-w-[88rem] items-center justify-between overflow-hidden rounded-full border px-4 py-3 text-[#001ea2] transition-colors md:px-5 ${
          isHome ? "is-on-hero" : "is-on-page text-neutral-950"
        }`}
      >
        <span className="pointer-events-none absolute inset-0 rounded-full bg-white/[0.34]" />
        <span className="pointer-events-none absolute inset-[1px] rounded-full bg-[linear-gradient(135deg,rgba(255,255,255,0.72),rgba(255,255,255,0.16)_38%,rgba(255,255,255,0.36)_100%)]" />
        <span className="pointer-events-none absolute -left-12 -top-16 h-32 w-56 rotate-[-18deg] rounded-full bg-white/70 blur-2xl" />
        <span className="pointer-events-none absolute bottom-0 left-8 right-8 h-px bg-white/70" />
        <span className="pointer-events-none absolute inset-x-10 top-0 h-px bg-white/95" />
        <Link
          to="/"
          aria-label="Ctrl Bits home"
          className="relative z-10 text-current"
        >
          <LogoIcon />
        </Link>

        <div className="relative z-10 hidden items-center gap-6 lg:flex">
          {navItems.map((item) =>
            item.to.startsWith("http") ? (
              <a
                key={item.label}
                href={item.to}
                target="_blank"
                rel="noopener noreferrer"
                className={`text-sm font-semibold transition-colors ${
                  isHome
                    ? "text-[#001ea2]/70 hover:text-[#0058fc]"
                    : "text-neutral-600 hover:text-[#0058fc]"
                }`}
              >
                {item.label}
              </a>
            ) : (
              <NavLink
                key={item.label}
                to={item.to}
                className={({ isActive }) =>
                  `text-sm font-semibold transition-colors ${
                    isActive
                      ? "text-[#0058fc]"
                      : isHome
                        ? "text-[#001ea2]/70 hover:text-[#0058fc]"
                        : "text-neutral-600 hover:text-[#0058fc]"
                  }`
                }
              >
                {item.label}
              </NavLink>
            ),
          )}
        </div>

        <div className="relative z-10 flex items-center gap-2">
          <Link
            to="/contact"
            className="hidden items-center gap-2 rounded-full bg-[#0058fc] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#001ea2] sm:inline-flex"
          >
            Start Project
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </Link>
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((value) => !value)}
            className={`inline-flex h-10 w-10 items-center justify-center rounded-full text-current transition-colors lg:hidden ${
              isHome
                ? "bg-[#0058fc]/10 hover:bg-[#0058fc]/15"
                : "bg-white/[0.14] hover:bg-white/[0.24]"
            }`}
          >
            {open ? (
              <X className="h-5 w-5" aria-hidden="true" />
            ) : (
              <Menu className="h-5 w-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </nav>

      {open && (
        <div className="mx-auto mt-2 max-w-[88rem] rounded-[1.5rem] bg-white p-2 text-neutral-950 shadow-[0_20px_80px_rgba(0,0,0,0.14)] lg:hidden">
          {navItems.map((item) =>
            item.to.startsWith("http") ? (
              <a
                key={item.label}
                href={item.to}
                target="_blank"
                rel="noopener noreferrer"
                className="block rounded-2xl px-4 py-3 text-sm font-semibold hover:bg-neutral-100"
              >
                {item.label}
              </a>
            ) : (
              <Link
                key={item.label}
                to={item.to}
                className="block rounded-2xl px-4 py-3 text-sm font-semibold hover:bg-neutral-100"
              >
                {item.label}
              </Link>
            ),
          )}
        </div>
      )}
    </header>
  );
}
