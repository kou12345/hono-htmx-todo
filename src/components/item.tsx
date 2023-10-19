import { Todo } from "../types";

export const Item = ({todo}: {todo: Todo}) => {
  return (
    <p>
      {todo.title}
    </p>
  )
  };
