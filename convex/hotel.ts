import { v } from "convex/values";
import { mutation } from "./_generated/server";
const images = [
  "https://i.pinimg.com/236x/28/4f/7a/284f7a25034144ed21b72277bff57e11.jpg",
  "https://i.pinimg.com/236x/82/c2/e6/82c2e6bfa0c1df03bac636d5aeab8400.jpg",
];
export const create = mutation({
  args: {
    name: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error(" Not Authenticated");
    }
    const randomImage = images[Math.floor(Math.random()) * images.length];
    const hotel = await ctx.db.insert("hotel", {
      name: args.name,
      authorId: identity.subject,
      authorName: identity.name!,
      imageUrl: randomImage,
    });
    return hotel;
  },
});
