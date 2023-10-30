import { Todo } from "../types";

export const Item = ({todo}: {todo: Todo}) => {
  return (
    <p className="text-red-500">
      {todo.title}
    </p>
  )
  };
