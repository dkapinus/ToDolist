import axios from 'axios'



 const instance =axios.create(
     {
         baseURL:`https://social-network.samuraijs.com/api/1.1/`,
         withCredentials: true,
     }
 )

export const todolistAPI = {

    getTodolist() {
        const promise = instance.get<TodolistType[]>(
            `todo-lists`)
        return promise
    },
    createTodolist(title: string) {
        const promise = instance.post<ResponseTodolistType<{item:TodolistType}>>(
            `todo-lists`, {title: title}
        )
        return promise
    },


    deleteTodolist(todolistId: string) {
        const promise = instance.delete<ResponseTodolistType>(
            `todo-lists/${todolistId}`,


        )
        return promise
    },
    updateTodolist(todolistId: string, title: string) {
        const promise = instance.put<ResponseTodolistType>(
            `todo-lists/${todolistId}`,
            {title: title},
        )
        return promise
    },


}

type TodolistType = {
    id: string
    addedDate: Date
    order: number
    title: string

}

type ResponseTodolistType<T={}> = {

    resultCode: number
    messages: [],
        data: T

}

