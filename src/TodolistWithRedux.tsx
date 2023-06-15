import React from 'react';
import s from "./Todolist.module.css";
import {FilterValueType} from "./App";
import {SuperInput} from "./Components/SuperInput";
import {EditableSpan} from "./Components/EditableSpan";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import {TaskKeyType} from "./AppWithRedux";
import {addTaskAC, changeInputTaskAC, changeStatusTaskAC, removeTaskAC} from "./state/taskReducer";
import {changeTodolistNameAC, filterTasksTodoAC, removeTodolistAC} from "./state/todoReducer";

type TodolistType = {
    todolistID: string
    title: string
    filter: FilterValueType
}

const label = {inputProps: {'aria-label': 'Checkbox demo'}};

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}


export const TodolistWithRedux: React.FC<TodolistType> = ({
                                                              todolistID, title,
                                                              filter,
                                                              ...props
                                                          }) => {


    let task = useSelector<AppRootStateType, TaskType[]>(state => state.tasks[todolistID])

    const dispatch = useDispatch()

    const removeTask = (taskId: string) => {
        dispatch(removeTaskAC(todolistID, taskId))
    }

    const filteredTask = (nameFilterButton: FilterValueType) => {
        dispatch(filterTasksTodoAC(todolistID, nameFilterButton))
    }

    const addTaskCallback = (inputValue: string) => {
        dispatch(addTaskAC(todolistID, inputValue))
    }


    const deleteTodolist = () => {
        dispatch(removeTodolistAC(todolistID))
    }

    const changeInputTask = (id: string, e: string) => {
        dispatch(changeInputTaskAC(todolistID, id, e))
    }

    const changeTodolistName = (e: string) => {
        dispatch(changeTodolistNameAC(todolistID, e))
    }

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
                const onChangeStatus = (id: string, e: boolean) => {
                    dispatch(changeStatusTaskAC(todolistID, id, e))
                }

                return <li key={el.id}>
                    <Checkbox {...label}
                              checked={el.isDone}
                              onChange={(e) => onChangeStatus(el.id, e.currentTarget.checked)}
                              className={el.isDone === true ? s.isDone : ''}
                    />


                    <EditableSpan title={el.title} changeEditableSpan={(e) => changeInputTask(el.id, e)}/>

                    <button onClick={() => removeTask(el.id)}>X</button>

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

