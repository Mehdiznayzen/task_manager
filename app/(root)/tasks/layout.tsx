import LeftSidebar from '@/components/LeftSidebar'
import { Menu } from 'lucide-react'
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import Image from 'next/image'
import MobileNav from '@/components/MobileNav'


const TasksLayout = ({ children } : { children : React.ReactNode }) => {
    return (
        <div className='min-h-[91.2vh] flex'>
            <div className='w-[270px] lg:w-[300px] fixed hidden md:flex flex-col items-center min-h-[91.3vh] border-r-[2px] border-border'>
                <LeftSidebar />
            </div>
            <div className='flex-1 md:ml-[300px]'>
                <div className="md:px-[20px]">
                    { children }
                </div>
            </div>
        </div>
    )
}

export default TasksLayout
