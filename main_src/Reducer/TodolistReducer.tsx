import {FilterValueType, TodolistType} from "../App";
import {v1} from 'uuid'


export const TodolistReducer = (state: TodolistType[], action: TsarType) => {
    switch (action.type) {
        case 'REMOVE-TODOLIST' : {
            return state.filter((el) => el.id !== action.payload.todolistId)
        }
        case 'FILTERED-TASK' : {
            return state.map((el) => el.id === action.payload.todolistId ? {...el, filter: action.payload.filter} : el)
        }
        case 'ADD-TODOLIST' : {

            let newTodo:TodolistType=  {id: action.payload.todolistId3, title: action.payload.value, filter: "all"}
            return [...state,newTodo]

        }
        default:
            return state
    }

}



type TsarType = DeleteTodolistType | FilteredButtonType|AddTodolistType


type DeleteTodolistType = ReturnType<typeof deleteTodolistTypeAC>

export const deleteTodolistTypeAC = (todolistId: string) => {
    return {
        type: 'REMOVE-TODOLIST',
        payload: {
            todolistId: todolistId,
        }
    } as const // TODO required!!!!!!!!!
}


type FilteredButtonType = ReturnType<typeof filteredButtonAC>
export const filteredButtonAC = (todolistId: string, filter: FilterValueType) => {
    return {
        type: 'FILTERED-TASK',
        payload: {
            todolistId: todolistId,
            filter: filter
        }
    } as const
}




type AddTodolistType = ReturnType<typeof AddTodolistAC>
export const AddTodolistAC = (value:string,todolistId3 :string) => {
    return {
        type: 'ADD-TODOLIST',
        payload: {
            value,
         todolistId3
        }
    } as const
}



