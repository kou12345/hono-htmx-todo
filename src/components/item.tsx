import { Todo } from "../types";

export const Item = ({ todo }: { todo: Todo }) => {
  return (
    <p
      hx-delete={`/todo/${todo.id}`}
      hx-swap="outerHTML"
      class="flex row items-center justify-between py-1 px-4 my-1 rounded-lg text-lg border bg-gray-100 text-gray-600 mb-2"
    >
      {todo.title}
      <button class="font-medium">Delete</button>
    </p>
  );
};
