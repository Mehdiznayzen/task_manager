'use client';

import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import AddTaskForm from "./AddTaskForm";

interface HeaderTasksProps {
    text : string,
    showAddTask : boolean
}

const HeaderTasks = ({ showAddTask, text } : HeaderTasksProps) => {
    return (
        <nav className="flex w-full items-center justify-between mt-[10px]">
            <Label className="text-[33px]">{text}</Label>
            {
                showAddTask && (
                    <Button 
                        variant={'default'} 
                        className="hover:rounded-xl transition-all" 
                        size={'icon'}
                    >
                        <Dialog>
                            <DialogTrigger>
                                <Plus className="w-6 h-6"/>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader className="flex flex-col items-center justify-center gap-[10px] w-full">
                                    <DialogTitle className="flex flex-col items-center justify-center gap-[10px]">
                                        <Label className="text-[17px] tracking-[1px] text-muted-foreground">Add New Task Here ❤️</Label>
                                    </DialogTitle>
                                    <DialogDescription className="text-center text-zinc-500">
                                        Give your tasks a personnality with a name and an 
                                        image and a description. You can always change it later . 
                                    </DialogDescription>
                                </DialogHeader>
                                <AddTaskForm />
                            </DialogContent>
                        </Dialog>
                    </Button>
                )
            }
        </nav>
    )
}

export default HeaderTasks