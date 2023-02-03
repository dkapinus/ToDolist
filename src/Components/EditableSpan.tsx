import React, { useState} from 'react';


type EditableSpan = {
    title:string
    ChangeSpan:(e:string)=>void
}

export const EditableSpan:React.FC<EditableSpan> = ({title,ChangeSpan,...props}) => {


    let [edit,SetEdit]=useState(true)

    const EditMode = ()=> {
      SetEdit(!edit)

    }

    const changeSpan = (e:string)=> {
        ChangeSpan(e)
    }

    return (


   edit ?  <span onDoubleClick={(m)=>EditMode()}>
            {title}</span> :    <input onBlur={EditMode} value={title} autoFocus onChange={(e)=>changeSpan(e.currentTarget.value)}/>



    );
};

