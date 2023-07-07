import axios from 'axios'



 const instance =axios.create(
     {
         baseURL:`https://social-network.samuraijs.com/api/1.1/`,
         withCredentials: true,
     }
 )

export const taskAPI = {

    getTask(todolistId: string) {
        const promise = instance.get<TaskType[]>(
            `/todo-lists/${todolistId}/tasks`)
        return promise
    },
    createTask(todolistId: string,title: string) {
        const promise = instance.post<ResponseTaskType<{item:TaskType}>>(
            `/todo-lists/${todolistId}/tasks`, {title: title}
        )
        return promise
    },


    deleteTask(todolistId: string,taskId:string) {
        const promise = instance.delete<ResponseTaskType>(
            `/todo-lists/${todolistId}/tasks/${taskId}`,


        )
        return promise
    },
    updateTask(todolistId: string, taskId:string, title: string) {
        const promise = instance.put<ResponseTaskType>(
            `/todo-lists/${todolistId}/tasks/${taskId}`,
            {title: title},
        )
        return promise
    },


}

type TaskType = {
    description: string
    title: string
    completed: boolean
    startDate: Date
    deadline: Date
    id: string
    todoListId: string
    addedDate: Date
}

type ResponseTaskType<T={}> = {

    resultCode: number
    messages: [],
        data: T

}

