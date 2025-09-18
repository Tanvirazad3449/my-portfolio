"use client";

import { useSections } from "@/providers/SectionProvider";
import { UrlSidebar } from "./UrlBar";
import ThemeSwitcher from "./ThemeSwitcher";
import { MobileNavBar } from "./NavBar";
import { useRouter } from "next/navigation";

type Props = {
  title: string;
  subTitle: string;
pills: string[];
};
function Pill({ text }: { text: string }) {
  return (
    <span className="hidden md:flex px-2 py-1 bg-primary/5 rounded-sm mr-1">
      <p className="text-xs text-primary/60">{text}</p>
    </span>
  )
}
export default function HeaderBar({ title, subTitle, pills }: Props) {
  const { activeSection, handleActiveSection } = useSections();

const router = useRouter()
  return (
    <header className="md:rounded-2xl sticky top-0 bg-background backdrop-blur border-b-2 border-b-primary/5 md:border-none md:bg-border px-2 z-50 mx-0 md:px-4 py-3 mb-4 flex items-center justify-between shrink-0">
      <div className="flex flex-col ml-2 cursor-pointer" onClick={()=>router.push('/')}>
        <div className="flex flex-row items-center">
          <p className="text-sm md:text-lg font-semibold tracking-tight mr-2">{title}</p>
          {
            pills.map(pill => (<Pill key={pill} text={pill} />) )
          }
        </div>

        <p className="text-sm text-primary/80">{subTitle}</p>
      </div>

      <div className="flex flex-row">
        <ThemeSwitcher />
        <UrlSidebar />
        <MobileNavBar activeSection={activeSection} onSelect={handleActiveSection} />
      </div>
    </header>
  );
}
