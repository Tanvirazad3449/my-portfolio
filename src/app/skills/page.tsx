"use client";

import { useFirestoreCollection } from "@/data/useFirestoreCollection";
import MainContentContainer from "@/components/custom/mainContent/MainContentContainer";
import MarkdownView from "@/components/custom/mainContent/MarkdownView";
import React from "react";
import {
  SiReact,
  SiRedux,
  SiSpeedtest,
  SiFigma,
  SiGithubactions,
  SiJira,
  SiSlack,
  SiVitest,
} from 'react-icons/si'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import Pill from "@/components/custom/pill/Pill";

const iconMap = {
  SiReact: SiReact,
  SiRedux: SiRedux,
  SiSpeedtest: SiSpeedtest,
  SiFigma: SiFigma,
  SiGithubactions: SiGithubactions,
  SiJira: SiJira,
  SiSlack: SiSlack,
  SiVitest: SiVitest,
};

function isValidIconName(iconName: string): iconName is keyof typeof iconMap {
  return iconName in iconMap;
}

function getIconComponent(iconName: string) {
  if (isValidIconName(iconName)) {
    const IconComponent = iconMap[iconName];
    return <IconComponent />;
  } else {
    return null;
  }
}

function SkillItem({ icon, title, content }: Omit<FirestoreDocType, "id">) {
  return (
    <div className="w-full">
      <div className="text-left flex flex-row items-center mb-2">
        {getIconComponent(icon || "SiCircle")}
        <p className="font-semibold ml-3">{title}</p>
      </div>
      <MarkdownView content={content} className="prose max-w-none overflow-scroll opacity-60" />
    </div>
  )
}


function SkillItemWithList({ title, list, subtext }: Omit<FirestoreDocType, "id">) {
  return (

<div className="border border-primary/10 rounded-2xl px-4 mb-8">

    <Accordion type="single" collapsible className="mt-0">
      <AccordionItem value={title || ""}>
        <AccordionTrigger className="cursor-pointer">
          <div className="text-left flex flex-col w-full px-0">
          <p className="font-semibold ">{title}</p>
          <p className="opacity-60">{subtext}</p>
          </div>
        </AccordionTrigger>
        <AccordionContent className="flex flex-wrap gap-2">
          {list?.split(',').map((item) => <Pill key={item} text={item} />)}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
</div>
  )
}

export default function Skills() {
  const { data, loading, error } = useFirestoreCollection();


  return (
    <MainContentContainer loading={loading} error={error}>
      {data?.length > 0 && (
        <div className="flex flex-col gap-y-6">
          {data?.map((skill) => {
            return skill?.list ?
              <SkillItemWithList
                key={skill.id}
                title={skill.title}
                list={skill.list}
                subtext={skill.subtext}
              />
              :
              <SkillItem
                key={skill.id}
                icon={skill.icon}
                title={skill.title}
                content={skill.content}
              />
          })}
        </div>
      )}
    </MainContentContainer>
  );
}
