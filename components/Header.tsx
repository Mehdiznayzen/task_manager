import Image from "next/image"
import { Label } from "@/components/ui/label"
import ModeToggle from "@/components/ModeToggle"
import { Button } from "@/components/ui/button"
import { SignUpButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import Link from 'next/link'

const customAppearance = {
    elements: {
        userButton: {
            height: "50px",
            width: "200px",
            fontSize: "16px",
            backgroundColor: "#0070f3",
            color: "#fff",
            borderRadius: "8px",
        },
        userButtonAvatar: {
            height: "40px",
            width: "40px",
        },
    },
};

const Header = () => {
    return (
        <nav className="flex items-center justify-between h-[8vh] px-[47px]">
            <Link className="flex items-center gap-[10px] cursor-pointer" href={'/'}>
                <Image
                    src={'/logo.png'}
                    alt="logo_image"
                    width={30}
                    height={30}
                />
                <Label className="text-[20px] text-muted-foreground cursor-pointer">
                    Tasks Drive
                </Label>
            </Link>

            <div className="flex items-center gap-[10px]">
                <SignedIn>
                    <UserButton
                        afterSignOutUrl='/' 
                        appearance={customAppearance}
                    />
                    <ModeToggle />
                </SignedIn>
                <SignedOut>
                    <SignUpButton
                        mode='modal'
                    >
                        <Button variant={'default'}>Sign Up</Button>
                    </SignUpButton>
                    <ModeToggle />
                </SignedOut>
            </div>
        </nav>
    )
}

export default Header