'use client'

import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import Image from "next/image"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog"
import { SignedIn, SignedOut } from "@clerk/nextjs"
import Link from 'next/link'


const Home = () => {
  return (
    <div className="w-[100vw] z-50 min-h-[78vh] flex items-center justify-center">
      <div className="gradient"/>
      <main className="flex items-center justify-center flex-col gap-[10px]">
        <Image 
          src={'/logo.png'}
          width={220}
          height={220}
          alt="logo"
        />

        <Label className="text-4xl font-semibold tracking-[1px] text-muted-foreground text-center">The easiest way to upload and share files <br /> with your company .</Label>

        <p className="mt-6 text-lg leading-8 text-gray-600">
          Make and account and start managing your files in less than a
          minute.
        </p>

        <div className="flex items-center gap-[20px]">
          <SignedIn>
            <Link href={'/tasks'}>
              <Button variant={'default'}>Get Started</Button>
            </Link>
          </SignedIn>
          <SignedOut>
            <Dialog>
              <DialogTrigger>
                <Button variant={'default'}>Get Started</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader className="text-center">
                  <DialogDescription className="text-[16px] text-center">
                    You have to be logged in First !! 😃😎
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          </SignedOut>
          <Button variant={'ghost'} className="flex items-center gap-[10px]">Learn more <span>→</span></Button>
        </div>
      </main>
    </div>
  )
}

export default Home