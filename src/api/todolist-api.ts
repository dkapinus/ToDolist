import axios, { AxiosResponse } from 'axios'
import {FilterValueType} from "../AppWithRedux";



 const instance =axios.create(
     {
         baseURL:`https://social-network.samuraijs.com/api/1.1/`,
         withCredentials: true,
     }
 )





export const todolistAPI = {
    getTodolist() {
        return instance.get<TodolistType[]>('todo-lists');
    },
    createTodolist(title: string) {
        return instance.post<ResponseType<{ item: TodolistType }>, AxiosResponse<ResponseType<{ item: TodolistType }>>, { title: string }>('todo-lists', {title});
    },
    deleteTodolist(id: string) {
        return instance.delete<ResponseType>(`todo-lists/${id}`);
    },
    updateTodolist(id: string, title: string) {
        return instance.put<ResponseType, AxiosResponse<ResponseType>, { title: string }>(`todo-lists/${id}`, {title});
    },

}

// types

export type ResponseType<D = {}> = {
    resultCode: number
    messages: Array<string>
    fieldsErrors: Array<string>
    data: D
}

export type TodolistType = {
    id: string,
    title: string,
    filter: FilterValueType
    addedDate: string
    order: number

}



