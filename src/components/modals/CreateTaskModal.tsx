import { Dialog, DialogPanel, Input, Textarea } from "@headlessui/react";
import { useModal } from "../../context/ModalContext";
import { Button } from "../ui/Button";
import { Calendar } from "lucide-react";
import { useRef, useState } from "react";

export default function CreateTaskModal(){
    const {open , setOpen} = useModal();
    const dateInputRef = useRef<HTMLInputElement>(null);
    const [date , setDate] = useState("")

    return (
        <Dialog open={open} onClose={() => setOpen(false)} className="relative z-50">
            <div className="fixed inset-0 flex w-screen items-center justify-center bg-black/5 backdrop-blur-xs tracking-tight">
                <DialogPanel className="max-w-lg w-full border border-border bg-white rounded-lg shadow">
                    <div className="p-4">
                        <div className="flex flex-col gap-2">
                            <Input type="text" autoFocus placeholder="Task name" className={"py-3 px-2 outline-none text-2xl placeholder:text-2xl font-medium placeholder:text-neutral-400"}/>
                            <Textarea placeholder="Description of the task" className={"py-3 px-2 border border-border rounded-lg text-base outline-none placeholder:text-lg resize-none font-medium placeholder:text-neutral-400 text-neutral-500"}/>
                        </div>
                    </div>
                    <div className="flex items-center justify-between px-4 py-4 border-t border-border ">
                        <div className="flex items-center gap-2">
                            <Input ref={dateInputRef} onChange={(e)=>setDate(e.target.value)} type="date" id="date-picker" className={"absolute opacity-0 z-[-1]"} />
                            <Button type="button" onClick={()=>dateInputRef.current?.showPicker()} size={"sm"} variant={"outline"} className="hover:bg-black/5 hover:text-black cursor-pointer gap-2">
                                <Calendar size={15}/>
                                <span>
                                    Due Date
                                </span>
                            </Button>
                            <span className="text-sm">{date}</span>
                        </div>
                        <div className="flex justify-end gap-4">
                            <Button onClick={() => setOpen(false)} variant={"ghost"} size={"sm"} className="hover:bg-neutral-200 hover:text-black cursor-pointer">Cancel</Button>
                            <Button onClick={() => setOpen(false)} variant={"default"} size={"sm"} className="cursor-pointer">Create Task</Button>
                        </div>
                    </div>
                </DialogPanel>
            </div>
        </Dialog>
    )
}