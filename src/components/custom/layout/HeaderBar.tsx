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

export default function HeaderBar({ title, subTitle, pills }: Props) {
  const { activeSection, handleActiveSection } = useSections();

  const router = useRouter()
  return (
    <header className="md:rounded-2xl sticky top-0 bg-border/50 backdrop-saturate-100 backdrop-blur-sm border border-b-primary/30 md:border-none px-2 z-50 mx-0 md:px-4 py-3 mb-4 flex items-center justify-between shrink-0">
      <div className="flex flex-col ml-2 cursor-pointer" onClick={() => router.push('/')}>
        <div className="flex flex-row items-center">
          <h1 className="text-sm md:text-xl font-semibold tracking-tight mr-2">{title}</h1>
          {/* <div className="flex-row gap-2 hidden md:flex">
            {pills.map(pill => (<Pill key={pill} text={pill} />))}
          </div> */}
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
