"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

type Props = {
  sections: SectionType[];
  active: string;
};

export default function ContentPanel({ sections, active }: Props) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={active}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.25 }}
        className="h-full"
      >
        <Card className="h-full rounded-2xl shadow-xl ring-1 ring-black/5 overflow-hidden flex flex-col">
          <CardHeader className="shrink-0">
            <CardTitle className="text-2xl font-bold">{active}</CardTitle>
          </CardHeader>
          <CardContent className="grow overflow-auto">
            <div className="prose max-w-none">
              {/* demo long content to show scrolling; remove as needed */}
              <div className="mt-6 space-y-4">
                {Array.from({ length: 24 }).map((_, i) => (
                  <p key={i} className="text-gray-700">
                    This is sample content line {i + 1}. Replace with your actual details to see smooth scrolling within the card.
                  </p>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </AnimatePresence>
  );
}
