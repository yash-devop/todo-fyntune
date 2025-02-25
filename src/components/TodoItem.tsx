import { Checkbox } from "@headlessui/react";
import { CheckIcon, PencilLineIcon, Trash2 } from "lucide-react";
import { Button } from "./ui/Button";
import Modal from "./Modal";
import { useState } from "react";
import { ExtendedTodoSchemaType } from "../lib/types/types";
import { DueBadge } from "./DueBadge";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { fetcher } from "../lib/fetcher";
import { toast } from "sonner";
import StrikeThrough from "./Strikethrough";

export default function TodoItem({ todos }: { todos: ExtendedTodoSchemaType }) {
  const [open, setOpen] = useState<boolean>(false);
  const [isDone, setIsDone] = useState<boolean>(todos.status === "completed");

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: fetcher,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
    onError: () => {
      toast.error("Something went wrong.");
    },
  });

  const handleDelete = () => {
    mutate({
      method: "DELETE",
      path: `/todos/${todos.id}`,
      body: "",
    });

    toast.success("Todo Deleted Successfully");
    setOpen(false);
  };

  const handleToggleStatus = () => {
    const newStatus = isDone ? "pending" : "completed";

    mutate({
      method: "PATCH",
      path: `/todos/${todos.id}`,
      body: JSON.stringify({ status: newStatus }),
    });

    setIsDone(!isDone);
  };

  console.log("Each Todo item", todos);
  return (
    <>
      <div
        className={`flex justify-between p-3 w-full group border border-border rounded-xl ${
          isDone &&
          "bg-neutral-300 text-neutral-500 opacity-50 select-none cursor-not-allowed"
        } transition-all `}
      >
        <div className="flex items-start gap-3 w-full">
          <Checkbox
            checked={isDone}
            onClick={handleToggleStatus}
            className="mt-1 shrink-0 transition-all group size-5 rounded-md border data-[checked]:border-primary bg-white data-[checked]:bg-primary/20 flex items-center justify-center cursor-pointer"
          >
            {isDone && <CheckIcon size={17} className="text-primary" />}
          </Checkbox>

          <div className="flex items-start justify-between w-full">
            <div className="flex flex-col">
              {isDone ? (
                <StrikeThrough text={todos.title} />
              ) : (
                <h1 className="text-lg font-medium">{todos?.title}</h1>
              )}
              <p className="max-w-[550px] truncate text-neutral-500">
                {todos.description}
              </p>
              <DueBadge data={todos.dueDate} isDone={isDone} />
            </div>

            <div
              className={`hidden gap items-center ${
                !isDone ? "group-hover:flex" : ""
              }`}
            >
              <Button onClick={() => setOpen(true)} size="sm" variant="link">
                <PencilLineIcon size={19} className="cursor-pointer" />
              </Button>
              <Button onClick={handleDelete} size="sm" variant="link">
                <Trash2 size={19} className="cursor-pointer text-destructive" />
              </Button>
            </div>
          </div>
        </div>
        <Modal type="edit" open={open} setOpen={setOpen} data={todos} />
      </div>
    </>
  );
}
