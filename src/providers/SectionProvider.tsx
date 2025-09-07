"use client";

import React, { createContext, useContext, useState } from "react";

export type Section = { key: string; value: string };

type SectionContextValue = {
  sections: Section[];
  active: string;
  setActive: (key: string) => void;
};

const SectionContext = createContext<SectionContextValue | null>(null);

export function SectionProvider({
  initialSections,
  initialActive,
  children,
}: {
  initialSections: Section[];
  initialActive: string;
  children: React.ReactNode;
}) {
  const [active, setActive] = useState(initialActive);

  return (
    <SectionContext.Provider
      value={{ sections: initialSections, active, setActive }}
    >
      {children}
    </SectionContext.Provider>
  );
}

export function useSections() {
  const ctx = useContext(SectionContext);
  if (!ctx) throw new Error("useSections must be used within SectionProvider");
  return ctx;
}



export const sections: SectionType[] = [
  { key: "Experience", value: "I have worked as a Frontend Developer building React and Next.js apps." },
  { key: "Education", value: "Bachelor of Science in Computer Science, North South University." },
  { key: "Blogs", value: "I write about JavaScript, React, and Web Performance on my dev blog." },
];