import { v } from "convex/values";
import { defineSchema, defineTable } from "convex/server";

export default defineSchema({
  hotel: defineTable({
    name: v.string(),
    authorId: v.string(),
    authorName: v.string(),
    imageUrl: v.string(),
  })
    .index("by_authorId", ["authorId"])
    .searchIndex("search_name", {
      searchField: "name",
      filterFields: ["_creationTime"],
    })
    .searchIndex("search_author", {
      searchField: "authorName",
      filterFields: ["_creationTime"],
    }),
});
