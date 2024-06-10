import { ConvexError, v } from "convex/values";

import { internalMutation, query } from "./_generated/server";

export const getUserById = query({
    args: { 
        clerkId: v.string() 
    },
    handler: async (ctx, args) => {
        const user = await ctx.db
            .query("users")
            .filter((q) => q.eq(q.field("clerkId"), args.clerkId))
            .unique();

        if (!user) {
            throw new ConvexError("User not found");
        }

        return user;
    },
});


export const createUser = internalMutation({
    args: {
        clerkId: v.string(),
        email: v.string(),
        imageUrl: v.string(),
        name: v.string(),
    },
    handler: async (ctx, args) => {
        const existingUser = await ctx.db
            .query("users")
            .filter((q) => q.eq(q.field("clerkId"), args.clerkId))
            .unique();

        if (existingUser) {
            throw new ConvexError("User already exists");
        }

        await ctx.db.insert("users", {
            clerkId: args.clerkId,
            email: args.email,
            imageUrl: args.imageUrl,
            full_name: args.name,
        });
    },
});


export const updateUser = internalMutation({
    args: {
        clerkId: v.string(),
        imageUrl: v.string(),
        email: v.string(),
    },
    async handler(ctx, args) {
        const user = await ctx.db
            .query("users")
            .filter((q) => q.eq(q.field("clerkId"), args.clerkId))
            .unique();

        if (!user) {
            throw new ConvexError("User not found");
        }

        await ctx.db.patch(user._id, {
            imageUrl: args.imageUrl,
            email: args.email,
        });
    },
});

export const deleteUser = internalMutation({
    args: { 
        clerkId: v.string() 
    },
    async handler(ctx, args) {
        const user = await ctx.db
            .query("users")
            .filter((q) => q.eq(q.field("clerkId"), args.clerkId))
            .unique();

        if (!user) {
            throw new ConvexError("User not found");
        }

        await ctx.db.delete(user._id);
    },
});