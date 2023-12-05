import {setErrorAC, setErrorType, setLoadingAC, setLoadingType} from "../state/app-reducer";
import {Dispatch} from "redux";
import {ResponseType} from "../api/task-api";


// generic function
export const handleServerAppError = <T>(data: ResponseType<T>, dispatch: ErrorUtilsDispatchType) => {
    if (data.messages.length) {
        dispatch(setErrorAC(data.messages[0] || data.messages[1]))
    } else {
        dispatch(setErrorAC('Some error occurred'))
    }
    dispatch(setLoadingAC('failed'))
}


export const handleServerNetworkError = (error: string, dispatch: ErrorUtilsDispatchType) => {
    dispatch(setErrorAC(error))
    dispatch(setLoadingAC('failed'))
}

type ErrorUtilsDispatchType = Dispatch<setErrorType | setLoadingType>