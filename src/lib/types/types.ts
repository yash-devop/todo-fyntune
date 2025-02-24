import {InferType} from "yup"
import { todoSchema } from "../schemas/schemas"


export type TodoSchemaType = InferType<typeof todoSchema>;


type ModalType = "add" | "edit";
export type ModalProps<T> = {
    open: boolean,
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
    type: ModalType,
    data?: T,
};