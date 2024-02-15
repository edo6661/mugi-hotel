import { v } from "convex/values";
import { query } from "./_generated/server";

export const get = query({
  args: {},
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Unauthorized");
    }
    const hotels = await ctx.db
      .query("hotel")
      .withIndex("by_authorId", (q) => q.eq("authorId", identity.subject))
      .order("desc")
      .collect();
    return hotels;
  },
});
