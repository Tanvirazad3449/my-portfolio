"use client";

import { useState } from "react";
import HeaderBar from "./components/layout/HeaderBar";
import SidebarNav from "./components/nav/SidebarNav";
import ContentPanel from "./components/content/ContentPanel";

export default function SidebarPage() {
  const [active, setActive] = useState("Experience");

  const sections = [
    {
      key: "Experience",
      value: "I have worked as a Frontend Developer building React and Next.js apps."
    },
    {
      key: "Education",
      value: "Bachelor of Science in Computer Science, North South University."
    },
    {
      key: "Blogs",
      value: "I write about JavaScript, React, and Web Performance on my dev blog."
    }
  ]

  return (
    <div className="h-screen bg-gray-100 p-4 md:p-6 flex flex-col">
      <HeaderBar
        title="Tanvir Azad"
        sections={sections}
        active={active}
        onSelect={setActive}
      />

      {/* Row fills the remaining viewport height */}
      <div className="flex-1 min-h-0 flex gap-4">
        {/* Desktop Sidebar */}
        <SidebarNav sections={sections} active={active} onSelect={setActive} />

        {/* Main Content */}
        <main className="flex-1 min-h-0">
          <ContentPanel sections={sections} active={active} />
        </main>
      </div>
    </div>
  );
}
