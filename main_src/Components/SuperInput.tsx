import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import s from "../Todolist.module.css";

type SuperInputType ={
    addMessage:(value:string)=>void
}

export  const SuperInput:React.FC<SuperInputType> = ({addMessage,...props}) => {

    const [value,SetValue]=useState('')

    const onChangeInput = (e:ChangeEvent<HTMLInputElement>)=> {
        SetValue(e.currentTarget.value)
    }
    const [Error,SetError]=useState<string|null>('')

    const AddMessage = ()=> {
        if(value.trim()!==''){addMessage(value.trim())}
        else (SetError('Title is requit'))

        SetValue('')
    }

    const onKeyDown = (e:KeyboardEvent<HTMLInputElement>)=> {
        if(e.key==='Enter'){AddMessage()}
        else ( SetError(''))

    }
    return (
        <>
            <input className={Error ? s.error_message:''} onChange={onChangeInput} onKeyDown={onKeyDown} value={value}/>
            <button onClick={AddMessage}>Add</button>
            {Error &&<div className={Error ? s.error : ''}>{Error}</div>}
        </>
    );
};

