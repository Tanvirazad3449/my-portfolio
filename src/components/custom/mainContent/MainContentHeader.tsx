"use client";

import React, { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { CardTitle } from "@/components/ui/card";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { sections, useSections } from "@/providers/SectionProvider";
import { usePathname, useRouter } from "next/navigation";
import { FlashingBar } from "./MainContentContainer";

type MainContentHeaderButtonTypes = {
  label: string;
  onClick: () => void;
  leftIconComponent?: ReactNode;
  rightIconComponent?: ReactNode;
  className?: string;
}
export function MainContentHeaderButton({ label, onClick, leftIconComponent, rightIconComponent, className }: MainContentHeaderButtonTypes) {
  return (
    <Button
      variant="default"
      size="sm"
      className={`cursor-pointer bg-transparent p-0 m-0 h-fit px-0 pr-0 pl-0 -mr-2 md:-mr-4 -ml-3 shadow-none hover:bg-transparent hover:opacity-80 font-bold hover:text-primary ${className}`}
      aria-label={label}
      onClick={onClick}
    >
      {leftIconComponent}
      {label}
      {rightIconComponent}
    </Button>
  )
}
export default function MainContentHeader() {
  const pathname = usePathname();
  const router = useRouter()
  const { activeSection, handleActiveSection } = useSections()
  const nextSection = getNextSection(sections, activeSection)
  const showBackButton = pathname.replace(/^\/+/, "").split("/")[1]?.length > 0
  return showBackButton ? (
    <MainContentHeaderButton
      label={`Back to ${activeSection}`}
      leftIconComponent={<ArrowLeft size={24} />}
      onClick={() => router.push(`/${activeSection.toLowerCase()}`)} />
  ) : (
    <div className="flex flex-row justify-between items-center w-full">

      <CardTitle className={`font-bold md:text-3xl`}>{activeSection}</CardTitle>
      
      <MainContentHeaderButton
        className="md:hidden"
        label={`To My ${nextSection}`}
        rightIconComponent={<ArrowRight size={24} />}
        onClick={() => handleActiveSection(nextSection)} />
    </div>
  );
}

function getNextSection(sections: string[], activeSection: string): string {
  let currentIndex = sections.findIndex((val) => val === activeSection);
  if (currentIndex === -1) currentIndex = 0;

  const nextIndex = currentIndex === sections.length - 1 ? 0 : currentIndex + 1;
  return sections[nextIndex];
}
