import { defineSchema, defineTable } from 'convex/server';
import { v } from 'convex/values';

export default defineSchema({
    users : defineTable({
            clerkId: v.string(),
            full_name: v.string(),
            email : v.string(),
            imageUrl: v.string(),
        }),
    tasks : defineTable({
        task_name : v.string(),
        description : v.string(),
        favoris : v.boolean(),
        deleted : v.boolean(),
        image : v.string(),
        user_id : v.string(),
    })
})