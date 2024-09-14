import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const wishesTable = pgTable("wishes_table", {
  id: serial("id").primaryKey(),
  userId: text("user_id").notNull().unique(),
  authorName: text("author_name"),
  content: text("content").notNull(),
  role: text("role"),
  group: text("group"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export type InsertWish = typeof wishesTable.$inferInsert;
export type SelectWish = typeof wishesTable.$inferSelect;
