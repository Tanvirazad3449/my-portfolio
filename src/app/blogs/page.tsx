"use client";

import { useFirestoreCollection } from "@/data/useFirestoreCollection";
import MainContentContainer from "@/components/custom/mainContent/MainContentContainer";
import { Card } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import BlogItem from "./BlogItem";

export default function Blogs() {
    const router = useRouter()
    const { data, loading, error } = useFirestoreCollection<FirestoreDocType>();

    return (
        <MainContentContainer loading={loading} error={error}>
            <div className="prose max-w-none gap-9">

                <div className="mt-0 space-y-4">
                    {data.map((item) => (
                        <Card
                            key={item.id}
                            className="h-full rounded-2xl p-4 shadow-none overflow-hidden flex flex-col cursor-pointer font-medium hover:bg-accent/10"
                            onClick={() =>
                                router.push(`blogs/${item.id}`)
                            }
                        >
                            <BlogItem
                                title={item.title}
                                teaser={item.teaser}
                                publishedOn={item.publishedOn}
                            />

                        </Card>
                    ))}
                </div>
            </div>
        </MainContentContainer>
    );
}

