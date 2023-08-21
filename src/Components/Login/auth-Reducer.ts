import {Dispatch} from 'redux'
import {
    setErrorType,
    setInitializedAC,
    setInitializedType,
    setLoadingAC,
    setLoadingType
} from "../../state/app-reducer";
import {LoginType} from "./Login";
import {authAPI, AuthType} from "../../api/auth-api";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";
import {Result_Code} from "../../state/taskReducer";


const initialState = {
    isLoggedIn: false,
    user: ''
}
type InitialStateType = typeof initialState

export const authReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'login/SET-IS-LOGGED-IN':
            return {...state, isLoggedIn: action.value}
        case 'SET-USER':
            return {...state, user: action.data}
        default:
            return state
    }
}
// actions
export const setIsLoggedInAC = (value: boolean) =>
    ({type: 'login/SET-IS-LOGGED-IN', value} as const)

export const setUserAC = (data: string) =>
    ({type: 'SET-USER', data} as const)

// thunks
export const loginTC = (data: LoginType) => async (dispatch: Dispatch<ActionsType>) => {

    try {
        dispatch(setLoadingAC('loading'))
        const res = await authAPI.login(data)


        if (res.data.resultCode === Result_Code.OK) {
            dispatch(setIsLoggedInAC(true))
            dispatch(setLoadingAC('succeeded'))

        } else {
            handleServerAppError(res.data, dispatch)
        }

    } catch (error) {
        handleServerNetworkError(error as string, dispatch)
    }
}

export const SetLoginStatusTC = () => async (dispatch: Dispatch<ActionsType>) => {
  console.log(4)
    try {
        dispatch(setLoadingAC('loading'))
        const res = await authAPI.getAuth()
      
        if (res.data.resultCode === Result_Code.OK) {
            console.log(6)
            dispatch(setIsLoggedInAC(true))
            // console.log(res.data.data.item.login)
            console.log(7)
             dispatch(setUserAC(res.data.data.login))
            dispatch(setLoadingAC('succeeded'))

        } else {
            handleServerAppError(res.data, dispatch)
        }

    } catch (error) {
        handleServerNetworkError(error as string, dispatch)
    } finally {
        dispatch(setInitializedAC(true))

    }
}


export const ThunkLogout = () => async (dispatch: Dispatch) => {

    try {
        dispatch(setLoadingAC('loading'))
        const res = await authAPI.getAuth()
        if (res.data.resultCode === Result_Code.OK) {
            dispatch(setIsLoggedInAC(false))
            dispatch(setLoadingAC('succeeded'))

        } else {
            handleServerAppError(res.data, dispatch)
        }

    } catch (error) {
        handleServerNetworkError(error as string, dispatch)
    }
}


// types


type setUserType = ReturnType<typeof setUserAC>

type ActionsType = ReturnType<typeof setIsLoggedInAC> | setLoadingType | setErrorType | setUserType | setInitializedType

