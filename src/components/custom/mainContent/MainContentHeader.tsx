"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { CardTitle } from "@/components/ui/card";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { sections, useSections } from "@/providers/SectionProvider";
import { usePathname, useRouter } from "next/navigation";

export default function MainContentHeader() {
  const pathname = usePathname();
  const router = useRouter()
  const { activeSection, handleActiveSection } = useSections()
  const nextSection = getNextSection(sections, activeSection)
  const showBackButton = pathname.replace(/^\/+/, "").split("/")[1]?.length > 0
  return showBackButton ? (
    <Button
      variant="ghost"
      size="default"
      className={`cursor-pointer hover:text-primary hover:bg-accent/10`}
      aria-label={`Back to ${activeSection}`}
      onClick={()=>router.push(`/${activeSection.toLowerCase()}`)}
    >
      <ArrowLeft size={24} className="mr-2" />
      Back to {activeSection}
    </Button>
  ) : (
    <div className="flex flex-row justify-between w-full">

      <CardTitle className={`text-2xl font-bold`}>{activeSection}</CardTitle>
      <Button
        variant="ghost"
        size="default"
        className={`cursor-pointer hover:text-primary/60 text-primary/60 hover:bg-accent/10`}
        aria-label={`To ${nextSection}`}
        onClick={() => handleActiveSection(nextSection)}
      >
        To {nextSection}
        <ArrowRight size={24} />
      </Button>
    </div>
  );
}

function getNextSection(sections: string[], activeSection: string): string {
  let currentIndex = sections.findIndex((val) => val === activeSection);
  if (currentIndex === -1) currentIndex = 0;

  const nextIndex = currentIndex === sections.length - 1 ? 0 : currentIndex + 1;
  return sections[nextIndex];
}
