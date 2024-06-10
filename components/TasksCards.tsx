'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { api } from "@/convex/_generated/api";
import { useUser } from "@clerk/nextjs";
import { useMutation, useQuery } from "convex/react";
import { Edit2, GridIcon, Loader, RowsIcon, Trash } from "lucide-react";
import Placeholder from "./Placeholder";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
} from "@/components/ui/card";
import Image from "next/image";
import { Label } from "./ui/label";
import { formatRelative } from "date-fns";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import DropDownActions from "./DropDownActions";
import { Button } from "./ui/button";
import TooltipComponent from "./TooltipComponent"
import { FaStar, FaRegStar  } from "react-icons/fa";
import { useToast } from "./ui/use-toast";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import FormUpdateTask from "./FormUpdateTask";


const TasksCards = () => {
    const { user } = useUser()
    if(!user) throw new Error('No User')
    const { toast } = useToast()

    const tasks = useQuery(api.tasks.getTasksForTasksPage, { user_id : user?.id })
    const addToFavoris = useMutation(api.tasks.addToFavoris);
    const addToTrash = useMutation(api.tasks.addToTrash);

    const isLoading = tasks === undefined;

    // Check if tasks is an array before using table methods
    const isTaskArray = Array.isArray(tasks);


    const handleAddToFavoris = async (_id : any) => {
        try {
            await addToFavoris({ _id: _id });
            toast({
                title : 'Task add to your favorites .'
            })
        } catch (error) {
            console.error('Failed to add to favoris', error);
        }
    };

    const handleAddToTrash = async (_id: any) => {
        try{
            await addToTrash({ _id: _id });
            toast({
                title : 'Task add to your trash .'
            })
        }catch(error: any) {
            console.log(error.message)
        }
    }

    return (
        <div className="w-full">
            <Tabs defaultValue="grid" className="w-full">
                <TabsList>
                    <TabsTrigger value="grid" className="flex gap-2 items-center">
                        <GridIcon />
                        Grid
                    </TabsTrigger>
                    <TabsTrigger value="table" className="flex gap-2 items-center">
                        <RowsIcon /> 
                        Table
                    </TabsTrigger>
                </TabsList>
                {
                    isLoading ? (
                            <div className="flex flex-col gap-8 w-full items-center mt-24">
                                <Loader className="h-20 w-20 animate-spin text-gray-500" />
                                <div className="text-2xl">Loading your tasks ...</div>
                            </div>
                        ) : isTaskArray && tasks.length === 0 ? (
                            <Placeholder 
                                showDescription={true}
                            />
                        ) : (
                            <>
                                <TabsContent value="grid">
                                    <div className="grid grid-cols-3">
                                        {
                                            isTaskArray && tasks.map((task) => {
                                                const { _creationTime, _id, task_name, description, image, favoris, deleted } = task
                                                
                                                return (
                                                    !deleted && (
                                                        <Card key={_id} className="w-[340px]">
                                                            <CardHeader className="flex w-full">
                                                                <div className="flex items-center justify-between">
                                                                    <Button variant={'ghost'}>
                                                                        <TooltipComponent
                                                                            text="Add To Favorites"
                                                                        >
                                                                            {
                                                                                favoris ? (
                                                                                    <FaStar 
                                                                                        className="w-4 h-4"
                                                                                    />
                                                                                ) : (
                                                                                    <FaRegStar 
                                                                                        className="w-4 h-4" 
                                                                                        onClick={() => handleAddToFavoris(_id)}
                                                                                    />
                                                                                )
                                                                            }
                                                                        </TooltipComponent>
                                                                    </Button>
                                                                    <Button 
                                                                        variant="ghost"
                                                                    >
                                                                        <TooltipComponent
                                                                            text="Update Task"
                                                                        >
                                                                            <Dialog>
                                                                                <DialogTrigger asChild>
                                                                                    <Edit2 className="h-4 w-4" />
                                                                                </DialogTrigger>
                                                                                <DialogContent>
                                                                                    <FormUpdateTask 
                                                                                        _id={_id} 
                                                                                    />
                                                                                </DialogContent>
                                                                            </Dialog>
                                                                        </TooltipComponent>
                                                                    </Button>
                                                                    <Button 
                                                                        variant="ghost"
                                                                        onClick={() => handleAddToTrash(_id)}
                                                                        className="flex items-center justify-center"
                                                                    >
                                                                        <TooltipComponent
                                                                            text="Add To Trash"
                                                                        >
                                                                            <Trash className="h-4 w-4" />
                                                                        </TooltipComponent>
                                                                    </Button>
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
                                </TabsContent>

                                <TabsContent value="table" className="">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead className="">Task Name</TableHead>
                                            <TableHead>Description</TableHead>
                                            <TableHead>Image</TableHead>
                                            <TableHead>_creationTime</TableHead>
                                            <TableHead>Actions</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {
                                            isTaskArray && tasks.map((task) => {
                                                const { _creationTime, _id, task_name, description, image, deleted, favoris } = task
                                                return (
                                                    !deleted && (
                                                        <TableRow key={_id}>
                                                            <TableCell className="font-medium">{task_name}</TableCell>
                                                            <TableCell>{description}</TableCell>
                                                            <TableCell>
                                                                <Image 
                                                                    src={image}
                                                                    alt="task_image"
                                                                    width={130}
                                                                    height={130}
                                                                    className="rounded-md"
                                                                />
                                                            </TableCell>
                                                            <TableCell>
                                                                {
                                                                    formatRelative(new Date(_creationTime), new Date())
                                                                }
                                                            </TableCell>
                                                            <TableCell>
                                                                <div className="flex items-center gap-[20px]">
                                                                    <Button variant={'ghost'}>
                                                                        <TooltipComponent
                                                                            text="Add To Favorites"
                                                                        >
                                                                            {
                                                                                favoris ? (
                                                                                    <FaStar 
                                                                                        className="w-4 h-4"
                                                                                    />
                                                                                ) : (
                                                                                    <FaRegStar 
                                                                                        className="w-4 h-4" 
                                                                                        onClick={() => handleAddToFavoris(_id)}
                                                                                    />
                                                                                )
                                                                            }
                                                                        </TooltipComponent>
                                                                    </Button>
                                                                    <Button 
                                                                        variant="ghost"
                                                                    >
                                                                        <TooltipComponent
                                                                            text="Update Task"
                                                                        >
                                                                            <Dialog>
                                                                                <DialogTrigger asChild>
                                                                                    <Edit2 className="h-4 w-4" />
                                                                                </DialogTrigger>
                                                                                <DialogContent>
                                                                                    <FormUpdateTask 
                                                                                        _id={_id} 
                                                                                    />
                                                                                </DialogContent>
                                                                            </Dialog>
                                                                        </TooltipComponent>
                                                                    </Button>
                                                                    <Button 
                                                                        variant="ghost"
                                                                        onClick={() => handleAddToTrash(_id)}
                                                                        className="flex items-center justify-center"
                                                                    >
                                                                        <TooltipComponent
                                                                            text="Add To Trash"
                                                                        >
                                                                            <Trash className="h-4 w-4" />
                                                                        </TooltipComponent>
                                                                    </Button>
                                                                </div>
                                                            </TableCell>
                                                        </TableRow>
                                                    )
                                                )
                                            })
                                        }
                                    </TableBody>
                                </Table>
                            </TabsContent>
                        </>
                    )
                }
            </Tabs>
        </div>
    )
}

export default TasksCards
