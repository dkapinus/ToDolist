import {FilterValueType, TodolistType} from "../App";


export const TodoReducer =(state:TodolistType[],action:TsarType)=> {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {

            return  state.filter((el)=>el.id!==action.payload.todolistId)
        }
        case 'CHANGE-TODOLIST-NAME': {
            return  state.map((el)=>el.id===action.payload.todolistId ?{...el,title:action.payload.e} :el)
        }
        case 'ADD-TODOLIST': {
            return  [...state,action.payload.newTodolist]
        }
        case 'FILTER-TODOLIST': {
            return  state.map((el)=>el.id===action.payload.todolistId ?{...el,filter:action.payload.nameButton} :el)
        }
        default:
            return state

    }
}



type TsarType =DeleteTodolistType|ChangeNameTodolistType|AddTodolistType|FilterTodolistType


export type DeleteTodolistType = ReturnType<typeof deleteTodolistTypeAC>

export const deleteTodolistTypeAC = (todolistId: string) => {
    return {
        type: 'REMOVE-TODOLIST',
        payload: {
            todolistId: todolistId,
        }
    } as const // TODO required!!!!!!!!!
}

type ChangeNameTodolistType = ReturnType<typeof changeNameTodolistTypeAC>

export const changeNameTodolistTypeAC = (todolistId: string,e:string) => {
    return {
        type: 'CHANGE-TODOLIST-NAME',
        payload: {
            todolistId: todolistId,
            e:e
        }
    } as const // TODO required!!!!!!!!!
}

export type AddTodolistType = ReturnType<typeof addTodolistTypeAC>

export const addTodolistTypeAC = (newTodolist:TodolistType) => {
    return {
        type: 'ADD-TODOLIST',
        payload: {
            newTodolist:newTodolist
        }
    } as const // TODO required!!!!!!!!!
}

type FilterTodolistType = ReturnType<typeof filterTodolistTypeAC>

export const filterTodolistTypeAC = (todolistId:string,nameButton: FilterValueType) => {
    return {
        type: 'FILTER-TODOLIST',
        payload: { todolistId:todolistId,
            nameButton:nameButton

        }
    } as const // TODO required!!!!!!!!!
}