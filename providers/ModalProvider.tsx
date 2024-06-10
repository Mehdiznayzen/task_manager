'use client';

import AddTaskForm from "@/components/AddTaskForm";
import { useEffect, useState } from "react";


const ModalProvider = () => {
    const [isMounted, setIsMounted] = useState<boolean>(false)

    useEffect(() => {
        setIsMounted(true)
    }, [])

    if(!isMounted) return null;

    return (
        <>
            <AddTaskForm />
        </>
    )
}

export default ModalProvider