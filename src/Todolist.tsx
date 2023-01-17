import React, {ChangeEvent,KeyboardEvent, useState} from 'react';
import {ButtonFilterType} from "./App";
import s from './Todolist.module.css'

type  TodolistType = {
    todolistID:string
    title:string
    FilterNameButton:(todolistID:string,nameButton:ButtonFilterType)=>void
    removeTask:(todolistID:string,id:string)=>void
    AddMessage:(todolistID:string,valueInput:string)=>void
    onChangeCheckInput:(todolistID:string,idCheck:string,event:boolean)=>void
    filter:ButtonFilterType
    task:TaskType[]
    deleteTodolist:(todolistID:string)=>void
}

type TaskType = {
       id:string,
       title:string,
       isDone:boolean
}

export const Todolist:React.FC<TodolistType> = ({
                                                    title,
                                                    FilterNameButton,
                                                    removeTask,
                                                    AddMessage,
                                                    onChangeCheckInput,
                                                    filter,
                                                    task,
                                                    deleteTodolist,
                                                    ...props
                                                }) => {
    const onClickHandler = (todolistID:string,nameButton:ButtonFilterType)=> {
        FilterNameButton(todolistID,nameButton)
    }

    const  onClickHandlerDeleteTask= (todolistID:string,id:string)=> {
        removeTask(todolistID,id)
    }

    let [valueInput,setValueInput]=useState('')

    const onChangeInputHandler = (event:ChangeEvent<HTMLInputElement>)=> {
     setValueInput(event.currentTarget.value)
    }

    let [error,setError]=useState<string|null>('')

    const onclickHandlerAddMessage = (todolistID:string)=> {
        if(valueInput.trim()!==''){AddMessage(todolistID,valueInput.trim())}
        else (setError('Title is reqiured'))

        setValueInput('')
       Error()
    }

    const Error = ()=> {
        if(valueInput.trim()!==''){setError('')}
    }

    const onKeyDownInput = (event:KeyboardEvent<HTMLInputElement>)=> {
        if(event.key==='Enter'){onclickHandlerAddMessage(props.todolistID)}
    }

    const onKeyPressInput = (event:KeyboardEvent<HTMLInputElement>)=> {
        if(event.key==='13'){onclickHandlerAddMessage(props.todolistID)}
    }

    const onChangeCheckInputHandler = (todolistID:string,idCheck:string,event:boolean)=> {
        onChangeCheckInput(todolistID,idCheck,event)
    }

    const DeleteTodolist = (todolistID:string)=> {
        deleteTodolist(todolistID)
    }
    return (
        <div>
            <h3>{title}
            <button onClick={()=>DeleteTodolist(props.todolistID)}>Delete Todolist</button></h3>
            <input  className={error ? s.errorInput :''} onChange={onChangeInputHandler} value={valueInput} onKeyDown={onKeyDownInput} onKeyPress={onKeyPressInput}/>
            <button onClick={()=>onclickHandlerAddMessage(props.todolistID)}>Add</button>
            {error &&<div className={s.errorMessage}>{error}</div>}
            <ul>{task.map((el)=>{
                return ( <li key={el.id} className={el.isDone===true ? s.active : ''}>
                    {el.title}
                    <input type={"checkbox"} checked={el.isDone} onChange={(event:ChangeEvent<HTMLInputElement>)=>onChangeCheckInputHandler(props.todolistID,el.id,event.currentTarget.checked)}  />
                    <button onClick={()=>onClickHandlerDeleteTask(props.todolistID,el.id)}>X</button>
                </li>)
            })}

            </ul>
               <button className={filter==='All' ? s.filter :''} onClick={()=>onClickHandler(props.todolistID,'All')}>All</button>
               <button className={filter==='Active' ? s.filter :''} onClick={()=>onClickHandler(props.todolistID,'Active')}>Active</button>
               <button className={filter==='Completed' ? s.filter :''} onClick={()=>onClickHandler(props.todolistID,'Completed')}>Completed</button>

        </div>
    );
};

