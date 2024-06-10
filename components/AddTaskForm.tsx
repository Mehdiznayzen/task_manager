'use client';

import formTasks from "@/validation";
import { useUser } from "@clerk/nextjs";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod";
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "./ui/textarea";
import { Loader, Plus } from 'lucide-react';
import FileUpload from "./FileUpload";
import { useToast } from "./ui/use-toast";
import { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";

const AddTaskForm = () => {
    const { user } = useUser()
    const { toast } = useToast()
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const createTaskMutation = useMutation(api.tasks.createTask);

    const form = useForm<z.infer<typeof formTasks>>({
        resolver: zodResolver(formTasks),
        defaultValues: {
            task_name : '',
            description : '',
            image : '',
            user_id : user?.id
        },
    })
    
    async function onSubmit(values: z.infer<typeof formTasks>) {
        try {
            setIsLoading(true)
            if(!values.image || !values.description || !values.task_name){
                toast({
                    title: "You have to fill the fields First !!",
                    variant: "destructive"
                })
                return;
            }
            await createTaskMutation(values)
                .then(() => {
                    toast({
                        title: "Task is created .",
                    })
                })
        } catch (error: any) {
            toast({
                title : error.message
            })
        }finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="">
            <Form {...form}>
                <form 
                    onSubmit={form.handleSubmit(onSubmit)} 
                    className="space-y-8"
                >
                    <FormField
                        control={form.control}
                        name="image"
                        render={({ field }) => (
                            <FormItem className="border border-dashed rounded-lg">
                                <FormControl>
                                    <FileUpload
                                        value={field.value}
                                        onChange={field.onChange}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="task_name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Task name</FormLabel>
                                <FormControl>
                                    <Input 
                                        placeholder="Ex: Read Quran" 
                                        {...field} 
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Task Description</FormLabel>
                                <FormControl>
                                    <Textarea 
                                        placeholder="Type your message here." 
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    
                    <div className="flex justify-end">
                        {
                            isLoading ? (
                                <Button type="submit" className="flex items-center justify-center gap-[2px]">
                                    <Loader className="w-4 h-4 animate-spin mr-2" />
                                    Loading ....
                                </Button>
                            ) : (
                                <Button type="submit" className="flex items-center gap-[5px] justify-center">
                                    <Plus className="w-4 h-4 mr-1"/>
                                    Add
                                </Button>
                            )
                        }
                    </div>
                </form>
            </Form>
        </div>
    )
}

export default AddTaskForm