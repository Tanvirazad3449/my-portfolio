"use client";

import { useFirestoreCollection } from "@/data/useFirestoreCollection";
import Image from "next/image";
import MainContentContainer from "@/components/custom/mainContent/MainContentContainer";
import { sections, useSections } from "@/providers/SectionProvider";
import CustomButton from "@/components/custom/button/CustomButton";
import * as React from "react"
import { AnimatePresence, motion } from "framer-motion"

function RotateWords({ words }: { words: string[]}) {
    const [index, setIndex] = React.useState(0)

    React.useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prevIndex) => (prevIndex + 1) % words.length)
        }, 3000)
        return () => clearInterval(interval)
    }, [])
    return (

        <div className="text-left tracking-tighter w-fit flex items-center text-secondary-foreground jusitfy-center gap-1.5 text-2xl md:text-4xl font-bold">
            <AnimatePresence mode="wait">
                <motion.p
                    key={words[index]}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.5 }}
                >
                    {words[index]}
                </motion.p>
            </AnimatePresence>
        </div>
    )
}
export default function About() {
    const { data, loading, error } = useFirestoreCollection();
    const { handleActiveSection } = useSections();

    return (
        <MainContentContainer loading={loading} error={error}>
            {data?.length > 0 &&
                <div className="flex flex-col md:flex-row gap-x-6 gap-y-6 pt-4 md:pt-6">
                    <Image
                        src={data[0]?.image || "/null.webp"}
                        alt="Tanvir Azad"
                        priority={true}
                        width={200}
                        height={200}
                        className="rounded-lg bg-border h-48 w-48"
                    />
                    <div className="flex flex-col gap-y-4">
                        {data[0]?.subtitle && data[0]?.subtitle?.length > 0 && <RotateWords words={data[0]?.subtitle?.split(';')}/> }
                        <h1 className="text-primary/80">{data[0]?.content}</h1>
                        <div className="flex flex-row gap-x-4">
                            <CustomButton
                                text='My Projects'
                                onClick={() => handleActiveSection(sections[1])}
                                variant='primary'
                            />

                            <CustomButton
                                text='Contact Me'
                                onClick={() => handleActiveSection(sections[6])}
                                variant='secondary'
                            />
                        </div>
                    </div>

                </div>
            }
        </MainContentContainer>
    );
}

