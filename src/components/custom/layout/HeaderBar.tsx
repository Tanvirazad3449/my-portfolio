"use client";

import { useSections } from "@/providers/SectionProvider";
import MobileSheetNav from "./MobileSheetNav";

type Props = {
  title: string;
 
};

export default function HeaderBar({ title }: Props) {
    const { sections, active, setActive } = useSections();

  return (
    <header className="rounded-2xl bg-white/90 backdrop-blur shadow-md ring-1 ring-black/5 px-4 py-3 mb-4 flex items-center justify-between shrink-0">
      <h1 className="text-xl md:text-2xl font-semibold tracking-tight">{title}</h1>
      <MobileSheetNav sections={sections} active={active} onSelect={setActive} />
    </header>
  );
}
