import React, {ChangeEvent, useState,KeyboardEvent} from 'react';
import {v1} from "uuid";
import {Button} from "./Button";


type ToDolistType = {
    title:string
    task:Array<TaskType>
    deleteButton:(id:string)=>void
    addNameButton:(nameButton:string)=>void
    addMessage:(valueInput:string)=>void
}

type TaskType = {
    id:string;
    title:string;
    isDone:boolean
}


export  const ToDolist = (props:ToDolistType) => {


    const MapTasks =props.task.map((el)=>{
        return (
            <li key={el.id}>
                {el.title}
                <input type={"checkbox"} checked={el.isDone}/>
                {/*<button onClick={()=>onClickHandlerDelete(el.id)}>x</button>*/}
                <Button nameButton={'X'} callback={()=>onClickHandlerDelete(el.id)}/>

            </li>

        )

    })

const onClickHandlerDelete = (id:string)=> {
    props.deleteButton(id)
}

    const onClickHandlerButton = (nameButton:string)=> {
    props.addNameButton(nameButton)

    }

    let [valueInput,setValueInput]=useState('')

    const onChangeHandlerInput =(event:ChangeEvent<HTMLInputElement>)=> {
    setValueInput(event.currentTarget.value)
    }

    const onKeyDownHandlerInput =(event:KeyboardEvent<HTMLInputElement>)=> {
        if (event.key==='Enter'){onClickHandlerButtonAddMessage()}
    }

    const onClickHandlerButtonAddMessage = ()=> {
    props.addMessage(valueInput)
        setValueInput('')
    }
    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input value={valueInput} onChange={onChangeHandlerInput} onKeyDown={onKeyDownHandlerInput}/>
                <Button nameButton={'Add'} callback={onClickHandlerButtonAddMessage}/>
                {/*<button onClick={onClickHandlerButtonAddMessage}>Add</button>*/}

            </div>

            <div>
                {MapTasks}

            </div>


            <Button nameButton={'All'} callback={()=>onClickHandlerButton('All')}/>
            <Button nameButton={'Active'} callback={()=>onClickHandlerButton('Active')}/>
            <Button nameButton={'Completed'} callback={()=>onClickHandlerButton('Completed')}/>


            {/*<button onClick={()=>onClickHandlerButton('All')}>All</button>*/}
            {/*<button onClick={()=>onClickHandlerButton('Active')}>Active</button>*/}
            {/*<button onClick={()=>onClickHandlerButton('Completed')}>Completed</button>*/}
        </div>
    );
};



