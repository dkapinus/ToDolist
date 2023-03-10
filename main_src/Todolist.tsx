import React from 'react';
import {FilterValueType} from "./App";
import s from './Todolist.module.css'
import {SuperInput} from "./Components/SuperInput";
import {EnableSpan} from "./Components/EnableSpan";

type TodolistType = {
    todolistId: string
    title: string
    task: TaskType[]
    filteredButton: (todolistId: string, nameButton: FilterValueType) => void
    removeTask: (todolistId: string, id: string) => void
    changeStatus: (todolistId: string, id: string, e: boolean) => void
    addMessage: (todolistId: string, value: string) => void
    filter: FilterValueType
    deleteTodolist: (todolistId: string) => void
    ChangeEnableSpan: (todolistId: string, id: string, e: string) => void
}

export type TaskType = {
    id: string;
    title: string;
    isDone: boolean
}


export const Todolist: React.FC<TodolistType> = ({
                                                     todolistId,
                                                     title, task,
                                                     filteredButton, removeTask,
                                                     changeStatus, addMessage,
                                                     filter, deleteTodolist,
                                                     ChangeEnableSpan,
                                                     ...props
                                                 }) => {

    const onClickHandlerButton = (nameButton: FilterValueType) => {
        filteredButton(todolistId, nameButton)
    }

    const RemoveTask = (id: string) => {
        removeTask(todolistId, id)
    }


    const ChangeStatus = (id: string, e: boolean) => {
        changeStatus(todolistId, id, e)
    }

    const AddMessage = (value: string) => {
        addMessage(todolistId, value)
    }

    const DeleteTodolist = () => {
        deleteTodolist(todolistId)
    }
    return (
        <div>
            <h3>{title}
                <button onClick={DeleteTodolist}>X</button>
            </h3>
            <SuperInput addMessage={AddMessage}/>

            <ul>
                {task.map((el) => {
                    const changeEnableSpan = (e: string) => {
                        ChangeEnableSpan(todolistId, el.id, e)
                    }
                    return (
                        <li className={el.isDone ? s.isDone : ''} key={el.id}>
                            <EnableSpan title={el.title} changeEnableSpan={changeEnableSpan}/>
                            <input type={"checkbox"} onChange={(e) => ChangeStatus(el.id, e.currentTarget.checked)}
                                   checked={el.isDone}/>
                            <button onClick={() => RemoveTask(el.id)}>X</button>
                        </li>

                    )
                })}
            </ul>
            <button className={filter === 'all' ? s.activeButton : ''}
                    onClick={() => onClickHandlerButton('all')}>All
            </button>
            <button className={filter === 'active' ? s.activeButton : ''}
                    onClick={() => onClickHandlerButton('active')}>Active
            </button>
            <button className={filter === 'completed' ? s.activeButton : ''}
                    onClick={() => onClickHandlerButton('completed')}>Completed
            </button>
        </div>
    );
};

