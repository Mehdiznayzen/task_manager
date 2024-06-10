import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const createTask = mutation({
    args: {
        task_name: v.string(),
        description: v.string(),
        image: v.string(),
        user_id: v.string()
    },
    handler: async (ctx, { task_name, description, image, user_id }) => {
        try {
            await ctx.db.insert('tasks', {
                task_name,
                description,
                image,
                favoris : false,
                deleted : false,
                user_id
            });
        } catch (error) {
            console.error("Failed to create task:", error);
            throw new Error("Task creation failed");
        }
    }
});

export const getTasksForTasksPage = query({
    args: {
        user_id: v.string(),
    },
    handler: async (ctx, args) => {
        if (!args.user_id) {
            throw new ConvexError('You have to be logged in');
        }

        const tasks = await ctx.db.query('tasks')
            .filter((q) => q.and(
                q.eq(q.field('user_id'), args.user_id),
                q.eq(q.field('deleted'), false)
            ))
            .collect();

        return tasks;
    }
});

export const getTasksForFavorisPage = query({
    args: {
        user_id: v.string(),
    },
    handler: async (ctx, args) => {
        if (!args.user_id) {
            throw new ConvexError('You have to be logged in');
        }

        const tasks = await ctx.db.query('tasks')
            .filter((q) => q.and(
                q.eq(q.field('user_id'), args.user_id),
                q.eq(q.field('favoris'), true)
            ))
            .collect();

        return tasks;
    }
});

export const getTasksForTrashPage = query({
    args: {
        user_id: v.string(),
    },
    handler: async (ctx, args) => {
        if (!args.user_id) {
            throw new ConvexError('You have to be logged in');
        }

        const tasks = await ctx.db.query('tasks')
            .filter((q) => q.and(
                q.eq(q.field('user_id'), args.user_id),
                q.eq(q.field('deleted'), true)
            ))
            .collect();

        return tasks;
    }
});

export const addToFavoris = mutation({
    args: {
        _id: v.id('tasks')
    },
    handler: async (ctx, args) => {
        if(!args._id) {
            throw new ConvexError('You have to add the id !!');
        }

        const task = await ctx.db.get(args._id);

        if (!task) {
            throw new ConvexError('Task not found');
        }
        
        await ctx.db.patch(args._id, { favoris: true });
    }
});

export const removeFromFavoris = mutation({
    args: {
        _id: v.id('tasks')
    },
    handler: async (ctx, args) => {
        if(!args._id) {
            throw new ConvexError('You have to add the id !!');
        }

        const task = await ctx.db.get(args._id);

        if (!task) {
            throw new ConvexError('Task not found');
        }
        
        await ctx.db.patch(args._id, { favoris: false });
    }
});

export const addToTrash = mutation({
    args : {
        _id: v.id('tasks')
    },
    handler : async (ctx, args) => {
        if(!args._id) {
            throw new ConvexError('You have to add the id !!');
        }

        const task = await ctx.db.get(args._id);

        if (!task) {
            throw new ConvexError('Task not found');
        }
        
        await ctx.db.patch(args._id, { deleted: true });
    }
})

export const deleteTask = mutation({
    args : {
        _id : v.id('tasks')
    },
    handler : async (ctx, args) => {
        if(!args._id) {
            throw new ConvexError('You have to add the id !!');
        }

        const task = await ctx.db.get(args._id);

        if (!task) {
            throw new ConvexError('Task not found');
        }
        
        await ctx.db.delete(args._id);
    }
})

export const getOneTask = mutation({
    args : {
        _id : v.id('tasks')
    },
    handler : async (ctx, args) => {
        if (!args._id) {
            throw new ConvexError('You have to be logged in');
        }

        const tasks = await ctx.db.query('tasks')
            .filter((q) => q.and(
                q.eq(q.field('_id'), args._id)
            ))
            .collect();

        return tasks;
    }
})


export const updateTask = mutation({
    args : {
        _id: v.id('tasks'),
        task_name: v.string(),
        description: v.string(),
        image: v.string()
    },
    handler : async (ctx, args) => {
        if (!args._id) {
            throw new ConvexError('You have to be logged in');
        }

        const task = await ctx.db.get(args._id);

        if (!task) {
            throw new ConvexError('Task not found');
        }
        
        await ctx.db.patch(args._id, { 
            task_name : args.task_name,
            description: args.description,
            image: args.image,
            favoris : false,
            deleted : false,
        })
    }
})


export const restoreFromTrash = mutation({
    args: {
        _id: v.id('tasks')
    },
    handler: async (ctx, args) => {
        if(!args._id) {
            throw new ConvexError('You have to add the id !!');
        }

        const task = await ctx.db.get(args._id);

        if (!task) {
            throw new ConvexError('Task not found');
        }
        
        await ctx.db.patch(args._id, { deleted: false });
    }
});
