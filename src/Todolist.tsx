import React, {ChangeEvent,KeyboardEvent, useState} from 'react';
import {ButtonFilterType} from "./App";
import s from './Todolist.module.css'

type  TodolistType = {
    name:string
    FilterNameButton:(nameButton:ButtonFilterType)=>void
    removeTask:(id:string)=>void
    AddMessage:(valueInput:string)=>void
    onChangeCheckInput:(idCheck:string,event:boolean)=>void
    filter:ButtonFilterType
    task:TaskType[]
}

type TaskType = {
       id:string,
       title:string,
       isDone:boolean
}

export const Todolist:React.FC<TodolistType> = ({
                                                    name,
                                                    FilterNameButton,
                                                    removeTask,
                                                    AddMessage,
                                                    onChangeCheckInput,
                                                    filter,
                                                    task,
                                                    ...props
                                                }) => {
    const onClickHandler = (nameButton:ButtonFilterType)=> {
        FilterNameButton(nameButton)
    }

    const  onClickHandlerDeleteTask= (id:string)=> {
        removeTask(id)
    }

    let [valueInput,setValueInput]=useState('')

    const onChangeInputHandler = (event:ChangeEvent<HTMLInputElement>)=> {
     setValueInput(event.currentTarget.value)
    }

    let [error,setError]=useState<string|null>('')

    const onclickHandlerAddMessage = ()=> {
        if(valueInput.trim()!==''){AddMessage(valueInput.trim())}
        else (setError('Title is reqiured'))

        setValueInput('')
       Error()
    }

    const Error = ()=> {
        if(valueInput.trim()!==''){setError('')}
    }

    const onKeyDownInput = (event:KeyboardEvent<HTMLInputElement>)=> {
        if(event.key==='Enter'){onclickHandlerAddMessage()}
    }

    const onKeyPressInput = (event:KeyboardEvent<HTMLInputElement>)=> {
        if(event.key==='13'){onclickHandlerAddMessage()}
    }

    const onChangeCheckInputHandler = (idCheck:string,event:boolean)=> {
        onChangeCheckInput(idCheck,event)
    }
    return (
        <div>
            <h3>{name}</h3>
            <input  className={error ? s.errorInput :''} onChange={onChangeInputHandler} value={valueInput} onKeyDown={onKeyDownInput} onKeyPress={onKeyPressInput}/>
            <button onClick={onclickHandlerAddMessage}>Add</button>
            {error &&<div className={s.errorMessage}>{error}</div>}
            <ul>{task.map((el)=>{
                return ( <li key={el.id} className={el.isDone===true ? s.active : ''}>
                    {el.title}
                    <input type={"checkbox"} checked={el.isDone} onChange={(event:ChangeEvent<HTMLInputElement>)=>onChangeCheckInputHandler(el.id,event.currentTarget.checked)}  />
                    <button onClick={()=>onClickHandlerDeleteTask(el.id)}>X</button>
                </li>)
            })}

            </ul>
               <button className={filter==='All' ? s.filter :''} onClick={()=>onClickHandler('All')}>All</button>
               <button className={filter==='Active' ? s.filter :''} onClick={()=>onClickHandler('Active')}>Active</button>
               <button className={filter==='Completed' ? s.filter :''} onClick={()=>onClickHandler('Completed')}>Completed</button>

        </div>
    );
};

