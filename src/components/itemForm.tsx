import { Todo } from "../types";

export const ItemForm = ({ todo }: { todo: Todo }) => {
  return (
    <form hx-put={`/todo/${todo.id}/edit`} hx-target="this" hx-swap="outerHTML">
      <p class="flex row items-center justify-between py-1 px-4 my-1 rounded-lg text-lg border bg-gray-100 text-gray-600 mb-2">
        <input type="text" name="title" value={todo.title} />
      </p>
      <div class="flex justify-end">
        <button
          hx-target={`#todo${todo.id}`}
          hx-get={`/todo/${todo.id}/edit`}
          class="font-medium px-2 text-blue-600"
        >
          Submit
        </button>
        <button
          hx-get={`/todo/${todo.id}`}
          hx-target={`#todo${todo.id}`}
          hx-swap="outerHTML"
          class="font-medium px-2 text-red-600"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};
