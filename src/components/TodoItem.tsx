import { Checkbox } from "@headlessui/react";
import { CheckIcon, PencilLineIcon, Trash2 } from "lucide-react";
import { Button } from "./ui/Button";
import Modal from "./Modal";
import { useState } from "react";
import { ExtendedTodoSchemaType } from "../lib/types/types";
import { DueBadge } from "./DueBadge";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { fetcher } from "../lib/fetcher";

export default function TodoItem({
    todos
}: {
    todos: ExtendedTodoSchemaType
}){
    const [open , setOpen] = useState<boolean>(false);

    const {mutate} = useMutation({
        mutationFn: fetcher
    });
    const queryClient = useQueryClient()

    const handleDelete=()=>{
        mutate({
            method: "DELETE",
            path: `/todos/${todos.id}`,
            body: ""
        }, {
            onSuccess: ()=>{
                queryClient.invalidateQueries({
                    queryKey: ["todos"]
                })
                setOpen(false);
            }
        })
    }
    return (
        <>
            <div className={`flex justify-between p-3 w-full group border border-border rounded-xl`}>
                <div className="flex items-start gap-3 w-full">
                    <Checkbox className="shrink-0 group size-5 rounded-full border bg-white data-[checked]:bg-white flex items-center justify-center cursor-pointer">
                        <CheckIcon size={17} className="hidden group-data-[checked]:block"/>
                    </Checkbox>
                    <div className="flex items-start justify-between w-full">
                        <div className="flex flex-col">
                            <h1 className="text-lg font-medium">{todos?.title}</h1>
                            <p className="max-w-[550px] truncate text-neutral-500">{todos.description}</p>
                            <DueBadge data={todos.dueDate}/>
                        </div>
                        <div className="hidden gap items-center group-hover:flex">
                            <Button onClick={()=>setOpen(true)} size={"sm"} variant={"link"}>
                                <PencilLineIcon size={19} className="cursor-pointer"/>
                            </Button>
                            <Button onClick={()=>handleDelete()} size={"sm"} variant={"link"}>
                                <Trash2 size={19} className="cursor-pointer text-destructive"/>
                            </Button>
                        </div>
                    </div>
                </div>
                <Modal type="edit" open={open} setOpen={setOpen} data={todos} />
            </div>
        </>
    )
}