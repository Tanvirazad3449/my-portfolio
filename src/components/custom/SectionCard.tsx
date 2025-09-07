"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import DevToMarkdown from "./DevToMarkdown";
import SectionCardItemMd from "./SectionCardItemMd";
import { Timestamp } from "@firebase/firestore";

export type ListItem = {
    id: string;
    title: string;
    teaser?: string | undefined;
    publishedOn?: Timestamp;
    content?: string;
};

export type SelectedItem = {
    section: string;
    content: string;
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
    const showingDetail = selectedItem.section === active && (selectedItem.content?.length ?? 0) > 0;

    return (
        <div>
            {
                data && data.length > 0 && data[0].title ?
                    <div className={`prose max-w-none ${className}`}>
                        {showingDetail ? (
                            <div className="mt-0">
                                <DevToMarkdown content={selectedItem.content} className="prose max-w-none overflow-scroll" />
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
                                                content: item.content || "",
                                            })
                                        }
                                    >
                                        <SectionCardItemMd
                                            title={item.title}
                                            teaser={item.teaser}
                                            publishedOn={item.publishedOn}
                                        />

                                    </Card>
                                ))}
                            </div>
                        )}
                    </div>

                    :
                    <div>
                        {data.map((item) => <DevToMarkdown key={item.id} content={item.content} className="prose max-w-none overflow-scroll" />)}
                    </div>
            }
        </div>
    );
}
