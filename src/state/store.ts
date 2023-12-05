import {AnyAction, applyMiddleware, combineReducers, createStore} from 'redux'
import {taskReducer} from "./taskReducer";
import {todoReducer} from "./todoReducer";
import thunk, {ThunkDispatch} from "redux-thunk";
import {useDispatch} from "react-redux";
import {appReducer} from "./app-reducer";
import {authReducer} from "../Components/Login/auth-Reducer";

// объединяя reducer-ы с помощью combineReducers,
// мы задаём структуру нашего единственного объекта-состояния
const rootReducer = combineReducers({
    app:appReducer,
    tasks: taskReducer,
    todolists: todoReducer,
    authReducer:authReducer
})
// непосредственно создаём store
export const store = createStore(rootReducer,applyMiddleware(thunk))
// определить автоматически тип всего объекта состояния
export type AppRootStateType = ReturnType<typeof rootReducer>

export type AppDispatchType =ThunkDispatch<AppRootStateType, any, AnyAction>

export const useAppDispatch=()=>useDispatch<AppDispatchType>()

// а это, чтобы можно было в консоли браузера обращаться к store в любой момент
// @ts-ignore

window.store = store
