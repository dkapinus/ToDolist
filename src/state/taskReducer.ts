import {TaskKeyType} from "../AppWithRedux";
import {addTodolistType, removeTodolistType, setTodolistType} from "./todoReducer";
import {Dispatch} from "redux";
import {taskAPI, TaskPriorities, TaskStatuses, TaskType, UpdateTaskModelType} from "../api/task-api";
import {AppRootStateType} from "./store"


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
                [action.payload.task.todoListId]: [action.payload.task, ...state[action.payload.task.todoListId]]
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
        default:
            return state
    }
};

export type TsarType =
    removeTaskACType
    | addTaskACType | changeInputTaskACType
    | addTodolistType | removeTodolistType
    | setTodolistType | setTaskType


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
export const changeUpdateTaskAC = (todolistID: string, id: string,model:UpdateTaskModelType ) => {
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


export const ThunkTaskGetTC = (todolistId: string) => (dispatch: Dispatch) => {
    taskAPI.getTasks(todolistId).then((res) => (dispatch(setTaskAC(res.data.items, todolistId))))
}

export const ThunkDeleteTaskTC = (todolistId: string, taskId: string) => (dispatch: Dispatch) => {
    taskAPI.deleteTask(todolistId, taskId).then((res) => (dispatch(removeTaskAC(todolistId, taskId))))
}

export const ThunkCreateTaskTC = (todolistId: string, title: string) => (dispatch: Dispatch) => {
    taskAPI.createTask(todolistId, title).then((res) => (dispatch(addTaskAC(res.data.data.item))))
}


export type UpdateTaskType = {
    title?: string,
    description?: string,
    status?: TaskStatuses,
    priority?: TaskPriorities,
    startDate?: string,
    deadline?: string
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
            ...modelTask

    }

    taskAPI.updateTask(todolistId, taskId, model).then((res) => (
        dispatch(changeUpdateTaskAC(todolistId, taskId, model))))

}



