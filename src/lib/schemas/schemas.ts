import {object , string} from "yup"
import { isValidDate } from "../../utils/utils";

export const todoSchema = object({
    title: string().required("Title is Required"),
    description: string().optional(),
    dueDate: string().required("Due date is Required").test((date)=>{
        const selectedDate = new Date(date);
        return isValidDate(selectedDate)
    })
});