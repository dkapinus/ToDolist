import axios, {AxiosResponse} from 'axios'
import {LoginType} from "../Components/Login/Login";

import {ResponseType} from "./task-api";


const instance = axios.create(
    {
        baseURL: `https://social-network.samuraijs.com/api/1.1/`,
        withCredentials: true,
        headers: {
            'API-KEY': '489b0bd9-4b11-4a5f-aa40-b75fd80ef8d4'
        }
    }
)


export const authAPI = {

    getAuth() {


        return instance.get<ResponseType<AuthType>>(`/auth/me`)

    },
    login(values: LoginType) {
        const promise= instance.post<ResponseType<{ item: number }>, AxiosResponse<ResponseType<{ item: number }>>, LoginType>
        (`/auth/login`, values)
        return promise
    },
    logout() {
        const promise = instance.delete<ResponseType>(`/auth/login`)
        return promise
    }

}


export type AuthType = {
    id: number
    email: string
    login: string

}

