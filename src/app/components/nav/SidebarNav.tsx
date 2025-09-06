"use client";

import NavList from "./NavList";

type Props = {
  sections: SectionType[];
  active: string;
  onSelect: (key: string) => void;
};

export default function SidebarNav({ sections, active, onSelect }: Props) {
  return (
    <aside className="hidden md:flex flex-col w-64 rounded-2xl bg-white/90 backdrop-blur shadow-xl ring-1 ring-black/5 p-4 h-full">
      <NavList sections={sections} active={active} onSelect={onSelect} />
    </aside>
  );
}
