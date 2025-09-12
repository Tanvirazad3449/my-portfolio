"use client";

import { useSections } from "@/providers/SectionProvider";
import { ContactSidebar } from "./ContactBar";
import ThemeSwitcher from "./ThemeSwitcher";
import { MobileNavBar } from "./NavBar";

type Props = {
  title: string;
  subTitle: string;
pills: string[];
};
function Pill({ text }: { text: string }) {
  return (
    <span className="hidden md:flex px-2 py-1 bg-primary/10 rounded-sm mr-1">
      <p className="text-xs text-primary/60">{text}</p>
    </span>
  )
}
export default function HeaderBar({ title, subTitle, pills }: Props) {
  const { activeSection, handleActiveSection } = useSections();


  return (
    <header className="rounded-2xl bg-card backdrop-blur border px-4 py-3 mb-4 flex items-center justify-between shrink-0">
      <div className="flex flex-col ml-2">
        <div className="flex flex-row items-center">
          <p className="text-sm md:text-lg font-semibold tracking-tight mr-2">{title}</p>
          {
            pills.map(pill => (<Pill key={pill} text={pill} />) )
          }
        </div>

        <p className="text-sm text-primary/60">{subTitle}</p>
      </div>

      <div className="flex flex-row">
        <ThemeSwitcher />
        <ContactSidebar />
        <MobileNavBar activeSection={activeSection} onSelect={handleActiveSection} />
      </div>
    </header>
  );
}
