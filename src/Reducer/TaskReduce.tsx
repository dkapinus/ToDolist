import {TasksStateType} from "../App";
import {v1} from "uuid";


export const TaskReduce = (state: TasksStateType, action: TsarType,) => {
    switch (action.type) {
        case 'REMOVE-TASK' : {
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].filter((el) => el.id !== action.payload.id)
            }
        }
        case 'CHANGE-STATUS' : {
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].map((el) => el.id === action.payload.id ? {
                    ...el,
                    isDone: action.payload.e
                } : el)
            }
        }
        case 'ADD-MESSAGE-TASK' : {
            let newTask =  {id: v1(), title: action.payload.value, isDone: true}
            return {
                ...state,
                [action.payload.todolistId]:[newTask,...state[action.payload.todolistId]]
            }
        }
        case 'CHANGE-ENABLE-SPAN' : {

            return {
                ...state,[action.payload.todolistId]:state[action.payload.todolistId].map((el)=>el.id===action.payload.id ? {...el,title:action.payload.e}:el)
            }

        }
        case 'ADD-TODOLIST' : {

            return {
                ...state,[action.payload.todolistId3]:[]

            }

        }
        default:
            return state
    }

}


type TsarType = removeTaskType | changeStatusType|AddMessageType|ChangeEnableSpan|AddTodolist


type removeTaskType = ReturnType<typeof removeTaskAC>

export const removeTaskAC = (todolistId: string, id: string) => {
    return {
        type: 'REMOVE-TASK',
        payload: {
            todolistId: todolistId,
            id: id

        }
    } as const
}


type changeStatusType = ReturnType<typeof changeStatusAC>

export const changeStatusAC = (todolistId: string, id: string, e: boolean) => {
    return {
        type: 'CHANGE-STATUS',
        payload: {
            todolistId: todolistId,
            id: id,
            e


        }
    } as const
}


type AddMessageType = ReturnType<typeof addMessageAC>

export const addMessageAC = (todolistId:string,value:string) => {
    return {
        type: 'ADD-MESSAGE-TASK',
        payload: {
            todolistId: todolistId,
            value:value

        }
    } as const
}




type ChangeEnableSpan = ReturnType<typeof ChangeEnableSpanAC>

export const ChangeEnableSpanAC = (todolistId:string,id:string,e:string) => {
    return {
        type: 'CHANGE-ENABLE-SPAN',
        payload: {
            todolistId: todolistId,
            id:id,
            e:e

        }
    } as const
}


type AddTodolist  = ReturnType<typeof AddTodolistTaskAC>

export const AddTodolistTaskAC = (todolistId3 :string) => {
    return {
        type: 'ADD-TODOLIST',
        payload: {
            todolistId3

        }
    } as const
}



