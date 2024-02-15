import { v } from "convex/values";
import { query } from "./_generated/server";

export const get = query({
  args: {},
  handler: async (ctx, args) => {
    const hotels = await ctx.db.query("hotel").order("desc").collect();
    return hotels;
  },
});
