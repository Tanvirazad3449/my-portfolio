"use client";

import { Menu } from "lucide-react";
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
import NavList from "./NavList";


type Props = {
  sections: SectionType[];
  active: string;
  onSelect: (key: string) => void;
};

export default function MobileSheetNav({ sections, active, onSelect }: Props) {

  return (
    <div className="md:hidden">
      <Sheet>
        <SheetTrigger asChild>
          {/* Swap for: <Button variant="outline">Open</Button> if you want text */}
          <Button variant="ghost" size="icon" aria-label="Open navigation">
            <Menu size={24} />
          </Button>
        </SheetTrigger>

        <SheetContent side="left" className="w-64">
          <SheetHeader>
            <SheetTitle>Navigation</SheetTitle>
            <SheetDescription>Choose a section to view its content.</SheetDescription>
          </SheetHeader>

          {/* Content area per your example */}
          <div className="grid flex-1 auto-rows-min gap-6 px-4">
            <NavList
              sections={sections}
              active={active}
              onSelect={(key) => {
                onSelect(key);
                // Sheet will close because each item is wrapped in <SheetClose>
              }}
              renderItemWrapper={(child, key) => (
                <SheetClose asChild key={key}>
                  {child}
                </SheetClose>
              )}
            />
          </div>

          <SheetFooter>
            <SheetClose asChild>
              <Button variant="outline">Close</Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
}
