import {InferType} from "yup"
import { todoSchema } from "../schemas/schemas"


export type TodoSchemaType = InferType<typeof todoSchema>;

export type ModalProps<T> = {
    open: boolean,
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
    data?: T
};