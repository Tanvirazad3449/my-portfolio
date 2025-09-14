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
  SheetFooter,
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
    <nav className={className ?? "space-y-2 relative"}>
      {sections.map((section) => {
        const item = (
          <div key={section} className="relative">
            {activeSection === section && (
              <Highlight
                layoutId="highlight"
                className="absolute inset-0 rounded-md text-primary bg-primary/10  cursor-pointer"
              />
            )}
            <MotionButton
              // whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              variant="ghost"
              className="text-primary hover:text-primary/60 cursor-pointer"
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
    <aside className="hidden md:flex flex-col w-56 rounded-2xl backdrop-blur bg-border p-4 h-full">
      <NavList activeSection={activeSection} onSelect={handleActiveSection} />
    </aside>
  );
}
