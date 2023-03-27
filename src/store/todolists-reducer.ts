import {FilterValuesType,  TodolistType} from "../App";
import {v1} from "uuid";
import {todolistId1, todolistId2} from "./tasks-reducer";





const initialState : TodolistType[] = [
    {id: todolistId1, title: "What to learn", filter: "all"},
    {id: todolistId2, title: "What to buy", filter: "all"}]





export const todolistsReducer = (state=initialState, action: TsarType):TodolistType[] => {
    switch (action.type) {
        case 'FILTER': {
            return state.map((el)=>el.id===action.payload.todolistId ? {...el,filter:action.payload.nameButton}:el)
        }
        case 'REMOVE-TODOLIST': {
            return state.filter((el)=>el.id !==action.payload.todolistId)
        }
        case 'CHANGE-TODOLIST_TITLE': {
            return state.map((el) => el.id === action.payload.todolistId ? {...el, title: action.payload.newTitle} : el)
        }
        case 'ADD-TODOLIST': {
            return [...state ,action.payload.newTitle]
        }
        default :
            return state
    }
}


export type TsarType =  FilterType |RemoveTodolistType|ChangeTodolistTitleType|ADDTodolistType


type RemoveTodolistType = ReturnType<typeof RemoveTodolistAC>
export const RemoveTodolistAC = (todolistId: string) => {
    return {
        type: 'REMOVE-TODOLIST',
        payload: {
            todolistId: todolistId,

        }
    } as const
}

type FilterType = ReturnType<typeof FilterTypeAC>
export const FilterTypeAC = (todolistId: string, nameButton: FilterValuesType) => {
    return {
        type: 'FILTER',
        payload: {
            todolistId: todolistId,
            nameButton: nameButton
        }
    } as const
}

type  ChangeTodolistTitleType= ReturnType<typeof ChangeTodolistTitleAC>
export const ChangeTodolistTitleAC = (todolistId: string, newTitle: string) => {
    return {
        type: 'CHANGE-TODOLIST_TITLE',
        payload: {
            todolistId: todolistId,
            newTitle:newTitle
        }
    } as const
}

type  ADDTodolistType= ReturnType<typeof ADDTodolistAC>
export const ADDTodolistAC = ( newTitle: TodolistType) => {
    return {
        type: 'ADD-TODOLIST',
        payload: {
            newTitle:newTitle,

        }
    } as const
}