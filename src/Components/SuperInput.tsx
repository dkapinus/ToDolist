import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import s from "../Todolist.module.css";

type SuperInputTypes = {
    AddMessage:(value:string)=>void
}


export  const SuperInput:React.FC<SuperInputTypes> = ({ AddMessage,...props}) => {

    const [value,SetValue]=useState('')

    const onChangeInput = (e:ChangeEvent<HTMLInputElement>)=> {
        SetValue(e.currentTarget.value)
        SetError('')
    }

    const [error,SetError]=useState('')

    const onClickHandlerAddMessage = ()=> {
        if(value.trim()!==''){AddMessage(value.trim()) }
        else (SetError('Title is requiet'))
        SetValue('')



    }


    const onKeyDown = (event:KeyboardEvent<HTMLInputElement>)=> {
        if(event.key==='Enter'){onClickHandlerAddMessage()}

    }
    return (
        <div>
            <input className={error ? s.error_message : ''} onChange={onChangeInput} value={value} onKeyDown={onKeyDown}/>
            <button onClick={()=>onClickHandlerAddMessage()}>Add</button>
            {error && <div  className={s.error}>{error}</div>}
        </div>
    );
};

