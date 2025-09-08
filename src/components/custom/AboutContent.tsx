import React, { ReactNode } from 'react'
import Image from 'next/image';

function AboutContent({ children }: { children: ReactNode; }) {
    return (
        <div className="prose max-w-none gap-9">
            <Image
                src="/tanvir.webp"
                alt="Tanvir Azad"
                width={200}
                height={200}
                className="float-left mr-6 mb-4 rounded-lg"
            />
            {children}
        </div>

    )
}

export default AboutContent


