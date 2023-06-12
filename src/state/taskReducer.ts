import {TaskKeyType} from "../AppWithReducer";
import {TaskType} from "../Todolist";
import {v1} from "uuid";
import {addTodolistType, removeTodolistType} from "./todoReducer";

export const taskReducer = (state: TaskKeyType, action: TsarType): TaskKeyType => {

    switch (action.type) {
        case 'REMOVE-TASK': {
            return {
                ...state,
                [action.payload.todolistID]: state[action.payload.todolistID].filter((el) => el.id !== action.payload.taskId)
            }
        }
        case 'CHANGE-STATUS-TASK': {
            return {
                ...state,
                [action.payload.todolistID]: state[action.payload.todolistID].map((el) => el.id === action.payload.taskId ? {
                    ...el,
                    isDone: action.payload.e
                } : el)
            }
        }
        case 'ADD-TASK': {
            let newTask: TaskType = {id: v1(), title: action.payload.inputValue, isDone: true}
            return {
                ...state, [action.payload.todolistID]: [newTask, ...state[action.payload.todolistID]]
            }
        }
        case 'CHANGE-INPUT-TASK': {

            return {
                ...state,
                [action.payload.todolistID]: state[action.payload.todolistID].map((el) => el.id === action.payload.id ? {
                    ...el,
                    title: action.payload.e
                } : el)
            }
        }
        case 'ADD-TODOLIST': {


            return {...state, [action.payload.todolistId]: []}
        }
        case 'REMOVE-TODOLIST': {
            // delete (state[action.payload.todolistID])

            return {...state,[action.payload.todolistID]:state[action.payload.todolistID].filter((el)=>el.id!==action.payload.todolistID)}
        }
        default:
            return state
    }
};

export type TsarType = removeTaskACType | changeStatusTaskACType | addTaskACType | changeInputTaskACType | addTodolistType|removeTodolistType


type removeTaskACType = ReturnType<typeof removeTaskAC>
export const removeTaskAC = (todolistID: string, taskId: string) => {
    return {
        type: 'REMOVE-TASK',
        payload: {
            todolistID,
            taskId
        }

    } as const
}

type changeStatusTaskACType = ReturnType<typeof changeStatusTaskAC>
export const changeStatusTaskAC = (todolistID: string, taskId: string, e: boolean) => {
    return {
        type: 'CHANGE-STATUS-TASK',
        payload: {
            todolistID,
            taskId,
            e
        }

    } as const
}

type addTaskACType = ReturnType<typeof addTaskAC>
export const addTaskAC = (todolistID: string, inputValue: string) => {
    return {
        type: 'ADD-TASK',
        payload: {
            todolistID,
            inputValue
        }

    } as const
}

type changeInputTaskACType = ReturnType<typeof changeInputTaskAC>
export const changeInputTaskAC = (todolistID: string, id: string, e: string) => {
    return {
        type: 'CHANGE-INPUT-TASK',
        payload: {
            todolistID,
            id,
            e
        }

    } as const
}









