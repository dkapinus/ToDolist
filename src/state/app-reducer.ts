


export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

const initialState = {
    status: 'loading' as RequestStatusType,
    error:   null as string | null,

}

type InitialStateType = typeof initialState

export const appReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.payload.status}
        case 'APP/SET-ERROR':
            return {...state, error: action.payload.error}

        default:
            return state
    }
}

type ActionsType = setLoadingType|setErrorType

export type setLoadingType = ReturnType<typeof setLoadingAC>

export const setLoadingAC = ( status:RequestStatusType) => {

    return {
        type: 'APP/SET-STATUS',
        payload: {
            status

        }
    } as const
}

export type setErrorType = ReturnType<typeof setErrorAC>

export const setErrorAC = ( error:string|null) => {

    return {
        type: 'APP/SET-ERROR',
        payload: {
            error

        }
    } as const
}

