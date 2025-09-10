import React, { ReactNode, useState } from 'react'
import Image from 'next/image';
import { motion } from 'framer-motion';

function AboutContent({ children }: { children: ReactNode; }) {
    const [imageLoaded, setImageLoaded] = useState(false);
    return (
        <div className="prose max-w-none gap-9">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={imageLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{
                    duration: 0.3,
                    ease: "easeOut",
                    delay: 0.3
                }}
                className="md:float-left sm:flex sm:flex-col mr-6 mb-4"
            >
                <Image
                    src="/tanvir.webp"
                    alt="Tanvir Azad"
                    width={200}
                    height={200}
                    className="rounded-lg bg-accent"
                    onLoad={() => setImageLoaded(true)}
                    onError={() => setImageLoaded(true)} // Also trigger on error to prevent stuck state
                />
            </motion.div>
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={imageLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{
                    duration: 0.3,
                    ease: "easeOut",
                    delay: 0.5
                }}
            >
                {children}
            </motion.div>
        </div>
    )
}

export default AboutContent