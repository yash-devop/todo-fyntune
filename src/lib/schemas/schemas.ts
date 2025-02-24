import {object , string} from "yup"

export const teamSchema = object({
    title: string().required("Title is Required"),
    description: string().optional(),
    dueDate: string().required("Due date is Required")
});