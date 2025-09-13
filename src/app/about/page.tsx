"use client";

import { useFirestoreCollection } from "@/data/useFirestoreCollection";
import Image from "next/image";
import MarkdownView from "@/components/custom/mainContent/MarkdownView";
import MainContentContainer from "@/components/custom/mainContent/MainContentContainer";

export default function About() {
    const { data, loading, error } = useFirestoreCollection<FirestoreDocType>();

    return (
        <MainContentContainer loading={loading} error={error}>
            <div className="prose max-w-none gap-9">
                <div className="mt-1 md:float-left sm:flex sm:flex-col mr-6 mb-4">
                    <Image
                        src="/tanvir.webp"
                        alt="Tanvir Azad"
                        priority={true}
                        width={200}
                        height={200}
                        className="rounded-lg bg-border"
                    />
                </div>
                <p className="mb-4">{data[0]?.subtext}</p>
                <MarkdownView content={data[0]?.content} className="prose max-w-none overflow-scroll" />
            </div>
        </MainContentContainer>

    );
}

