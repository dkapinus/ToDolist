import {FilterValueType, TodolistsType} from "../App";



export const reducerTodolist = (state:TodolistsType[],action:TsarType)=> {
    switch (action.type) {
        case "REMOVE-TODOLIST":{
            return state.filter((el)=>el.id!==action.payload.todolistID)
        }
        case "FILTERED-TASK":{
            return state.map((el)=>el.id===action.payload.todolistID ? {...el, filter:action.payload.nameButton}: el)
        }
        case "ADD-TODOLIST":{

             let NewTask:TodolistsType={id:action.payload.todolistID3, title: action.payload.value, filter: 'All'}
            return [NewTask,...state]
        }


        default :return state
    }
}

type TsarType =removeTodolistACType|filteredTaskACType|AddTodolistACType


type removeTodolistACType =ReturnType<typeof removeTodolistAC>
export  const  removeTodolistAC =(todolistID: string)=> {
    return {
        type:'REMOVE-TODOLIST',
        payload : {
            todolistID
        }
    } as const
}

type filteredTaskACType =ReturnType<typeof filteredTasksAC>
export  const  filteredTasksAC =(todolistID:string,nameButton:FilterValueType)=> {
    return {
        type:'FILTERED-TASK',
        payload : {
            todolistID,
            nameButton
        }
    } as const
}

type AddTodolistACType =ReturnType<typeof AddTodolistAC>
export  const  AddTodolistAC =(todolistID3:string,value:string)=> {
    return {
        type:'ADD-TODOLIST',
        payload : {
           value,
            todolistID3
        }
    } as const
}