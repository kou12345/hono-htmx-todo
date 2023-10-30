import { serve } from "@hono/node-server";
import { Hono } from "hono";

import Database from "better-sqlite3";
import { BetterSQLite3Database, drizzle } from "drizzle-orm/better-sqlite3";
import { Item } from "./components/item";

import { zValidator } from "@hono/zod-validator";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { AddTodo } from "./components/addTodo";
import { ItemForm } from "./components/itemForm";
import { renderer } from "./components/renderer";
import { todos } from "./schema";
import { Todo } from "./types";

const sqlite = new Database("sqlite.db");
console.log("sqlite", sqlite);
const db: BetterSQLite3Database = drizzle(sqlite);

const app = new Hono();

app.get("/todo/:id", async (c) => {
  const id = Number(c.req.param("id"));
  console.log("id", id);
  const todo = await db.select().from(todos).where(eq(todos.id, id));
  return c.render(<Item todo={todo[0]} />);
});

app.get("/todo/:id/edit", async (c) => {
  const id = Number(c.req.param("id"));
  console.log("id", id);
  const todo = await db.select().from(todos).where(eq(todos.id, id));
  return c.render(<ItemForm todo={todo[0]} />);
});

app.get("*", renderer);

app.get("/", async (c) => {
  console.log("todos");
  const result: Todo[] = await db.select().from(todos);
  console.log(result);
  return c.render(
    <div>
      <AddTodo />
      {result.map((todo: Todo) => (
        <Item todo={todo} />
      ))}
      <div id="todo"></div>
    </div>
  );
});

app.post("/todo", zValidator("form", z.object({ title: z.string().min(1) })), async (c) => {
  const { title } = c.req.valid("form");
  console.log("title", title);
  const todo = await db.insert(todos).values({ title }).returning();
  console.log("todo", todo);
  return c.html(<Item todo={todo[0]} />);
});

app.delete("/todo/:id", async (c) => {
  const id = Number(c.req.param("id"));

  console.log("id", id);

  const deletedTodo = await db.delete(todos).where(eq(todos.id, id)).returning();
  console.log("deletedTodo", deletedTodo);
  c.status(200);
  return c.body(null);
});

serve(app);
