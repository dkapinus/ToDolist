import React, { useState} from 'react';


type EnableSpanType = {
    title:string
    titleSpan:(e:string)=>void
}


export const EnableSpan:React.FC<EnableSpanType> = ({title,titleSpan,...props}) => {

    const [editMode,SetEditMode]=useState(false)

const ChangeState = ()=> {
        SetEditMode(!editMode)
}

    const changeSpanTitle = (e:string)=> {
    titleSpan(e)
     }

  return (

          editMode
          ? <input onChange={(e)=>changeSpanTitle(e.currentTarget.value)} autoFocus onBlur={ChangeState} value={title}/>
          : <span onDoubleClick={ChangeState}>{title}</span>

  )
};

