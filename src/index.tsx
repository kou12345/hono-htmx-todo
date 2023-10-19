import { serve } from "@hono/node-server";
import { Hono } from "hono";
import type { FC } from "hono/jsx";

import Database from "better-sqlite3";
import { BetterSQLite3Database, drizzle } from "drizzle-orm/better-sqlite3";
import { Item } from "./components/item";
import { renderer } from "./components/layout";
import { todos } from "./schema";
import { Todo } from "./types";

const sqlite = new Database("sqlite.db");
console.log("sqlite", sqlite);
const db: BetterSQLite3Database = drizzle(sqlite);

const app = new Hono();

app.get("*", renderer);

app.get("/", async (c) => {
  console.log("todos");
  const result: Todo[] = await db.select().from(todos);
  console.log(result);
  return c.render(
    <div>
      {result.map((todo: Todo) => (
        <Item todo={todo} />
      ))}
    </div>
  );
});
// app.get("*", renderer);

app.get("/htmx", (c) => {
  console.log("htmx");
  return c.html(
    <html>
      <head>
        <script src="https://unpkg.com/htmx.org@1.3.3"></script>
      </head>
      <body>
        <h1>htmx</h1>
      </body>
    </html>
  );
});

const Top: FC = (props: { todos: Todo[] }) => {
  return (
    <div>
      {props.todos.map((todo: Todo) => (
        <ul>
          <li>{todo.title}</li>
          <li>{todo.description}</li>
          <li>{todo.completed ? "Done" : "in Progress"}</li>
        </ul>
      ))}
    </div>
  );
};

serve(app);
