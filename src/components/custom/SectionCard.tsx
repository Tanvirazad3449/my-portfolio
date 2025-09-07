"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import DevToMarkdown from "./DevToMarkdown";

export type ListItem = {
    id: string;
    title: string;
    mdContent?: string | null;
    teaser?: string;
    publishedOn?: any;
};

export type SelectedItem = {
    section: string;
    mdContent: string;
};

type Props = {
    data: ListItem[];
    active: string;
    selectedItem: SelectedItem;
    setSelectedItem: React.Dispatch<React.SetStateAction<SelectedItem>>;
    className?: string;
};

export default function SectionCard({
    data,
    active,
    selectedItem,
    setSelectedItem,
    className = "",
}: Props) {
    const showingDetail = selectedItem.section === active && (selectedItem.mdContent?.length ?? 0) > 0;

    return (
        <div className={`prose max-w-none ${className}`}>
            {showingDetail ? (
                <div className="mt-0">
                    <DevToMarkdown content={selectedItem.mdContent} className="prose max-w-none overflow-scroll" />
                </div>
            ) : (
                <div className="mt-0 space-y-4">
                    {data.map((item) => (
                        <Card
                            key={item.id}
                            className="h-full rounded-2xl p-4 shadow-none overflow-hidden flex flex-col cursor-pointer font-medium hover:bg-zinc-100"
                            onClick={() =>
                                setSelectedItem({
                                    section: active,
                                    mdContent: item.mdContent || "",
                                })
                            }
                        >
                            <div className="w-full flex flex-col md:flex-row md:items-start justify-between gap-2 md:gap-4">
                                {/* Left: title + teaser */}
                                <div className="flex-1 min-w-0">
                                    <p className="text-lg sm:text-xl text-zinc-700 break-words">{item.title}</p>
                                    <p className="text-zinc-500 text-sm sm:text-base max-w-full md:max-w-[66%] break-words">
                                        {item.teaser}
                                    </p>
                                </div>

                                {/* Right: date */}
                                <div className="shrink-0 md:ml-auto text-left md:text-right">
                                    <p className="text-zinc-500 text-xs sm:text-sm whitespace-nowrap">
                                        Published on{" "}
                                        <time dateTime={item.publishedOn?.toDate?.()?.toISOString?.() ?? ""}>
                                            {new Date(item.publishedOn?.toDate?.() ?? item.publishedOn).toLocaleDateString(undefined, {
                                                year: "numeric",
                                                month: "short",
                                                day: "numeric",
                                            })}
                                        </time>
                                    </p>
                                </div>
                            </div>


                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
}
