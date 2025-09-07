"use client";

import React, { createContext, useContext, useState } from "react";

export type Section = { key: string; value: string };

type SectionContextValue = {
  sections: string[];
  active: string;
  setActive: (key: string) => void;
};

const SectionContext = createContext<SectionContextValue | null>(null);

export function SectionProvider({
  initialSections,
  initialActive,
  children,
}: {
  initialSections: string[];
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



export const sections: string[] = ["About","Experience","Education","Blogs"];