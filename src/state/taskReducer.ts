import {TaskKeyType} from "../AppWithRedux";
import {addTodolistType, removeTodolistType, setDisableAC, setTodolistType} from "./todoReducer";
import {Dispatch} from "redux";
import {taskAPI, TaskPriorities, TaskStatuses, TaskType, UpdateTaskModelType} from "../api/task-api";
import {AppRootStateType} from "./store"
import {RequestStatusType, setLoadingAC} from "./app-reducer";
import {handleServerAppError, handleServerNetworkError} from "../utils/error-utils";


const initialState: TaskKeyType = {}

export const taskReducer = (state = initialState, action: TsarType): TaskKeyType => {

    switch (action.type) {
        case 'SET-TODOLIST': {
            const StateCopy = {...state}
            action.payload.data.forEach((el) => {
                StateCopy[el.id] = []
            })
            return StateCopy
        }
        case 'SET-TASK' : {
            return {...state, [action.payload.todolistId]: action.payload.tasks}
        }
        case 'REMOVE-TASK': {
            return {
                ...state,
                [action.payload.todolistID]: state[action.payload.todolistID].filter((el) => el.id !== action.payload.taskId)
            }
        }

        case 'ADD-TASK': {

            return {
                ...state,
                [action.payload.task.todoListId]: 
                    [{id:action.payload.task.id,
                        title:action.payload.task.title,
                        status:TaskStatuses.New,
                        priority:TaskPriorities.Hi,
                        startDate:'',
                        description:'',
                        deadline:'',
                        todoListId:action.payload.task.todoListId,
                        order:1,
                        addedDate:'',
                        taskDisable:'idle'
                        
                    }, ...state[action.payload.task.todoListId]]
            }
        }

           


        case 'CHANGE-UPDATE-TASK': {

            return {
                ...state,
                [action.payload.todolistID]: state[action.payload.todolistID].map((el) => el.id === action.payload.id ? {
                    ...el,
                    ...action.payload.model
                } : el)
            }
        }
        case 'ADD-TODOLIST': {


            return {...state, [action.payload.todolist.id]: []}
        }
        case 'REMOVE-TODOLIST': {


            return {
                ...state,
                [action.payload.todolistID]: state[action.payload.todolistID].filter((el) => el.id !== action.payload.todolistID)
            }
        }
        case 'SET-DISABLE-TASK': {


            return {
                ...state,
             [action.payload.todolistID]:state[action.payload.todolistID].map((el)=>el.id===action.payload.taskId ? {...el,taskDisable:action.payload.taskDisable} :el)
            }
        }
        default:
            return state
    }
};

export type TsarType =
    removeTaskACType
    | addTaskACType | changeInputTaskACType
    | addTodolistType | removeTodolistType
    | setTodolistType | setTaskType
    |setDisableTaskType


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


type addTaskACType = ReturnType<typeof addTaskAC>
export const addTaskAC = (items: TaskType) => {
    return {
        type: 'ADD-TASK',
        payload: {
            task: items
        }

    } as const
}

type changeInputTaskACType = ReturnType<typeof changeUpdateTaskAC>
export const changeUpdateTaskAC = (todolistID: string, id: string, model: UpdateTaskModelType) => {
    return {
        type: 'CHANGE-UPDATE-TASK',
        payload: {
            todolistID,
            id,
            model
        }

    } as const
}

type setTaskType = ReturnType<typeof setTaskAC>
export const setTaskAC = (tasks: TaskType[], todolistId: string) => {
    return {
        type: 'SET-TASK',
        payload: {
            tasks,
            todolistId


        }

    } as const
}


export type setDisableTaskType = ReturnType<typeof setDisableTaskAC>

export const setDisableTaskAC = (todolistID: string,taskId: string,taskDisable: RequestStatusType) => {

    return {
        type: 'SET-DISABLE-TASK',
        payload: {
            todolistID,
            taskId,
            taskDisable
        }
    } as const
}


export const ThunkTaskGetTC = (todolistId: string) => (dispatch: Dispatch) => {
    dispatch(setLoadingAC("loading"))
    taskAPI.getTasks(todolistId).then((res) => {
        dispatch(setTaskAC(res.data.items, todolistId))
        dispatch(setLoadingAC("succeeded"))
    })
}

export const ThunkDeleteTaskTC = (todolistId: string, taskId: string) => (dispatch: Dispatch) => {


    dispatch(setLoadingAC("loading"))
    dispatch(setDisableTaskAC(todolistId,taskId,"loading"))
    taskAPI.deleteTask(todolistId, taskId).then((res) => {


        dispatch(removeTaskAC(todolistId, taskId))
        dispatch(setLoadingAC("succeeded"))

    })

        .catch((error)=>{
            dispatch(setDisableTaskAC(todolistId,taskId,'idle'))
            handleServerNetworkError(error.message,dispatch)
        })
}

enum Result_Code {
    OK = 0,
    ERROR = 1,
    CAPTCHA_ERROR = 10

}

export const ThunkCreateTaskTC = (todolistId: string, title: string) => (dispatch: Dispatch) => {
    dispatch(setLoadingAC("loading"))
    taskAPI.createTask(todolistId, title).then((res) => {

        if (res.data.resultCode === Result_Code.OK) {
            const task = res.data.data.item
            dispatch(addTaskAC(task))
            dispatch(setLoadingAC('succeeded'))
        } else {

            handleServerAppError(res.data, dispatch)
        }
    })

}


export type UpdateTaskType = {
    title?: string,
    description?: string,
    status?: TaskStatuses,
    priority?: TaskPriorities,
    startDate?: string,
    deadline?: string
    taskDisable?:RequestStatusType
}

export const ThunkTaskUpdateTC = (todolistId: string, taskId: string, modelTask: UpdateTaskType) => (dispatch: Dispatch, getState: () => AppRootStateType) => {


    const task = getState().tasks[todolistId].find((t) => t.id === taskId)
    if (!task) {
        return
    }

    const model: UpdateTaskModelType = {

        status: task.status,
        startDate: task.startDate,
        description: task.description,
        priority: TaskPriorities.Hi,
        title: task.title,
        deadline: task.deadline,
        taskDisable:task.taskDisable,
        ...modelTask

    }

    taskAPI.updateTask(todolistId, taskId, model).then((res) => (
        dispatch(changeUpdateTaskAC(todolistId, taskId, model))))
        .catch((error) => {
            handleServerNetworkError(error.message, dispatch)
        })
}



