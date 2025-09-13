"use client";

import { useFirestoreCollection } from "@/data/useFirestoreCollection";
import MainContentContainer from "@/components/custom/mainContent/MainContentContainer";
import { ExperienceAccordion } from "../experience/page";

export default function Education() {
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



