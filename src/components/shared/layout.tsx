import React from "react";
import FooterSection from "./footer";
import NavbarSection from "./navbar";

interface LayoutProps {
  children: React.ReactNode;
  className?: string;
}

export default function Layout({ children, className = "" }: LayoutProps) {
  return (
    <div className={`min-h-screen w-full ${className}`}>
      <NavbarSection />
      <main className="flex flex-col justify-center items-center ">
        {children}
      </main>

      <FooterSection />
    </div>
  );
}
