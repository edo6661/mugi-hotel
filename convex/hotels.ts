import { v } from "convex/values";
import { query } from "./_generated/server";

export const getHotels = query({
  args: {},
  handler: async (ctx, args) => {
    return await ctx.db.query("hotel").order("desc").collect();
  },
});

export const getHotelsWithQuery = query({
  args: {
    q: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("hotel")
      .withSearchIndex("search_name", (q) => q.search("name", args.q))
      .collect();
  },
});
