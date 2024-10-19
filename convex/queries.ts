import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const createBooks = mutation({
  args: { title: v.string(), author: v.string() },
  handler: async (ctx, args) => {
    const newBookId = await ctx.db.insert("books", {
      title: args.title,
      author: args.author,
      isCompleted: false,
    });
    return newBookId;
  },
});

export const getBooks = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("books").collect();
  },
});

export const deleteBooks = mutation({
  args: { id: v.id("books") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
    return "deleted";
  },
});
