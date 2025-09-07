"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

type Props = {
  sections: string[];
  active: string;
  onSelect: (key: string) => void;
  /** If true, consumers can layer a SheetClose wrapper around each item. */
  renderItemWrapper?: (child: React.ReactNode, key: string) => React.ReactNode;
  className?: string;
};

const MotionButton = motion(Button);
const Highlight = motion.div;

export default function NavList({
  sections,
  active,
  onSelect,
  renderItemWrapper,
  className,
}: Props) {
  return (
    <nav className={className ?? "space-y-2 relative"}>
      {sections.map((section) => {
        const item = (
          <div key={section} className="relative">
            {active === section && (
              <Highlight
                layoutId="highlight"
                className="absolute inset-0 rounded-md bg-zinc-100"
              />
            )}
            <MotionButton
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              variant="ghost"
              className={`w-full justify-start cursor-pointer relative z-10 ${
                active === section ? "text-black-700 font-medium" : ""
              }`}
              aria-current={active === section ? "page" : undefined}
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
