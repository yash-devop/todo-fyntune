import {InferType} from "yup"
import { teamSchema } from "../schemas/schemas"


export type TeamSchemaType = InferType<typeof teamSchema>;

export type ModalProps<T> = {
    open: boolean,
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
    data?: T
};