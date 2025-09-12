"use client";

import { useFirestoreCollection } from "@/data/useFirestoreCollection";
import MainContentContainer from "@/components/custom/mainContent/MainContentContainer";
import { Card } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import BlogItem from "./BlogItem";
import { MainContentHeaderButton } from "@/components/custom/mainContent/MainContentHeader";
import { ArrowRight } from "lucide-react";
import { contacts } from "@/components/custom/layout/ContactBar";

export default function Blogs() {
    const router = useRouter()
    const { data, loading, error } = useFirestoreCollection<FirestoreDocType>();

    return (
        <MainContentContainer loading={loading} error={error}>
            <div className="flex flex-col gap-4 mt-2 pb-6">

                {data.map((item) => (
                    <Card
                        key={item.id}
                        className="h-full rounded-2xl p-4 shadow-none overflow-hidden flex flex-col cursor-pointer font-medium hover:bg-border"
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
                <Card
                    className="h-full rounded-2xl p-4 shadow-none overflow-hidden flex flex-col cursor-pointer font-medium hover:bg-border/50 bg-border"
                    onClick={() => {
                        window.open(contacts[3].href, "_blank", "noopener,noreferrer")
                    }}
                >
                    <div className={`w-full flex flex-col md:flex-row md:items-start justify-between gap-2 md:gap-4 shadow-none`}>
                        <div className="flex-1 min-w-0">
                            <p className="break-words">More Blogs...</p>
                            <p className="text-sm max-w-full md:max-w-[66%] break-words text-primary/60">
                                Read all my blogs on dev.to
                            </p>
                        </div>

                        <div className="shrink-0 md:ml-auto text-left md:text-right -mt-1 mr-1">
                            <MainContentHeaderButton rightIconComponent={<ArrowRight size={24} />} label="go to dev.to" onClick={() => null} />
                        </div>
                    </div>

                </Card>
            </div>
        </MainContentContainer>
    );
}

