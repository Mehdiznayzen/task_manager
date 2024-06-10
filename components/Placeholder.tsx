'use client';

import Image from 'next/image'

interface PlaceholderProps {
    showDescription: boolean
}

const Placeholder = ({ showDescription } : PlaceholderProps) => {
    return (
        <div className="flex flex-col gap-8 w-full items-center mt-24">
            <Image
                alt="an image of a picture and directory icon"
                width="300"
                height="300"
                src="/empty.svg"
            />
            {
                showDescription && (
                    <div className="text-xl text-muted-foreground">You have no tasks, add one now .</div>
                )
            }
        </div>
    )
}

export default Placeholder