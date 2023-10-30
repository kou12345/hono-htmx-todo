import { serve } from "@hono/node-server";
import { Hono } from "hono";

import Database from "better-sqlite3";
import { BetterSQLite3Database, drizzle } from "drizzle-orm/better-sqlite3";
import { Item } from "./components/item";

import { eq } from "drizzle-orm";
import { renderer } from "./components/renderer";
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
      {/* AddTodo */}
      {result.map((todo: Todo) => (
        <Item todo={todo} />
      ))}
    </div>
  );
});

app.delete("/todo/:id", async (c) => {
  const id = Number(c.req.param("id"));

  console.log("id", id);

  const deletedTodo = await db.delete(todos).where(eq(todos.id, id)).returning();
  console.log("deletedTodo", deletedTodo);
  c.status(200);
  return c.body(null);
});

// app.get("/htmx", (c) => {
//   console.log("htmx");
//   return c.html(
//     <html>
//       <head>
//         <script src="https://unpkg.com/htmx.org@1.3.3"></script>
//       </head>
//       <body>
//         <h1 class="text-red-500">htmx</h1>
//       </body>
//     </html>
//   );
// });

// const Top: FC = (props: { todos: Todo[] }) => {
//   return (
//     <div>
//       {props.todos.map((todo: Todo) => (
//         <ul>
//           <li>{todo.title}</li>
//           <li>{todo.description}</li>
//           <li>{todo.completed ? "Done" : "in Progress"}</li>
//         </ul>
//       ))}
//     </div>
//   );
// };

serve(app);
