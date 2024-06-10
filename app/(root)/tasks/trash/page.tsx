'use client';

import HeaderTasks from "@/components/HeaderTasks"
import Placeholder from "@/components/Placeholder"
import { api } from "@/convex/_generated/api";
import { useUser } from "@clerk/nextjs"
import { useMutation, useQuery } from "convex/react";
import { Loader } from "lucide-react"
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
} from "@/components/ui/card";
import Image from "next/image";
import DropDownActions from "@/components/DropDownActions";
import { Label } from "@/components/ui/label";
import { formatRelative } from "date-fns";
import { useToast } from "@/components/ui/use-toast";

const TrashPage = () => {
    const { user } = useUser()
    if(!user) throw new Error('No User')
    const { toast } = useToast()

    const tasks = useQuery(api.tasks.getTasksForTrashPage, { user_id : user?.id })
    const isLoading = tasks === undefined
    const restoreFromTrash = useMutation(api.tasks.restoreFromTrash);

    const removeTask = useMutation(api.tasks.deleteTask)

    // Check if tasks is an array before using table methods
    const isTaskArray = Array.isArray(tasks);
    
    const handleDeleteTask = async (_id : any) => {
        try{
            await removeTask({ _id : _id })
            toast({
                title : 'Task deleted successfully .'
            })
        }catch(error : any){
            console.log(error.message)
        }
    }

    const handleRestoreFromTrash = async (_id: any) => {
        try {
            await restoreFromTrash({ _id });
            toast({
                title: 'Task is restored.'
            });
        } catch (error: any) {
            console.error(_id);
            toast({
                title: 'Error restoring task',
                description: error.message,
            });
        }
    };
    
    return (
        <div className="flex flex-col gap-[30px]">
            <HeaderTasks 
                text='Your Deleted Tasks'
                showAddTask={false}
            />
            {
                isLoading ? (
                    <div className="flex flex-col gap-8 w-full items-center mt-24">
                        <Loader className="h-20 w-20 animate-spin text-gray-500" />
                        <div className="text-2xl">Loading your tasks ...</div>
                    </div>
                ) : isTaskArray && tasks.length === 0 ? (
                    <Placeholder />
                ) : (
                    <div className="grid grid-cols-4 gap-[50px]">
                        {
                            isTaskArray && tasks.map((task) => {
                                const { _creationTime, _id, task_name, description, image, deleted } = task
                                
                                return (
                                    deleted && (
                                        <Card key={_id} className="w-[300px]">
                                            <CardHeader className="flex w-full">
                                                <div className="flex items-center justify-between">
                                                    <DropDownActions
                                                        typeDelete="Delete"
                                                        showUpdateOption={false}
                                                        handleDeleteTask={() => handleDeleteTask(_id)}
                                                        type="delete"
                                                        handleRestoreFromTrash={() => handleRestoreFromTrash(_id)}
                                                        showRestoreOption={true}
                                                    />
                                                </div>
                                            </CardHeader>
                                            <CardContent className="flex flex-col items-center justify-center gap-[4px]">
                                                <Image
                                                    src={image}
                                                    alt="task_image"
                                                    width={230}
                                                    height={230}
                                                    className="rounded-md"
                                                />
                                                <Label className="text-center text-[18px] text-muted-foreground">{task_name}</Label>
                                                <Label className="text-center text-[15px] text-gray-700">{description}</Label>
                                            </CardContent>
                                            <CardFooter className="flex justify-center">
                                                <div className="text-[15.5px] text-white flex items-center gap-[4px]">
                                                    <span>Add on </span>
                                                    <span className="">
                                                        {
                                                            formatRelative(new Date(_creationTime), new Date())
                                                        }
                                                    </span>
                                                </div>
                                            </CardFooter>
                                        </Card>
                                    )
                                )
                            })
                        }
                    </div>
                )
            }
        
        </div>
    )
}

export default TrashPage