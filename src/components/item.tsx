import { Todo } from "../types";

export const Item = ({ todo }: { todo: Todo }) => {
  return (
    <div id={`todo${todo.id}`}>
      <p class="flex row items-center justify-between py-1 px-4 my-1 rounded-lg text-lg border bg-gray-100 text-gray-600 mb-2">
        {todo.title}
      </p>
      <div class="flex justify-end">
        <button
          hx-delete={`/todo/${todo.id}`}
          hx-target={`#todo${todo.id}`}
          hx-swap="outerHTML"
          class="font-medium px-2 text-blue-600"
        >
          Update
        </button>
        <button
          hx-delete={`/todo/${todo.id}`}
          hx-target={`#todo${todo.id}`}
          hx-swap="outerHTML"
          class="font-medium px-2 text-red-600"
        >
          Delete
        </button>
      </div>
    </div>
  );
};
