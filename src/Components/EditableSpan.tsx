import React, {ChangeEvent, memo, useCallback, useState} from 'react';
import {RequestStatusType} from "../state/app-reducer";

type EditableSpanType = {
    title: string
    changeEditableSpan: (e:string) => void
    disable?:RequestStatusType
}

export const EditableSpan: React.FC<EditableSpanType> =memo( ({
                                                             title, changeEditableSpan,
                                                             disable,
                                                             ...props
                                                         }) => {


    const [editMode, setEditMode] = useState(false)

    const ChangeEditMode = () => {
        setEditMode(!editMode)
    }

    const onChangeInputTask =useCallback( (e:ChangeEvent<HTMLInputElement>) => {
        changeEditableSpan(e.currentTarget.value)
    },[changeEditableSpan])

    return (
        <> {editMode
            ? <input value={title} onChange={onChangeInputTask} onBlur={ChangeEditMode}  disabled={disable==='loading'}  />
            : <span onDoubleClick={disable !=='loading' ? ChangeEditMode : ()=>(null)}  >{title}</span>
        }

        </>


    );
})

