import React, {ChangeEvent, useState} from 'react';

type EnableSpanType = {
    title:string
    changeEnableSpan:(e:string)=>void
}


export const EnableSpan:React.FC <EnableSpanType>= ({title,changeEnableSpan,...props}) => {


    const [editMode,SetEditMode]=useState(false)

    const Change =()=> {
      SetEditMode(!editMode)
    }

   const  onEnableSpan =(e:ChangeEvent<HTMLInputElement>)=> {
        changeEnableSpan(e.currentTarget.value)
   }

    return (
        <>{editMode
            ? <input value={title} onBlur={Change} onChange={onEnableSpan} autoFocus/>
            :<span onDoubleClick={Change}>{title}</span>}

        </>
    );
};

