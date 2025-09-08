"use client";

import HeaderBar from "../components/custom/layout/HeaderBar";
import SidebarNav from "../components/custom/layout/SidebarNav";
import MainContent from "../components/custom/MainContent";
import { SectionProvider, sections } from "../providers/SectionProvider";


export default function SidebarPage() {
  return (
    <SectionProvider initialSections={sections} initialActive={sections[0]}>
      <div className="h-screen bg-background p-4 md:p-6 flex flex-col">
        <HeaderBar title="Tanvir Azad" />
        <div className="flex-1 min-h-0 flex gap-4">
          <SidebarNav />
          <main className="flex-1 min-h-0">
            <MainContent/>
          </main>
        </div>
      </div>
    </SectionProvider>
  );
}
