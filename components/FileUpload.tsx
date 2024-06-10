'use client';

import { X } from 'lucide-react';
import { UploadDropzone } from '@/lib/uploadthing'
import '@uploadthing/react/styles.css'
import Image from 'next/image';
import { Button } from './ui/button';

interface FileUploadProps {
    onChange : (url?: string) => void,
    value : string,
}

const FileUpload = ({ onChange, value } : FileUploadProps) => {
    const fileType = value?.split('.').pop()

    if(value && fileType !== 'image'){
        return (
            <div className="relative h-[220px] p-1 flex items-center justify-center">
                <div className='flex items-center justify-center'>
                    <Image
                        src={value}
                        alt="image-uploaded"
                        className='rounded-md'
                        width={180}
                        height={250}
                    />
                    <Button
                        onClick={() => onChange('')} 
                        className='bg-rose-500 text-white p-1 rounded-full absolute top-1 right-1 shadow-sm h-5 w-5' 
                        type='button'
                    >
                        <X />
                    </Button>
                </div>
            </div>
        )
    }

    return (
        <UploadDropzone
            endpoint={'imageUploader'}
            onClientUploadComplete={(response) => {
                onChange(response?.[0].url)
            }}
            onUploadError={(error : Error) => {
                console.log(error)
            }}
        />
    )
}

export default FileUpload