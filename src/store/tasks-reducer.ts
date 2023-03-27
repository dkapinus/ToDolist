import {TaskTypeKey} from "../App";
import {v1} from "uuid";


export let todolistId1 = v1();
export let todolistId2 = v1();


const initialState: TaskTypeKey = {
    [todolistId1]: [
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "ReactJS", isDone: false},
        {id: v1(), title: "Angular", isDone: true},
        {id: v1(), title: "Vue", isDone: false},
    ],
    [todolistId2]: [
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "ReactJS", isDone: false},
        {id: v1(), title: "Angular", isDone: true},
        {id: v1(), title: "Vue", isDone: false},
    ]
}


export const tasksReducer = (state = initialState, action: TsarType) => {
    switch (action.type) {
        case 'REMOVE-TASK':
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].filter((el) => el.id !== action.payload.taskID)
            }

        case 'ADD-TASK':
            let newTitle = {id: v1(), title: action.payload.valueInput, isDone: true}
            return {
                ...state, [action.payload.todolistId]: [newTitle, ...state[action.payload.todolistId]]
            }
        case 'CHANGE-STATUS-CHECK-INPUT':

            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].map((el) => el.id === action.payload.taskId ? {
                    ...el,
                    isDone: action.payload.status
                } : el)
            }
        case 'CHANGE-INPUT-TITLE':

            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].map((el) => el.id === action.payload.taskId ? {
                    ...el,
                    title: action.payload.newTitle
                } : el)
            }
        case 'ADD-TODOLIST-TASK':

            return {
                ...state, [action.payload.todolistId3]: []

            }


        default :
            return state
    }
}


export type TsarType = removeTaskType | addTaskType | ChangeCheckedInputType | ChangeInputTitleType | ADDTodolistTaskType


type removeTaskType = ReturnType<typeof removeTaskAC>
export const removeTaskAC = (todolistId: string, taskID: string) => {
    return {
        type: 'REMOVE-TASK',
        payload: {
            todolistId: todolistId,
            taskID: taskID
        }
    } as const
}

type addTaskType = ReturnType<typeof addTaskTypeAC>
export const addTaskTypeAC = (todolistId: string, valueInput: string) => {
    return {
        type: 'ADD-TASK',
        payload: {
            todolistId: todolistId,
            valueInput: valueInput
        }
    } as const
}


type ChangeCheckedInputType = ReturnType<typeof ChangeCheckedInputTypeAC>
export const ChangeCheckedInputTypeAC = (todolistId: string, taskId: string, status: boolean) => {
    return {
        type: 'CHANGE-STATUS-CHECK-INPUT',
        payload: {
            todolistId: todolistId,
            taskId: taskId,
            status: status
        }
    } as const
}

type ChangeInputTitleType = ReturnType<typeof ChangeInputTitleAC>
export const ChangeInputTitleAC = (todolistId: string, taskId: string, newTitle: string) => {
    return {
        type: 'CHANGE-INPUT-TITLE',
        payload: {
            todolistId: todolistId,
            taskId: taskId,
            newTitle: newTitle
        }
    } as const
}

type  ADDTodolistTaskType = ReturnType<typeof ADDTodolistTaskAC>
export const ADDTodolistTaskAC = (todolistId3: string) => {
    return {
        type: 'ADD-TODOLIST-TASK',
        payload: {
            todolistId3: todolistId3,

        }
    } as const
}