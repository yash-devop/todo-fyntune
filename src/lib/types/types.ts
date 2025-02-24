import {InferType} from "yup"
import { todoSchema } from "../schemas/schemas"


export type TodoSchemaType = InferType<typeof todoSchema>;
export interface ExtendedTodoSchemaType extends TodoSchemaType {
    id?: string
}

type ModalType = "add" | "edit";
export type ModalProps<T> = {
    open: boolean,
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
    type: ModalType,
    data?: T,
};