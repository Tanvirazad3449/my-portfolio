"use client";

import { useRouter, usePathname } from "next/navigation";
import React, { createContext, useContext, useState, useEffect } from "react";

type SectionContextValue = {
  activeSection: string;
  handleActiveSection: (key: string) => void;
};

const SectionContext = createContext<SectionContextValue | null>(null);

export const sections: string[] = ["About", "Experience", "Education", "Blogs", "Skills", "Contact"];

export function SectionProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  const [activeSection, setActiveSection] = useState(sections[0]);

  useEffect(() => {
    if (!pathname) return;

    const firstSeg =
      pathname === "/"
        ? sections[0].toLowerCase()
        : pathname.replace(/^\/+/, "").split("/")[0].toLowerCase();

    const match = sections.find((s) => s.toLowerCase() === firstSeg);
    if (match && match !== activeSection) setActiveSection(match);
  }, [pathname, activeSection, setActiveSection]);

  function handleActiveSection(newActiveSection: string) {
    console.log("handleActiveSection ->", newActiveSection);
    const lower = newActiveSection.toLowerCase();
    setActiveSection(newActiveSection);
    router.push(`/${lower}`);
  }

  return (
    <SectionContext.Provider value={{ activeSection, handleActiveSection }}>
      {children}
    </SectionContext.Provider>
  );
}

export function useSections() {
  const ctx = useContext(SectionContext);
  if (!ctx) throw new Error("useSections must be used within SectionProvider");
  return ctx;
}
