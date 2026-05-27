import React from "react";
import { motion, useReducedMotion } from "motion/react";
import FooterSection from "./footer";
import NavbarSection from "./navbar";

interface LayoutProps {
  children: React.ReactNode;
  className?: string;
}

export default function Layout({ children, className = "" }: LayoutProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className={`min-h-screen w-full ${className}`}>
      <NavbarSection />
      <motion.main
        className="w-full"
        initial={shouldReduceMotion ? false : { opacity: 0 }}
        animate={shouldReduceMotion ? undefined : { opacity: 1 }}
        transition={{ duration: 0.28, ease: "easeOut" }}
      >
        {children}
      </motion.main>

      <FooterSection />
    </div>
  );
}
