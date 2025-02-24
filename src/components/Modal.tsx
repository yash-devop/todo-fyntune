import { Dialog, DialogPanel, Input, Textarea } from "@headlessui/react";
import { Button } from "./ui/Button";
import { Calendar } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { ExtendedTodoSchemaType, ModalProps, TodoSchemaType } from "../lib/types/types";
import { todoSchema } from "../lib/schemas/schemas";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useQueryClient} from "@tanstack/react-query"
import { fetcher } from "../lib/fetcher";
import { toast } from "sonner";

export default function Modal<T extends TodoSchemaType>({
    type,
    open,
    setOpen,
    data
}:ModalProps<T>){

    const [showDate , setShowDate] = useState("")
    const dateInputRef = useRef<HTMLInputElement>(null);
    const queryClient = useQueryClient();


    const {
        handleSubmit,
        register,
        setValue,
        getValues,
        clearErrors,
        reset,
        formState: {
            errors,
        }
    } = useForm<TodoSchemaType>({
        resolver: yupResolver(todoSchema),
        defaultValues: {...data}
    });

    const {mutate} = useMutation({
        mutationFn: fetcher,
        onMutate: async(todo)=>{
            console.log('onmutatetetet', todo.body);
            await queryClient.cancelQueries({ queryKey: ["todo"] });
            const prevTodos = queryClient.getQueryData<TodoSchemaType>(["todos"])
            console.log('prevTodos', prevTodos);
        },
        onSuccess: ()=>{
            queryClient.invalidateQueries({
                queryKey: ["todos"]
            })
            reset();
        }
    })

    const onDateChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
        setValue("dueDate",e.target.valueAsDate?.toISOString()!);
        setShowDate(e.target.value) 
    }

    const onSubmit:SubmitHandler<ExtendedTodoSchemaType>=async(data)=>{
        if(type === "add"){
            mutate({
                method: "POST",
                path: "/todos",
                body: data
            }, {
                onSuccess: ()=>{
                    setOpen(false)
                    toast.success("Todo Created Successfully")
                }
            })
        }
        else if(type === "edit"){
            mutate({
                method: "PUT",
                path: `/todos/${data.id}`,
                body: data
            }, {
                onSuccess: ()=>{
                    toast.success("Edited Successfully")
                    setOpen(false)
                }
            })
        }
    }

    const handleDateClick=()=>{
        dateInputRef.current?.showPicker();

    }

    useEffect(()=>{
        if(getValues("dueDate")){
            clearErrors("dueDate")
        }
    },[showDate])

    useEffect(()=>{
        if(data){
            setShowDate(data?.dueDate)
        }
    },[data?.dueDate])

    return (
        <Dialog open={open} onClose={()=>setOpen(false)} className="relative z-50">
            <form onSubmit={handleSubmit(onSubmit)} className="fixed inset-0 flex w-screen items-center justify-center bg-black/5 backdrop-blur-xs tracking-tight">
                <DialogPanel className="max-w-lg w-full border border-border bg-white rounded-lg shadow">
                    <div className="p-4">
                        <div className="flex flex-col gap-2">
                            <Input {...register("title")} type="text" autoFocus placeholder="Task name" className={"py-3 px-2 outline-none text-2xl placeholder:text-2xl font-medium placeholder:text-neutral-400"}/>
                            <Textarea {...register("description")} placeholder="Description of the task" className={"py-3 px-2 border border-border rounded-lg text-base outline-none placeholder:text-lg resize-none font-medium placeholder:text-neutral-400 text-neutral-500"}/>
                        </div>
                        <div className="flex text-sm flex-wrap gap-2 pt-1 text-destructive">
                            <p>{errors.title?.message}</p>
                            <p>{errors.dueDate?.message}</p>
                        </div>
                    </div>
                    <div className="flex items-center justify-between px-4 py-4 border-t border-border ">
                        <div className="flex items-center gap-2">
                            <Input {...register("dueDate")} ref={dateInputRef} onChange={onDateChange} type="date" id="date-picker" className={"absolute opacity-0 z-[-1]"} />
                            <Button type="button" onClick={handleDateClick} size={"sm"} variant={"outline"} className="hover:bg-black/5 hover:text-black cursor-pointer gap-2">
                                <Calendar size={15}/>
                                <span>
                                    Due Date
                                </span>
                            </Button>
                            <span className="text-sm">{showDate}</span>
                        </div>
                        <div className="flex justify-end gap-4">
                            <Button onClick={() => setOpen(false)} variant={"ghost"} size={"sm"} className="hover:bg-neutral-200 hover:text-black cursor-pointer">Cancel</Button>
                            <Button type="submit" variant={"default"} size={"sm"} className="cursor-pointer">Submit</Button>
                        </div>
                    </div>
                </DialogPanel>
            </form>
        </Dialog>
    )
}