
import {TaskTypeForDispatch} from "../App";
import {v1} from 'uuid'

export const reducerTasks = (state:TaskTypeForDispatch, action:TsarType)=> {
    switch (action.type) {
        case "REMOVE-TASK":{
            return {...state, [action.payload.todolistID]:state[action.payload.todolistID].filter((el)=>el.id!==action.payload.taskId)}
        }
        case "ADD-TASK":{
            let NewTask = {id: v1(), title: action.payload.value, isDone: true}
            return {...state,[action.payload.todolistID]:[NewTask,...state[action.payload.todolistID]]}
        }
        case "CHANGE-STATUS":{

            return {...state,[action.payload.todolistID]:state[action.payload.todolistID].map((el)=>el.id===action.payload.id ?{...el,isDone:action.payload.e} :el)}
        }
        case "CHANGE-SPAN":{

            return {...state,[action.payload.todolistID]:state[action.payload.todolistID].map((el)=>el.id===action.payload.taskId ?{...el,title:action.payload.title} :el)}
        }
        case "ADD-TODOLIST":{

            return {...state,[action.todolistID3]:[]}

        }

        default :return state
    }
}

type TsarType =removeTaskACType|AddMessageACType|ChangeStatusType|ChangeTitleSpan|AddTodolistACType


type removeTaskACType =ReturnType<typeof removeTaskAC>
export  const  removeTaskAC =(todolistID:string,taskId:string)=> {
    return {
        type:'REMOVE-TASK',
        payload : {
            todolistID,
            taskId


        }
    } as const
}

type AddMessageACType =ReturnType<typeof addTaskAC>
export  const  addTaskAC =(todolistID:string,value:string)=> {
    return {
        type:'ADD-TASK',
        payload : {
            todolistID,
            value


        }
    } as const
}

type ChangeStatusType =ReturnType<typeof ChangeStatusAC>
export  const  ChangeStatusAC =(todolistID:string,id:string,e:boolean)=> {
    return {
        type:'CHANGE-STATUS',
        payload : {
            todolistID,
            id,
            e


        }
    } as const
}

type ChangeTitleSpan =ReturnType<typeof ChangeTitleSpanAC>
export  const  ChangeTitleSpanAC =(todolistID:string,taskId:string,title:string)=> {
    return {
        type:'CHANGE-SPAN',
        payload : {
            todolistID,
            taskId,
            title
        }
    } as const
}

type AddTodolistACType =ReturnType<typeof AddTodolistTaskAC>
export  const  AddTodolistTaskAC =(todolistID3:string)=> {
    return {
        type:'ADD-TODOLIST',
        todolistID3
    } as const
}