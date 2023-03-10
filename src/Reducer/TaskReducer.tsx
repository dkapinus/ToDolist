import {TaskStateType} from "../App";
import {TaskType} from "../Todolist";
import {AddTodolistType, DeleteTodolistType, deleteTodolistTypeAC} from "./TodoReducer";



export const TaskReducer = (state: TaskStateType, action: TsarType) => {
    switch (action.type) {
        case 'REMOVE-TASK' : {
      return {...state,[action.payload.todolistId]:state[action.payload.todolistId].filter((el)=>el.id!==action.payload.id)}
        }
        case 'CHANGE-STATUS-TASK' : {
            return {...state,[action.payload.todolistId]:state[action.payload.todolistId].map((el)=>el.id===action.payload.id ? {...el,isDone:action.payload.e}:el)}
        }
        case 'ADD-TASK' : {
            return {...state,[action.payload.todolistId]:[...state[action.payload.todolistId],action.payload.newTask]}
        }
        case 'CHANGE-ENABLE-SPAN-TASK' : {
            return {...state,[action.payload.todolistId]:state[action.payload.todolistId].map((el)=>el.id===action.payload.id ?{...el,title:action.payload.e} :el)}
        }
        case 'ADD-TODOLIST-TASK' : {
            return {...state,[action.payload.todolistId3]:[]}
        }
        default:
            return state
    }
}




type TsarType = RemoveTaskType|ChangeStatusTaskType|AddTaskType|ChangeEnableSpanType|ADDTodolistType|AddTodolistType|DeleteTodolistType


type RemoveTaskType = ReturnType<typeof RemoveTaskTypeAC>

export const RemoveTaskTypeAC = (todolistId:string,id: string) => {
    return {
        type: 'REMOVE-TASK',
        payload: {
            todolistId: todolistId,
            id:id
        }
    } as const // TODO required!!!!!!!!!
}



type ChangeStatusTaskType = ReturnType<typeof changeStatusTaskTypeAC>

export const changeStatusTaskTypeAC = (todolistId:string,id: string,e:boolean) => {
    return {
        type: 'CHANGE-STATUS-TASK',
        payload: {
            todolistId: todolistId,
            id:id,
            e:e
        }
    } as const // TODO required!!!!!!!!!
}

type AddTaskType = ReturnType<typeof addTaskTypeAC>

export const addTaskTypeAC = (todolistId:string,newTask:TaskType) => {
    return {
        type: 'ADD-TASK',
        payload: {
            todolistId: todolistId,
            newTask:newTask
        }
    } as const // TODO required!!!!!!!!!
}



type ChangeEnableSpanType = ReturnType<typeof ChangeEnableSpanAC>

export const ChangeEnableSpanAC = (todolistId:string,id: string,e:string) => {
    return {
        type: 'CHANGE-ENABLE-SPAN-TASK',
        payload: {
            todolistId: todolistId,
            id:id,
            e:e
        }
    } as const // TODO required!!!!!!!!!
}

type ADDTodolistType = ReturnType<typeof ADDTodolistTypeAC>

export const ADDTodolistTypeAC = (todolistId3:string) => {
    return {
        type: 'ADD-TODOLIST-TASK',
        payload: {
            todolistId3:todolistId3,

        }
    } as const // TODO required!!!!!!!!!
}