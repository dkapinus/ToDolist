
import React, {useEffect, useState} from 'react'
import {todolistAPI} from "../api/todolist-api";
import {taskAPI} from "../api/task-api";

export default {
    title: 'API-TASK'
}

const title='bla'



export const GetTask = () => {

    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId="6c686534-6d4b-42d0-9ac6-f5789135e384"
    taskAPI.getTask(todolistId).then((res)=>{
            setState(res.data)
        })

    }, [])
    return <div>{JSON.stringify(state)}</div>
}
export const CreateTask = () => {
    const [state, setState] = useState<any>(null)



    useEffect(() => {
        const todolistId="6c686534-6d4b-42d0-9ac6-f5789135e384"
       taskAPI.createTask(todolistId,title).then((res)=>{
            setState(res.data)
        })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)


    useEffect(() => {
        const todolistId="6c686534-6d4b-42d0-9ac6-f5789135e384"
        const id ="8aa41569-3c82-43e3-ac64-5ac1b3138df4"

        taskAPI.deleteTask(todolistId,id).then((res)=>{
            setState(res.data)
        })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const UpdateTask = () => {
    const [state, setState] = useState<any>(null)


    useEffect(() => {
        const todolistId="6c686534-6d4b-42d0-9ac6-f5789135e384"
        const id ="5e9ef632-71a7-43f8-9753-6262dd4f47fa"
        taskAPI.updateTask(todolistId,id,'React').then((res) => {
            setState(res.data)
        })


    }, [])

    return <div>{JSON.stringify(state)}</div>
}

