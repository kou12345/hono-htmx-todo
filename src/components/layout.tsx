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
        <title>ToDo</title>
      </head>
      <body>
        <h1>Todo</h1>
        ${children}
      </body>
    </html>
  `;
});
