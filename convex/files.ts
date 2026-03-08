import { ConvexError, v } from "convex/values";
import { mutation, MutationCtx, query, QueryCtx } from "./_generated/server";
import { getUser } from "./users";
import { fileTypes } from "./schema";


export const generateUploadUrl = mutation({

    args: {},
    handler: async (ctx) => {
        const identity = await ctx.auth.getUserIdentity()
        if (!identity) {
            throw new ConvexError("you must be logged in to upload file ");
        }
        return await ctx.storage.generateUploadUrl();
    },
});


async function hasAccessToOrg(ctx: QueryCtx | MutationCtx, tokenIdentifier: string, orgId: string) {
    const user = await getUser(ctx, tokenIdentifier)
    const hasAccess = user.orgIds.includes(orgId) ||
        user.tokenIdentifier.includes(orgId)
    return hasAccess;
}

export const createfile = mutation({
    args: {
        name: v.string(),
        fileId: v.id("_storage"),
        orgId: v.string(),
        type: fileTypes,
    },
    async handler(ctx, args) {
        const identity = await ctx.auth.getUserIdentity()
        if (!identity) {
            throw new ConvexError("you must be logged in to upload file ");
        }

        const hasAccess = await hasAccessToOrg(ctx, identity.tokenIdentifier, args.orgId)

        if (!hasAccess) {
            throw new ConvexError("You do not have access to this org")
        }
        await ctx.db.insert('files', {
            name: args.name,
            fileId: args.fileId,
            orgId: args.orgId,
            type: args.type,
        })
    }
})
export const getFiles = query({
    args: {
        orgId: v.string(),
        query: v.optional(v.string()),
    },
    async handler(ctx, args) {
        const identity = await ctx.auth.getUserIdentity()
        if (!identity) {
            return [];
        }

        const hasAccess = await hasAccessToOrg(ctx, identity.tokenIdentifier, args.orgId)

        if (!hasAccess) {
            return []
        }

        const files = await ctx.db.query('files').withIndex('by_orgId', q =>
            q.eq('orgId', args.orgId)
        ).collect()
 
        const query=args.query;
        if (query) { 
            return files.filter(file => file.name.toLowerCase().includes(query.toLowerCase())); 
        } else {
            return files;
        }

    },

})

export const getFileUrl = query({
    args: { fileId: v.id("_storage") },
    async handler(ctx, args) {
        return await ctx.storage.getUrl(args.fileId);
    },
});

export const deleteFile = mutation({
    args: { fileId: v.id("files") },
    async handler(ctx, args) {
        const identity = await ctx.auth.getUserIdentity()
        if (!identity) {
            throw new ConvexError("You do not have access to this org")
        }

        const file = await ctx.db.get(args.fileId);

        if (!file) {
            throw new ConvexError("this file does not exists")
        }

        const hasAccess = await hasAccessToOrg(ctx, identity.tokenIdentifier, file.orgId)

        if (!hasAccess) {
            throw new ConvexError("you do not have access to delete this file")

        }

        await ctx.db.delete(args.fileId)

    },
})