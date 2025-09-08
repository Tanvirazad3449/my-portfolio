"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { useSections } from "@/providers/SectionProvider";
import { useFirestoreCollection } from "@/data/useFirestoreCollection";
import { useState } from "react";
import SectionCard from "./SectionCard";
import SectionHeader from "./SectionHeader";

export default function MainContent() {
  const { sections, active, setActive } = useSections();
  const { data, loading, error } = useFirestoreCollection<BlogType>(active.toLowerCase());
  const [selectedItem, setSelectedItem] = useState({
    section: active,
    content: ""
  })
  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">Error: {error.message}</p>;
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
        <Card className="h-full rounded-2xl shadow-xl border-0 overflow-hidden flex flex-col">
          <CardHeader className="flex flex-row justify-between">
            <SectionHeader
              active={active}
              showingDetail={(selectedItem.content?.length ?? 0) > 0}
              onBack={() => setSelectedItem({ section: active, content: "" })}
            />
          </CardHeader>
          <CardContent className="grow overflow-auto">
            <SectionCard
              data={data}
              active={active}
              selectedItem={selectedItem}
              setSelectedItem={setSelectedItem}
            />
          </CardContent>
        </Card>
      </motion.div>
    </AnimatePresence>
  );
}
