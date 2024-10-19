import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  books: defineTable({
    title: v.string(),
    author: v.string(),
    isCompleted: v.boolean(),
  }),
});
