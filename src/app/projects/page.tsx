"use client";

import { useFirestoreCollection } from "@/data/useFirestoreCollection";
import MainContentContainer from "@/components/custom/mainContent/MainContentContainer";
import MdAccordion from "@/components/custom/accordion/MdAccordion";

export default function Projects() {
  const { data, loading, error } = useFirestoreCollection();

  return (
    <MainContentContainer loading={loading} error={error}>
      {
        data.map((item) => (
          <MdAccordion
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

