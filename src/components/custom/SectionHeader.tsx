"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { CardTitle } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";

type Props = {
  active: string;
  showingDetail: boolean;        // true when selectedItem.content.length > 0
  onBack: () => void;            // e.g. () => setSelectedItem({ section: active, content: "" })
};

export default function SectionHeader({
  active,
  showingDetail,
  onBack,
}: Props) {
  return showingDetail ? (
    <Button
      variant="ghost"
      size="default"
      className={`cursor-pointer hover:text-primary-hover`}
      aria-label={`Back to ${active}`}
      onClick={onBack}
    >
      <ArrowLeft size={24} className="mr-2" />
      Back to {active}
    </Button>
  ) : (
    <CardTitle className={`text-2xl font-bold`}>{active}</CardTitle>
  );
}
