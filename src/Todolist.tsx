import React, {memo, useCallback} from 'react';
import {FilterValueType} from "./App";
import {SuperInput} from "./Components/SuperInput";
import {EditableSpan} from "./Components/EditableSpan";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import {Task} from "./Task";



type TodolistType = {
    todolistID: string
    title: string
    task: TaskType[]
    removeTask: (todolistID: string, taskId: string) => void
    filterTasks: (todolistID: string, nameFilterButton: FilterValueType) => void
    addTask: (todolistID: string, inputValue: string) => void
    changeStatus: (todolistID: string, taskId: string, e: boolean) => void
    filter: FilterValueType
    removeTodolist: (todolistID: string) => void
    callbackChangeInputTask: (todolistID: string, id: string, e: string) => void
    callbackChangeTodolistName: (todolistID: string, e: string) => void
}



export type TaskType = {
    id: string
    title: string
    isDone: boolean
}


export const Todolist: React.FC<TodolistType> =memo( ({
                                                     todolistID, title,
                                                     task, removeTask,
                                                     filterTasks, addTask,
                                                     changeStatus, filter,
                                                     removeTodolist, callbackChangeInputTask,
                                                     callbackChangeTodolistName,
                                                     ...props
                                                 }) => {

    console.log('Todolist')



    const filteredTask =useCallback( (nameFilterButton: FilterValueType) => {
        filterTasks(todolistID, nameFilterButton)
    },[filterTasks,todolistID])

    const addTaskCallback = useCallback((inputValue: string) => {
        addTask(todolistID, inputValue)
    },[addTask,todolistID])


    const deleteTodolist = useCallback(() => {
        removeTodolist(todolistID)
    },[removeTask,todolistID])

    const onClickHandlerRemoveTask =useCallback( (taskId: string) => {
        removeTask(todolistID, taskId)
    },[removeTask,todolistID])

    const changeInputTask =useCallback( (id: string, e: string) => {
        callbackChangeInputTask(todolistID, id, e)
    },[callbackChangeInputTask,todolistID])

    const onChangeStatus =useCallback( (id: string, e: boolean) => {
        changeStatus(todolistID, id, e)
    },[changeStatus,todolistID])

    const changeTodolistName =useCallback( (e: string) => {
        callbackChangeTodolistName(todolistID, e)
    },[callbackChangeTodolistName,todolistID])



    let filtered = task
    if (filter === 'active') {
        filtered = task.filter((el) => el.isDone === false)
    }
    if (filter === 'completed') {
        filtered = task.filter((el) => el.isDone === true)
    }

    return (
        <div>
            <h3><EditableSpan title={title} changeEditableSpan={changeTodolistName}/>
                <IconButton onClick={deleteTodolist} aria-label="delete">
                    <DeleteIcon/>
                </IconButton>
            </h3>

            <div>
                <SuperInput add={addTaskCallback}/>
            </div>

            <ul>{filtered.map((el) => {


                return <li key={el.id}>
               <Task
                   task={el}
                   removeTask={onClickHandlerRemoveTask}
                   changeStatus={onChangeStatus}
                   callbackChangeInputTask={changeInputTask}/>

                </li>
            })}


            </ul>


            <Button onClick={() => filteredTask('all')}
                    variant={filter === 'all' ? 'outlined' : "contained"}
                    color="secondary">All</Button>
            <Button onClick={() => filteredTask('active')}
                    variant={filter === 'active' ? 'outlined' : "contained"}
                    color="success">
                Active
            </Button>
            <Button onClick={() => filteredTask('completed')}
                    variant={filter === 'completed' ? 'outlined' : "contained"}
                    color="error">
                Completed
            </Button>

        </div>
    )
        ;
})

