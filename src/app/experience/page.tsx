"use client";

import { useFirestoreCollection } from "@/data/useFirestoreCollection";
import MarkdownView from "@/components/custom/mainContent/MarkdownView";
import MainContentContainer from "@/components/custom/mainContent/MainContentContainer";

export default function Experience() {
    const { data, loading, error } = useFirestoreCollection<FirestoreDocType>();

    return (
        <MainContentContainer loading={loading} error={error}>
            <div className="prose max-w-none gap-9">
                <MarkdownView content={data[0]?.content} className="prose max-w-none overflow-scroll" />
            </div>
        </MainContentContainer>
    );
}

