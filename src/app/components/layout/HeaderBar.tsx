"use client";

import MobileSheetNav from "../nav/MobileSheetNav";

type Props = {
  title: string;
  sections: SectionType[];
  active: string;
  onSelect: (key: string) => void;
};

export default function HeaderBar({ title, sections, active, onSelect }: Props) {
  return (
    <header className="rounded-2xl bg-white/90 backdrop-blur shadow-lg ring-1 ring-black/5 px-4 py-3 mb-4 flex items-center justify-between shrink-0">
      <h1 className="text-xl md:text-2xl font-semibold tracking-tight">{title}</h1>
      <MobileSheetNav sections={sections} active={active} onSelect={onSelect} />
    </header>
  );
}
