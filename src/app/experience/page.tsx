"use client";

import { useFirestoreCollection } from "@/data/useFirestoreCollection";
import MainContentContainer from "@/components/custom/mainContent/MainContentContainer";
import MdAccordion from "@/components/custom/accordion/MdAccordion";

export default function Experience() {
  const { data, loading, error } = useFirestoreCollection();

  return (
    <MainContentContainer loading={loading} error={error}>
      {
        data.map((item) => (
          <MdAccordion
            key={item.id}
            image={item.image}
            title={item.title}
            subtitle={item.subtitle}
            content={item.content}
          />

        ))
      }
    </MainContentContainer>
  );
}

