"use client";

import { useSections } from "@/providers/SectionProvider";
import MobileSheetNav from "./MobileSheetNav";
import { ContactSidebar } from "./RightSidebar";
import ThemeSwitcher from "../ThemeSwitcher";

type Props = {
  title: string;
 
};

export default function HeaderBar({ title }: Props) {
    const { sections, active, setActive } = useSections();


  return (
    <header className="rounded-2xl bg-card backdrop-blur border px-4 py-3 mb-4 flex items-center justify-between shrink-0">
      <h3 className="text-lg md:text-lg font-semibold tracking-tight">{title}</h3>
      <div className="flex flex-row">
        <ThemeSwitcher/>
      <ContactSidebar/>
      <MobileSheetNav sections={sections} active={active} onSelect={setActive} />
      </div>
    </header>
  );
}
