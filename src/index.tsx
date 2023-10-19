import { serve } from "@hono/node-server";
import { Hono } from "hono";
import type { FC } from "hono/jsx";

import Database from "better-sqlite3";
import { BetterSQLite3Database, drizzle } from "drizzle-orm/better-sqlite3";
import { todos } from "./schema";

const sqlite = new Database("sqlite.db");
console.log("sqlite", sqlite);
const db: BetterSQLite3Database = drizzle(sqlite);

type Todo = {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
};

const app = new Hono();
app.get("/", async (c) => {
  console.log("todos");
  const result: Todo[] = await db.select().from(todos);
  console.log(result);
  return c.html(<Top todos={result} />);
});

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
      <h1>todo</h1>
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
