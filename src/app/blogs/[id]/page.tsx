"use client";

import { useFirestoreCollection } from "@/data/useFirestoreCollection";
import MarkdownView from "@/components/custom/mainContent/MarkdownView";
import MainContentContainer from "@/components/custom/mainContent/MainContentContainer";
import { useParams, usePathname, useRouter } from "next/navigation";
import { CardTitle } from "@/components/ui/card";

export default function Blogs() {
    const params = useParams(); 
    const id = (params?.id as string) || undefined;
    const { data, loading, error } = useFirestoreCollection<FirestoreDocType>(id); 

    return (
        <MainContentContainer loading={loading} error={error}>
            <div className="mt-0">
      <h1 className={`text-3xl font-bold mb-4`}>{data[0]?.title}</h1>

                <MarkdownView content={data[0]?.content} className="prose max-w-none overflow-scroll" />
            </div>
        </MainContentContainer>

    );
}

