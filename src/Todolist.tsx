import React from 'react';
import {FilterValueType} from "./App";
import {SuperInput} from "./Components/SuperInput";
import {EnableSpan} from "./Components/EnableSpan";

type TodolistType = {
    todolistId: string
    title: string
    task: TaskType[]
    filtered: (todolistId:string,nameButton: FilterValueType) => void
    removeTask: (todolistId:string,id: string) => void
    changeStatus: (todolistId:string,id: string, e: boolean) => void
    addMessage: (todolistId:string,value: string) => void
    filter: FilterValueType
    deleteTodolist:(todolistId:string)=>void
    changeEnableSpan:(todolistId:string,id: string,e:string)=>void
    enableTodolistName:(todolistId:string,e:string)=>void
}

export type TaskType = {
    id: string,
    title: string;
    isDone: boolean
}


export const Todolist: React.FC<TodolistType> = ({
                                                     todolistId,
                                                     title, task,
                                                     filtered, removeTask,
                                                     changeStatus, addMessage,
                                                     filter,deleteTodolist,
                                                     changeEnableSpan,enableTodolistName,
                                                     ...props
                                                 }) => {


    const onClickHandler = (todolistId:string,nameButton: FilterValueType) => {
        filtered(todolistId,nameButton)
    }

    const onClickDeleteTask = (id: string) => {
        removeTask(todolistId,id)
    }

    const onchangeStatus = (id: string, e: boolean) => {
        changeStatus(todolistId,id, e)
    }


    const AddMessage = (value: string) => {
            addMessage(todolistId,value)
    }



    const DeleteTodolist = ()=> {
        deleteTodolist(todolistId)
    }

    const EnableTodolistName = (e:string)=> {
        enableTodolistName(todolistId,e)
    }

    return (<div>
        <h3><EnableSpan title={title} changeEnableSpan={EnableTodolistName}/>
            <button onClick={DeleteTodolist}>Delete</button>
        </h3>

          <SuperInput addMessage={AddMessage}/>
        <ul>
            {task.map((el) => {
                const ChangeEnableSpan =(e:string)=> {
                    changeEnableSpan(todolistId,el.id,e)
                }
                return (
                    <li className={el.isDone ? 'is-done' :''}>
                        <EnableSpan title={el.title} changeEnableSpan={ChangeEnableSpan}/>
                        <input type={'checkbox'} checked={el.isDone}
                               onChange={(e) => onchangeStatus(el.id, e.currentTarget.checked)}/>
                        <button onClick={() => onClickDeleteTask(el.id)}>X</button>
                    </li>
                )
            })}
        </ul>
        <button className={filter === 'All' ? 'active-filter' : ''} onClick={() => onClickHandler(todolistId,'All')}>All</button>
        <button className={filter === 'Active' ? 'active-filter' : ''} onClick={() => onClickHandler(todolistId,'Active')}>Active
        </button>
        <button className={filter === 'Completed' ? 'active-filter' : ''}
                onClick={() => onClickHandler(todolistId,'Completed')}>Completed
        </button>
    </div>);
};

