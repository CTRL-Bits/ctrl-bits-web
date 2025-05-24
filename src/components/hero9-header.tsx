import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import React from "react";
import { useScroll, motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";
import { ModeToggle } from "@/components/mode-toggle";
import { useTheme } from "./theme-provider";

const menuItems = [
  { name: "Solutions", to: "/solutions" },
  { name: "About", to: "/about" },
  { name: "Our Works", to: "/works" },
  { name: "Contact", to: "/contact" },
];

const HeroHeader = () => {
  const [menuState, setMenuState] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  const { scrollYProgress } = useScroll();
  const { theme } = useTheme();

  React.useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      setScrolled(latest > 0.05);
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

  return (
    <header className="relative z-50">
      <nav className="fixed inset-x-0 top-0 z-50 w-full pt-4">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className={cn(
              "relative overflow-hidden rounded-2xl border border-border/50 px-6 py-4 transition-all duration-500 ease-out lg:px-8",
              scrolled
                ? "bg-background/80 backdrop-blur-xl shadow-lg shadow-black/5 border-border/80"
                : "bg-background/60 backdrop-blur-md"
            )}
          >
            {/* Subtle gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-background/20 to-transparent pointer-events-none" />

            <div className="relative flex items-center justify-between">
              {/* Logo Section */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <Link
                  to="/"
                  aria-label="home"
                  className="group flex items-center space-x-2 transition-opacity duration-200 hover:opacity-80"
                >
                  {theme === "dark" ? (
                    <img
                      src="/LogoWhiteNav.png"
                      alt="CtrlBits Logo"
                      className="h-8 w-auto transition-all duration-200 group-hover:brightness-110"
                    />
                  ) : (
                    <img
                      src="/LogoBlackNav.png"
                      alt="CtrlBits Logo"
                      className="h-8 w-auto transition-all duration-200 group-hover:brightness-90"
                    />
                  )}
                </Link>
              </motion.div>

              {/* Desktop Navigation */}
              <div className="hidden lg:flex lg:items-center lg:space-x-1">
                {menuItems.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{
                      duration: 0.5,
                      delay: 0.1 + index * 0.1,
                      ease: "easeOut",
                    }}
                  >
                    <Link
                      to={item.to}
                      className="group relative px-4 py-2 text-sm font-medium text-muted-foreground transition-all duration-200 hover:text-foreground"
                    >
                      <span className="relative z-10">{item.name}</span>
                      <div className="absolute inset-0 rounded-lg bg-accent/50 opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
                    </Link>
                  </motion.div>
                ))}
              </div>

              {/* Desktop Actions */}
              <div className="hidden lg:flex lg:items-center lg:space-x-4">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.6 }}
                >
                  <ModeToggle />
                </motion.div>

                <div className="flex items-center space-x-3">
                  {[
                    { name: "X", url: "https://x.com/ctrl_bits" },
                    { name: "IG", url: "https://instagram.com/ctrl_bits" },
                    { name: "FB", url: "https://facebook.com/ctrlbits" },
                  ].map((social, index) => (
                    <motion.a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ y: -10, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.3, delay: 0.7 + index * 0.1 }}
                      className="group text-xs font-medium text-muted-foreground transition-all duration-200 hover:text-foreground hover:scale-105"
                    >
                      {social.name}
                    </motion.a>
                  ))}
                </div>
              </div>

              {/* Mobile Actions */}
              <div className="flex items-center space-x-3 lg:hidden">
                <ModeToggle />

                <motion.button
                  onClick={() => setMenuState(!menuState)}
                  aria-label={menuState ? "Close Menu" : "Open Menu"}
                  className="relative flex h-10 w-10 items-center justify-center rounded-lg transition-colors duration-200 hover:bg-accent/50"
                  whileTap={{ scale: 0.95 }}
                >
                  <AnimatePresence mode="wait">
                    {!menuState ? (
                      <motion.div
                        key="menu"
                        initial={{ rotate: -90, opacity: 0 }}
                        animate={{ rotate: 0, opacity: 1 }}
                        exit={{ rotate: 90, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Menu className="h-5 w-5" />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="close"
                        initial={{ rotate: 90, opacity: 0 }}
                        animate={{ rotate: 0, opacity: 1 }}
                        exit={{ rotate: -90, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <X className="h-5 w-5" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {menuState && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="absolute inset-x-0 top-full mt-2 lg:hidden"
            >
              <div className="mx-auto max-w-7xl px-4 sm:px-6">
                <div className="overflow-hidden rounded-2xl border border-border/50 bg-background/95 backdrop-blur-xl p-6 shadow-xl shadow-black/10">
                  <div className="space-y-4">
                    {menuItems.map((item, index) => (
                      <motion.div
                        key={index}
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{
                          duration: 0.3,
                          delay: index * 0.1,
                          ease: "easeOut",
                        }}
                      >
                        <Link
                          to={item.to}
                          onClick={() => setMenuState(false)}
                          className="group block rounded-lg p-3 text-base font-medium text-muted-foreground transition-all duration-200 hover:bg-accent/50 hover:text-foreground"
                        >
                          {item.name}
                        </Link>
                      </motion.div>
                    ))}

                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.3, delay: 0.4 }}
                      className="border-t border-border/50 pt-4"
                    >
                      <div className="flex items-center justify-center space-x-6">
                        {[
                          { name: "X", url: "https://x.com/ctrl_bits" },
                          {
                            name: "Instagram",
                            url: "https://instagram.com/ctrl_bits",
                          },
                          {
                            name: "Facebook",
                            url: "https://facebook.com/ctrlbits",
                          },
                        ].map((social) => (
                          <a
                            key={social.name}
                            href={social.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm font-medium text-muted-foreground transition-colors duration-200 hover:text-foreground"
                          >
                            {social.name}
                          </a>
                        ))}
                      </div>
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
};

export default HeroHeader;
