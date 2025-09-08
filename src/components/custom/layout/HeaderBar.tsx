"use client";

import { useSections } from "@/providers/SectionProvider";
import MobileSheetNav from "./MobileSheetNav";

type Props = {
  title: string;
 
};

export default function HeaderBar({ title }: Props) {
    const { sections, active, setActive } = useSections();

  return (
    <header className="rounded-2xl bg-card backdrop-blur shadow-md border-0 px-4 py-3 mb-4 flex items-center justify-between shrink-0">
      <h1 className="text-xl md:text-2xl font-semibold tracking-tight">{title}</h1>
      <MobileSheetNav sections={sections} active={active} onSelect={setActive} />
    </header>
  );
}
