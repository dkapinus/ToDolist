import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import s from "../Todolist.module.css";


type InputType = {
    addMessage:(valueInput:string)=>void

}

export  const Input:React.FC<InputType> = ({addMessage}) => {

    let [valueInput,setValueInput]=useState('')


    const onChangeValueInput = (e:ChangeEvent<HTMLInputElement>)=>{
        setValueInput(e.currentTarget.value)
    }


    const onKeyDown = (e:KeyboardEvent<HTMLInputElement>)=> {
        if(e.key==='Enter'){AddMessage ()}


    }



    let [error,SetError]=useState<string|null>('')


    const AddMessage = ()=> {
        if(valueInput.trim()!==''){  addMessage(valueInput.trim())}
        else {SetError('Title is reqiuaet')}
        setValueInput('')
    }

    return (
        <div>
            <input onKeyDown={onKeyDown} className={error? s.errorMessage :''} value={valueInput} onChange={onChangeValueInput}/>
            <button  onClick={AddMessage}>Add</button>
            {error && <div className={error? s.error :''}>{error}</div>}
        </div>
    );
};

