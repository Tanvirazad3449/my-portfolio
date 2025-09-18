"use client";

import { useFirestoreCollection } from "@/data/useFirestoreCollection";
import Image from "next/image";
import MainContentContainer from "@/components/custom/mainContent/MainContentContainer";
import { Button } from "@/components/ui/button";
import { sections, useSections } from "@/providers/SectionProvider";

export default function About() {
    const { data, loading, error } = useFirestoreCollection();
  const { handleActiveSection } = useSections();

    return (
        <MainContentContainer loading={loading} error={error}>
            {data?.length > 0 &&
                <div className="flex flex-col md:flex-row gap-x-6 gap-y-6">
                    <Image
                        src={data[0]?.logo || "/null.webp"}
                        alt="Tanvir Azad"
                        priority={true}
                        width={200}
                        height={200}

                        className="rounded-lg bg-border border-primary/10 h-48 w-48"
                    />
                    <div className="flex flex-col">

                        <p className="mb-4">{data[0]?.subtext}</p>
                        <div className="flex flex-row gap-x-4">

                            <Button className="text-primary hover:text-primary/60 bg-primary/10 cursor-pointer hover:bg-primary/20 shadow-none justify-start"
                                onClick={() => handleActiveSection(sections[4])}>My Skills</Button>

                            <Button className="text-primary hover:text-primary/60 bg-primary/10 cursor-pointer hover:bg-primary/20 shadow-none justify-start"
                                onClick={() => handleActiveSection(sections[5])}>Contact Me</Button>
                        </div>
                    </div>
                </div>
            }
        </MainContentContainer>
    );
}

