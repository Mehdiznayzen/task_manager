"use client"

import { z } from "zod"

const formTasks = z.object({
    task_name : z.string(),
    description : z.string(),
    image : z.string(),
    user_id : z.string(),
})

export default formTasks