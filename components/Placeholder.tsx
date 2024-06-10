'use client';

import Image from 'next/image'

const Placeholder = () => {
    return (
        <div className="flex flex-col gap-8 w-full items-center mt-24">
            <Image
                alt="an image of a picture and directory icon"
                width="300"
                height="300"
                src="/empty.svg"
            />
            <div className="text-2xl">You have no Tasks, add one now</div>
        </div>
    )
}

export default Placeholder