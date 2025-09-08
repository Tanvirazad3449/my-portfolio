"use client";

import { useSections } from "@/providers/SectionProvider";
import NavList from "./NavList";

export default function SidebarNav() {
      const { sections, active, setActive } = useSections();
  
  return (
    <aside className="hidden md:flex flex-col w-64 rounded-2xl bg-background backdrop-blur shadow-xl border-0 p-4 h-full">
      <NavList sections={sections} active={active} onSelect={setActive} />
    </aside>
  );
}
