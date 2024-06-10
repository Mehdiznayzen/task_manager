'use client';

import Link from "next/link";
import { Button } from "./ui/button";
import { SideNavLinks } from "@/constants";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";


const LeftSidebar = () => {
    const pathname = usePathname()

    return (
        <div className="flex flex-col gap-[25px] mt-[40px]">
            {
                SideNavLinks.map((link: any) => {
                    const { id, route, title, icon } = link
                    return (
                        <Link 
                            href={route} 
                            key={id}
                        >
                            <Button
                                variant={"ghost"}
                                className={cn('hover:bg-accent flex gap-[10px] w-[230px]', pathname === route && 'bg-accent')}
                            >
                                {
                                    icon
                                }
                                {
                                    title
                                }
                            </Button>
                        </Link>
                    )
                })
            }
        </div>
    )
}

export default LeftSidebar