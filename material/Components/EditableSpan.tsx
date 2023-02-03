import React, {ChangeEvent, KeyboardEvent,useState} from 'react';


type EditableSpanType = {
    title:string
    ChangeTask:(value:string)=>void
}


export const EditableSpan = (props:EditableSpanType) => {

    const [edit,setEdit]=useState(false)
    const [newTitle,setNewTitle]=useState(props.title)

    const onClickSpan = () => {
        setEdit(!edit)
    }

    const ChangeTask = (e:ChangeEvent<HTMLInputElement>)=> {
        setNewTitle(e.currentTarget.value)
        props.ChangeTask(newTitle)
    }


    return (

        edit ?
            <input autoFocus onChange={ChangeTask} onBlur={onClickSpan} value={newTitle} />
            :
            <span onDoubleClick={onClickSpan}>{props.title}</span>

    );
};

