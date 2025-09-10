"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import DevToMarkdown from "./DevToMarkdown";
import SectionCardItemMd from "./SectionCardItemMd";
import { Timestamp } from "@firebase/firestore";
import AboutContent from "./AboutContent";
import { sections } from "@/providers/SectionProvider";

export type ListItem = {
    id: string;
    title: string;
    teaser?: string | undefined;
    publishedOn?: Timestamp;
    content?: string;
    subtext?: string;
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
    const hasData = data?.length > 0;
    const hasTitle = hasData && !!data[0].title;
    const showingDetail = selectedItem.section === active && !!selectedItem.content;

    const showItemDetails = hasTitle && showingDetail;
    const showItemListWithTitle = hasTitle && !showingDetail;
    const showItemList = hasData && !showingDetail;
    const showAboutContent = showItemList && active === sections[0];

    if (showAboutContent) {
        return (
            
            <div className={`prose max-w-none ${className}`}>
                <div className="mt-0">
                    <AboutContent>
                <p className="mb-4">{data[0]?.subtext}</p>
            </AboutContent>
                    <DevToMarkdown content={data[0]?.content} className="prose max-w-none overflow-scroll" />
                </div>
            </div>
        )
    }
    else if (showItemDetails) {
        return (
            <div className={`prose max-w-none ${className}`}>
                <div className="mt-0">
                    <DevToMarkdown content={selectedItem.content} className="prose max-w-none overflow-scroll" />
                </div>
            </div>
        )
    } 
    else if (showItemListWithTitle) {
        return (
            <div className={`prose max-w-none ${className}`}>

                <div className="mt-0 space-y-4">
                    {data.map((item) => (
                        <Card
                            key={item.id}
                            className="h-full rounded-2xl p-4 shadow-none overflow-hidden flex flex-col cursor-pointer font-medium hover:bg-accent"
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
            </div>
        )
    } 
    else if (showItemList) {
        return (
            <div>
                {data.map((item) => <DevToMarkdown key={item.id} content={item.content} className="prose max-w-none overflow-scroll" />)}
            </div>
        )
    } 
    else {
        return null
    }

}
