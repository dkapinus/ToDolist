import {Dispatch} from "redux";
import {todolistAPI, TodolistType} from "../api/todolist-api";
import {RequestStatusType, setLoadingAC} from "./app-reducer";
import {handleServerNetworkError} from "../utils/error-utils";
import {FilterValueType} from "../Todolists";

const initialState: TodolistType[] = []

export const todoReducer = (state = initialState, action: TsarType): TodolistType[] => {
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

            return [...state, {
                id: action.payload.todolist.id,
                title: action.payload.todolist.title,
                filter: "all",
                addedDate: '',
                order: 1,
                entityStatus: 'idle'
            }]

        }
        case 'SET-TODOLIST' : {
            return action.payload.data.map((el) => ({...el, filter: 'all',entityStatus:'idle'}))
        }

        case 'SET-DISABLE' : {
            return state.map((el)=>el.id===action.payload.todolistID ? {...el,entityStatus:action.payload.entityStatus} : el)
        }

        default:
            return state
    }
}


export type TsarType = filterTasksTodoType
    | removeTodolistType
    | changeTodolistNameType
    | addTodolistType
    | setTodolistType
    | setDisableType


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
            todolistID

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

export const addTodolistAC = (todolist: TodolistType) => {

    return {
        type: 'ADD-TODOLIST',
        payload: {
            todolist: todolist,

        }
    } as const
}

export type setTodolistType = ReturnType<typeof setTodolistAC>

export const setTodolistAC = (data: TodolistType[]) => {

    return {
        type: 'SET-TODOLIST',
        payload: {
            data

        }
    } as const
}

export type setDisableType = ReturnType<typeof setDisableAC>

export const setDisableAC = (todolistID: string,entityStatus: RequestStatusType) => {

    return {
        type: 'SET-DISABLE',
        payload: {
            todolistID,
            entityStatus
        }
    } as const
}




export const ThunkGetStateTC = () => (dispatch: Dispatch) => {
    dispatch(setLoadingAC("loading"))
    todolistAPI.getTodolist().then((res) => {
            dispatch(setTodolistAC(res.data))
            dispatch(setLoadingAC("idle"))

        }
    )

}

export const ThunkDeleteTodoTC = (todolistID: string) => (dispatch: Dispatch) => {


    dispatch(setLoadingAC("loading"))
    dispatch(setDisableAC(todolistID,'loading'))

    todolistAPI.deleteTodolist(todolistID).then((res) => {
        dispatch(removeTodolistAC(todolistID))
        dispatch(setLoadingAC("idle"))

    })
        .catch((error)=>{
            dispatch(setDisableAC(todolistID,'idle'))
            handleServerNetworkError(error.message,dispatch)
        })
}

export const ThunkCreateTodoTC = (title: string) => (dispatch: Dispatch) => {

    dispatch(setLoadingAC("loading"))
    todolistAPI.createTodolist(title).then((res) => {
        dispatch(addTodolistAC(res.data.data.item))
        dispatch(setLoadingAC("succeeded"))
    })

}

export const ThunkUpdateTodoTC = (todolistID: string, title: string) => (dispatch: Dispatch) => {

    todolistAPI.updateTodolist(todolistID, title).then((res) => {
        dispatch(changeTodolistNameAC(todolistID, title))


    })
}


