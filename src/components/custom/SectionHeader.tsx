"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { CardTitle } from "@/components/ui/card";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { sections } from "@/providers/SectionProvider";

type Props = {
  active: string;
  showingDetail: boolean;        // true when selectedItem.content.length > 0
  onBack: () => void;            // e.g. () => setSelectedItem({ section: active, content: "" })
onNext: (arg0: string)=> void;
};

export default function SectionHeader({
  active,
  showingDetail,
  onBack,
  onNext
}: Props) {

  let nextIndex = sections.findIndex((val)=>val === active)
  nextIndex = nextIndex === sections.length - 1 ? 0 : nextIndex + 1
const nextSection = sections[nextIndex]
  return showingDetail ? (
    <Button
      variant="ghost"
      size="default"
      className={`cursor-pointer hover:text-primary hover:bg-accent/10`}
      aria-label={`Back to ${active}`}
      onClick={onBack}
    >
      <ArrowLeft size={24} className="mr-2" />
      Back to {active}
    </Button>
  ) : (
    <div className="flex flex-row justify-between w-full">

    <CardTitle className={`text-2xl font-bold`}>{active}</CardTitle>
    <Button
      variant="ghost"
      size="default"
      className={`cursor-pointer hover:text-primary/60 text-primary/60 hover:bg-accent/10`}
      aria-label={`To ${nextSection}`}
      onClick={()=>onNext(nextSection)}
    >
      To {nextSection}
      <ArrowRight size={24} />
    </Button>
    </div>
  );
}
