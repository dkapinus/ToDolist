import React from 'react';
import s from "./Todolist.module.css";
import {FilterValueType} from "./App";
import {SuperInput} from "./Components/SuperInput";
import {EditableSpan} from "./Components/EditableSpan";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';

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

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}


export const Todolist: React.FC<TodolistType> = ({
                                                     todolistID, title,
                                                     task, removeTask,
                                                     filterTasks, addTask,
                                                     changeStatus, filter,
                                                     removeTodolist, callbackChangeInputTask,
                                                     callbackChangeTodolistName,
                                                     ...props
                                                 }) => {

    const onClickHandlerFilter = (taskId: string) => {
        removeTask(todolistID, taskId)
    }

    const filteredTask = (nameFilterButton: FilterValueType) => {
        filterTasks(todolistID, nameFilterButton)
    }

    const addTaskCallback = (inputValue: string) => {
        addTask(todolistID, inputValue)
    }


    const deleteTodolist = () => {
        removeTodolist(todolistID)
    }

    const changeInputTask = (id: string, e: string) => {
        callbackChangeInputTask(todolistID, id, e)
    }

    const changeTodolistName = (e: string) => {
        callbackChangeTodolistName(todolistID, e)
    }


    return (
        <div>
            <h3><EditableSpan title={title} changeEditableSpan={changeTodolistName}/>
                <IconButton onClick={deleteTodolist} aria-label="delete">
                    <DeleteIcon/>
                </IconButton>
            </h3>

            <div>
                <SuperInput addTask={addTaskCallback}/>
            </div>

            <ul>{task.map((el) => {
                const onChangeStatus = (id: string, e: boolean) => {
                    changeStatus(todolistID, id, e)
                }

                return <li key={el.id}>
                    <Checkbox {...label}
                              checked={el.isDone}
                              onChange={(e) => onChangeStatus(el.id, e.currentTarget.checked)}
                              className={el.isDone === true ? s.isDone : ''}
                    />


                    <EditableSpan title={el.title} changeEditableSpan={(e) => changeInputTask(el.id, e)}/>

                    <button onClick={() => onClickHandlerFilter(el.id)}>X</button>

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
};

