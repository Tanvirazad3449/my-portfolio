"use client";

import { sections, useSections } from "@/providers/SectionProvider";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetClose,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";

type Props = {
  activeSection: string;
  onSelect: (key: string) => void;
  renderItemWrapper?: (child: React.ReactNode, key: string) => React.ReactNode;
  className?: string;
};

const MotionButton = motion(Button);
const Highlight = motion.div;

function NavList({
  activeSection,
  onSelect,
  renderItemWrapper,
  className,
}: Props) {
  return (
    <nav className={className ?? "space-y-2 relative z-0"}>
      {sections.map((section) => {
        const item = (
          <div key={section} className="relative">
            {activeSection === section && (
              <Highlight
                layoutId="highlight"
                className="absolute inset-0 -z-10 rounded-md bg-secondary-foreground cursor-pointer"
              />
            )}
            <MotionButton
              className={`relative z-10 bg-transparent cursor-pointer hover:bg-transparent hover:text-primary w-full shadow-none justify-start ${activeSection === section ? "text-white font-bold hover:text-white" : "text-primary"}`}
              aria-current={activeSection === section ? "page" : undefined}
              onClick={() => onSelect(section)}
            >
              {section}
            </MotionButton>
          </div>
        );

        return renderItemWrapper ? renderItemWrapper(item, section) : item;
      })}
    </nav>
  );
}



export function MobileNavBar({ activeSection, onSelect }: Props) {

  return (
    <div className="md:hidden">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" aria-label="Open navigation">
            <Menu size={24} />
          </Button>
        </SheetTrigger>

        <SheetContent side="left" className="w-64">
          <SheetHeader className="display: hidden">
            <SheetTitle></SheetTitle>
            <SheetDescription></SheetDescription>
          </SheetHeader>

          <div className="grid flex-1 auto-rows-min gap-6 px-4 py-16">
            <NavList
              activeSection={activeSection}
              onSelect={(key) => {
                onSelect(key);
              }}
              renderItemWrapper={(child, key) => (
                <SheetClose asChild key={key}>
                  {child}
                </SheetClose>
              )}
            />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}

export function NavBar() {
  const { activeSection, handleActiveSection } = useSections();

  return (
    <aside className="hidden md:flex flex-col w-56 rounded-2xl bg-border/50 backdrop-saturate-100 backdrop-blur-sm p-4 h-full">
      <NavList activeSection={activeSection} onSelect={handleActiveSection} />
    </aside>
  );
}
