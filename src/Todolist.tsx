import React, {ChangeEvent,KeyboardEvent, useState} from 'react';
import {ButtonType} from "./App";
import {Button} from "./Button";
import s from './Todolist.module.css';


type TodolistType = {
    task:Array<TaskType>;
    name:string;
    removeTask:(id:string)=>void;
    ChangeFilter:(nameButton:ButtonType)=>void;
    addMessage:(inputValue:string)=>void
    InputCheck:(event:boolean,id:string)=>void
    Filter:ButtonType;
}

type TaskType = {
    id:string;
    title:string;
    isDone:boolean;
}

export const Todolist = (props:TodolistType) => {




    let [inputValue,setInputValue]=useState('')
    let [error,setError]=useState<string|null>(null)


    const AddMessage = ()=> {
        if(inputValue.trim()!=='')
        {props.addMessage(inputValue.trim())}
        else {setError('Title reqired')}

        setInputValue('')
    }

    const ChangeInput = (event:ChangeEvent<HTMLInputElement>)=> {
        setInputValue(event.currentTarget.value)
        setError(null)
    }
    const KeyDown =(event:KeyboardEvent<HTMLInputElement>)=> {

        if(event.key==='Enter'){
            AddMessage()
        }
    }




    const InputCheck =(event:boolean,id:string,)=> {

        props.InputCheck(event,id)

    }


    return (
        <div>
            <h3>{props.name}</h3>
            <input className={error ? s.error:''} onChange={ChangeInput} value={inputValue} onKeyDown={KeyDown}/>
            <Button nameButton={'Add'} started={AddMessage}/>
            <span>
               {error && <div className={s.errorMessage}>{error}</div>}
           </span>
          <div>
              {props.task.map((el)=>{

                  return (
                      <div  key={el.id}>
                          <li  className={el.isDone ? s.isDone:''}>
                              <input type={'checkbox'} onChange={(event)=>InputCheck(event.currentTarget.checked,el.id,)} checked={el.isDone}/>
                              <span>{el.title}</span>

                              <Button nameButton={'x'} started={()=>props.removeTask(el.id)}/>
                          </li>

                      </div>
                  )
              })}
               <Button active={props.Filter==='All'} nameButton={'All'} started={()=>props.ChangeFilter('All')}/>
              <Button active={props.Filter==='Active'} nameButton={'Active'} started={()=>props.ChangeFilter('Active')}/>
              <Button active={props.Filter==='Completed'} nameButton={'Completed'} started={()=>props.ChangeFilter('Completed')}/>

          </div>
        </div>
    );
};

