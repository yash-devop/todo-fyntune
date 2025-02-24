import { Plus } from "lucide-react"
import { Button } from "./components/ui/Button"
import TodoList from "./components/TodoList"
import Modal from "./components/Modal";
import { useState } from "react";

function App() {
  const [open , setOpen] = useState<boolean>(false);

  return (
    <>
      <div className="max-w-[820px] mx-auto py-10 min-h-screen tracking-tight">
        <p className="text-3xl font-medium">Tasks</p>
        <div className="flex flex-col gap-2 my-10">
          <TodoList />
          <Button onClick={()=>setOpen(true)} className="bg-primary-foreground w-fit gap-2 text-black/50 hover:text-primary hover:bg-transparent cursor-pointer items-center" variant={"ghost"}>
            <Plus size={15} className="mt-0.5 text-primary"/>
            Add Task
          </Button>
          <Modal open={open} setOpen={setOpen} type="add"/>
        </div>
      </div>
    </>
  )
}

export default App;