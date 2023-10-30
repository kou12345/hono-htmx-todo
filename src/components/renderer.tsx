import { html } from "hono/html";
import { jsxRenderer } from "hono/jsx-renderer";

export const renderer = jsxRenderer(({ children }) => {
  console.log("renderer");
  return html`
    <!DOCTYPE html>
    <html lang="js">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <script src="https://unpkg.com/htmx.org@1.3.3"></script>
        <script src="https://cdn.tailwindcss.com"></script>
        <link rel="stylesheet" href="/src/style.css" />
        <title>ToDo</title>
      </head>
      <body>
        <div class="p-4">
          <h1 class="text-4xl font-bold mb-4"><a href="/">Todo</a></h1>
          ${children}
        </div>
      </body>
    </html>
  `;
});
