import TodoItem from "./TodoItem";
import { ExtendedTodoSchemaType } from "../lib/types/types";

export default function TodoList({
  todos,
}: {
  todos?: ExtendedTodoSchemaType[];
}) {
  return todos && todos.length > 0 ? (
    todos.map((val) => <TodoItem key={val.id} todos={val} />)
  ) : (
    <div className="flex items-center justify-center pb-5">
      <span>Ahh , empty todo lists.</span>
    </div>
  );
}
