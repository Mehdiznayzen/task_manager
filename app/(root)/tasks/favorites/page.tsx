'use client'

import { useMutation, useQuery } from 'convex/react'
import { useUser } from '@clerk/nextjs'
import React from 'react'
import { api } from '@/convex/_generated/api'
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
} from "@/components/ui/card";
import { Button } from '@/components/ui/button'
import TooltipComponent from '@/components/TooltipComponent'
import Image from 'next/image'
import { Label } from '@/components/ui/label'
import { formatRelative } from 'date-fns'
import { FaStar } from 'react-icons/fa'
import { Loader } from 'lucide-react'
import HeaderTasks from "@/components/HeaderTasks"
import Placeholder from '@/components/Placeholder'
import { useToast } from '@/components/ui/use-toast'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"


const FavoritesPage = () => {
    const { user } = useUser()
    if(!user) throw new Error('No User')
    const { toast } = useToast()

    const tasks = useQuery(api.tasks.getTasksForFavorisPage, { user_id : user?.id })
    const isLoading = tasks === undefined;
    const removeFromFavoris = useMutation(api.tasks.removeFromFavoris);

    const handleremoveFromFavoris = async (_id : any) => {
        try {
            await removeFromFavoris({ _id: _id });
            toast({
                title : 'Task is removed from your favorites .'
            })
        } catch (error) {
            console.error('Failed to add to favoris', error);
        }
    };

    // Check if tasks is an array before using table methods
    const isTaskArray = Array.isArray(tasks);

    
    return (
        <div className="flex flex-col gap-[30px]">
            <HeaderTasks 
                text='Your Favorites Tasks'
                showAddTask={false}
            />
            {
                isLoading ? (
                    <div className="flex flex-col gap-8 w-full items-center mt-24">
                        <Loader className="h-20 w-20 animate-spin text-gray-500" />
                        <div className="text-2xl">Loading your tasks ...</div>
                    </div>
                ) : isTaskArray && tasks.length === 0 ? (
                    <Placeholder 
                        showDescription={false}
                    />
                ) : (
                    <div className="grid grid-cols-4 gap-[50px]">
                        {
                            isTaskArray && tasks.map((task) => {
                                const { _creationTime, _id, task_name, description, image, favoris } = task
                                
                                return (
                                    favoris && (
                                        <Card key={_id} className="w-[300px]">
                                            <CardHeader className="flex w-full">
                                                <AlertDialog>
                                                    <AlertDialogTrigger asChild>
                                                        <Button variant={'ghost'}>
                                                            <TooltipComponent
                                                                text="Remove From Favorites"
                                                            >
                                                                <FaStar 
                                                                    className="w-4 h-4"
                                                                />
                                                            </TooltipComponent>
                                                        </Button>
                                                    </AlertDialogTrigger>
                                                    <AlertDialogContent>
                                                        <AlertDialogHeader className="flex items-start justify-start">
                                                            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                                            <AlertDialogDescription className="text-start">
                                                                This action will permanently remove your
                                                                task from your favorite tasks .
                                                            </AlertDialogDescription>
                                                        </AlertDialogHeader>
                                                        <AlertDialogFooter>
                                                            <AlertDialogCancel className="mt-[10px]">Cancel</AlertDialogCancel>
                                                            <AlertDialogAction
                                                                onClick={() => handleremoveFromFavoris(_id)}
                                                            >
                                                                Continue
                                                            </AlertDialogAction>
                                                        </AlertDialogFooter>
                                                    </AlertDialogContent>
                                                </AlertDialog>
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

export default FavoritesPage