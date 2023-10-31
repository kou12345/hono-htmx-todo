import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const todos = sqliteTable("todos", {
  id: integer("id").primaryKey(),
  title: text("title"),
  description: text("description"),
  completed: integer("completed", { mode: "boolean" }),
  createdAt: integer("createdAt", { mode: "timestamp" }).default(sql`CURRENT_TIMESTAMP`),
  updatedAt: integer("updatedAt", { mode: "timestamp" }).default(sql`CURRENT_TIMESTAMP`),
});
