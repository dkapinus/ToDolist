import React, {ChangeEvent, memo, useCallback, useState} from 'react';

type EditableSpanType = {
    title: string
    changeEditableSpan: (e:string) => void
}

export const EditableSpan: React.FC<EditableSpanType> =memo( ({
                                                             title, changeEditableSpan,
                                                             ...props
                                                         }) => {

console.log('Editabal span')
    const [editMode, setEditMode] = useState(false)

    const ChangeEditMode = () => {
        setEditMode(!editMode)
    }

    const onChangeInputTask =useCallback( (e:ChangeEvent<HTMLInputElement>) => {
        changeEditableSpan(e.currentTarget.value)
    },[changeEditableSpan])

    return (
        <> {editMode
            ? <input value={title} onChange={onChangeInputTask} onBlur={ChangeEditMode} autoFocus/>
            : <span onDoubleClick={ChangeEditMode} >{title}</span>
        }

        </>


    );
})

