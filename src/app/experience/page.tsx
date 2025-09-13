"use client";

import { useFirestoreCollection } from "@/data/useFirestoreCollection";
import MarkdownView from "@/components/custom/mainContent/MarkdownView";
import MainContentContainer from "@/components/custom/mainContent/MainContentContainer";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import Image from "next/image";

export function ExperienceAccordion({
  logo,
  company,
  location,
  dateRange,
  content,
}: Omit<FirestoreDocType, "id">) {
  return (
    <Accordion type="single" collapsible>
      <AccordionItem value={company || ""}>
        <AccordionTrigger>
          <div className="w-full flex flex-row items-center">
            <Image
              src={logo || "./null.webp"}
              alt={company || ""}
              priority={true}
              width={45}
              height={45}
              className="rounded-full bg-border border"
            />
            <div className="ml-4 text-left">
              <p className="font-semibold">
                {company} ({location})
              </p>
              <p className="opacity-70">{dateRange}</p>
            </div>
          </div>
        </AccordionTrigger>
        <AccordionContent>
          <MarkdownView content={content} className="prose max-w-none overflow-scroll" />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

export default function Experience() {
  const { data, loading, error } = useFirestoreCollection<FirestoreDocType>();

  return (
    <MainContentContainer loading={loading} error={error}>
      {
        data.map((item) => (
          <ExperienceAccordion
            key={item.id}
            logo={item.logo}
            company={item.company}
            location={item.location}
            dateRange={item.dateRange}
            content={item.content}
          />

        ))
      }
    </MainContentContainer>
  );
}

