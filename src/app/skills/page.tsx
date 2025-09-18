"use client";

import { useFirestoreCollection } from "@/data/useFirestoreCollection";
import MainContentContainer from "@/components/custom/mainContent/MainContentContainer";
import MarkdownView from "@/components/custom/mainContent/MarkdownView";
import React from "react";

import { SiReact, SiRedux, SiSpeedtest, SiFigma, SiGithubactions, SiJira, SiSlack, SiVitest } from 'react-icons/si'
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


export default function Skills() {
  const { data, loading, error } = useFirestoreCollection();


  return (
    <MainContentContainer loading={loading} error={error}>
      {data?.length > 0 && (
        <div className="flex flex-col gap-y-6">
          {data?.map((skill) => {
            return (
              <div key={skill.id} className="w-full cursor-pointer">
                <div className="text-left flex flex-row items-center mb-2">
                  {getIconComponent(skill.icon || "SiCircle")}
                  <p className="font-semibold ml-3">{skill.title}</p>
                </div>
                <MarkdownView content={skill.content} className="prose max-w-none overflow-scroll opacity-60" />
              </div>
            );
          })}
        </div>
      )}
    </MainContentContainer>
  );
}
