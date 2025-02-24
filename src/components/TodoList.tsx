import { useQuery } from "@tanstack/react-query";
import TodoItem from "./TodoItem";
import { ExtendedTodoSchemaType } from "../lib/types/types";
import { fetcher } from "../lib/fetcher";


export default function TodoList(){
    const {data} = useQuery<ExtendedTodoSchemaType[]>({
        queryKey: ["todos"],
        queryFn: ()=>{
            return fetcher({
                body: "",
                method: "GET",
                path: "/todos?_sort=dueDate&_order=asc"
            })
        }
    })
    return data && data.length > 0 ? data.map((val)=>(
        <TodoItem key={val.id} todos={val}/>
    )): <div className="flex items-center justify-center pb-5">
        <span>Ahh , empty todo lists.</span>
    </div>
}