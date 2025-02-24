import { Method } from "axios";
import { axiosClient } from "./api/api";

export const fetcher=async({
    path,
    body,
    method = "GET"
}:{
    method: Method,
    body: any,
    path: string
})=>{
    const response = await axiosClient({
        method,
        url: path,
        data: body,
    })

    console.log('response',response);

    return response.data;
}