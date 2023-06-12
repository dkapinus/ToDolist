import {FilterValueType, TodolistType} from "../AppWithReducer";
import {v1} from "uuid";


export const todoReducer = (state: TodolistType[], action: TsarType): TodolistType[] => {
    switch (action.type) {
        case 'FILTER-TASK': {
            return state.map((el) => el.id === action.payload.todolistID ? {
                ...el,
                filter: action.payload.filterValue
            } : el)
        }
        case 'REMOVE-TODOLIST': {
            return state.filter((el) => el.id !== action.payload.todolistID)

        }
        case 'CHANGE-TODO-NAME': {
            return state.map((el) => el.id === action.payload.todolistID ? {...el, title: action.payload.e} : el)

        }
        case 'ADD-TODOLIST': {

            return [...state, {id: action.payload.todolistId, title: action.payload.inputValue, filter: "all"}]

        }


        default:
            return state
    }
}


export type TsarType = filterTasksTodoType | removeTodolistType | changeTodolistNameType | addTodolistType


type filterTasksTodoType = ReturnType<typeof filterTasksTodoAC>

export const filterTasksTodoAC = (todolistID: string, filterValue: FilterValueType) => {
    return {
        type: 'FILTER-TASK',
        payload: {
            todolistID,
            filterValue
        }
    } as const
}

export type removeTodolistType = ReturnType<typeof removeTodolistAC>

export const removeTodolistAC = (todolistID: string) => {
    return {
        type: 'REMOVE-TODOLIST',
        payload: {
            todolistID,

        }
    } as const
}

type changeTodolistNameType = ReturnType<typeof changeTodolistNameAC>

export const changeTodolistNameAC = (todolistID: string, e: string) => {
    return {
        type: 'CHANGE-TODO-NAME',
        payload: {
            todolistID,
            e
        }
    } as const
}

export type addTodolistType = ReturnType<typeof addTodolistAC>

export const addTodolistAC = ( inputValue: string) => {

    return {
        type: 'ADD-TODOLIST',
        payload: {
            inputValue,
            todolistId:v1(),

        }
    } as const
}