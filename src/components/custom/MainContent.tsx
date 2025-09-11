"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { useSections } from "@/providers/SectionProvider";
import { useFirestoreCollection } from "@/data/useFirestoreCollection";
import { useState } from "react";
import SectionCard from "./SectionCard";
import SectionHeader from "./SectionHeader";
import { Skeleton } from "../ui/skeleton";

export default function MainContent() {
  const { sections, active, setActive } = useSections();
  const { data, loading, error } = useFirestoreCollection<BlogType>(active.toLowerCase());
  const [selectedItem, setSelectedItem] = useState({
    section: active,
    content: ""
  })
  if (loading) return <SectionSkeletonCard />;
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
        <Card className="h-full rounded-2xl border overflow-hidden flex flex-col shadow-none">
          <CardHeader className="flex flex-row justify-between">
            <SectionHeader
              active={active}
              showingDetail={(selectedItem.content?.length ?? 0) > 0 && active === selectedItem.section}
              onBack={() => setSelectedItem({ section: active, content: "" })}
              onNext={(next) => setActive(next)}
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


function SectionSkeletonCard() {
  return (
    <Card
      className="h-full rounded-2xl border overflow-hidden flex flex-col shadow-none"
      aria-busy="true"
      aria-live="polite"
    >
      <CardHeader>
        <Skeleton className="h-8 w-1/2" />
      </CardHeader>

      <CardContent className="grow overflow-auto flex flex-col gap-2">
        <Skeleton className="h-14 w-full" />
        <Skeleton className="h-7 w-2/4" />
        <Skeleton className="h-14 w-3/4" />
        <Skeleton className="h-7 w-2/4" />
        <Skeleton className="h-7 w-1/4" />
        <Skeleton className="h-7 w-full mt-4" />
        <Skeleton className="h-21 w-2/4" />
        <Skeleton className="h-7 w-3/4" />
        <Skeleton className="h-7 w-full" />
        <Skeleton className="h-7 w-2/4" />
        <Skeleton className="h-14 w-3/4" />
        <Skeleton className="h-7 w-2/4" />
        <Skeleton className="h-7 w-1/4" />
        <Skeleton className="h-7 w-full mt-4" />
      </CardContent>

    </Card>
  );
}