import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import Image from "next/image";
import MarkdownView from "@/components/custom/mainContent/MarkdownView";

export default function MdAccordion({
  logo,
  company,
  location,
  dateRange,
  content,
}: Omit<FirestoreDocType, "id">) {
  return (
    <Accordion type="single" collapsible>
      <AccordionItem value={company || ""}>
        <AccordionTrigger className="py-0 pb-6">
          <div className="w-full flex flex-row items-center cursor-pointer">
            <Image
              src={logo || "/null.webp"}
              alt={company || ""}
              priority={true}
              width={45}
              height={45}
              className="rounded-full bg-border border border-primary/10"
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
