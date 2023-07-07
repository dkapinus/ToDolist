
import React, {useEffect, useState} from 'react'
import axios from "axios";
import {todolistAPI} from "../api/todolist-api";

export default {
    title: 'API-TODOLIST'
}

const title='bla'



export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
    todolistAPI.getTodolist().then((res)=>{
            setState(res.data)
        })

    }, [])
    return <div>{JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)



    useEffect(() => {
       todolistAPI.createTodolist(title).then((res)=>{
            setState(res.data)
        })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)


    useEffect(() => {

        const id ="0df72b2e-ddc9-4081-9f8a-97b95f689478"

        todolistAPI.deleteTodolist(id).then((res)=>{
            setState(res.data)
        })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)


    useEffect(() => {
        const id ="e96a4aa3-9a50-42ac-bc5a-538ab83127a8"
        todolistAPI.updateTodolist(id,'React').then((res) => {
            setState(res.data)
        })


    }, [])

    return <div>{JSON.stringify(state)}</div>
}

