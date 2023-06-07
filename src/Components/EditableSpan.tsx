import React, {ChangeEvent, useState} from 'react';

type EditableSpanType = {
    title: string
    changeEditableSpan: (e:string) => void
}

export const EditableSpan: React.FC<EditableSpanType> = ({
                                                             title, changeEditableSpan,
                                                             ...props
                                                         }) => {


    const [editMode, setEditMode] = useState(false)

    const ChangeEditMode = () => {
        setEditMode(!editMode)
    }

    const onChangeInputTask = (e:ChangeEvent<HTMLInputElement>) => {
        changeEditableSpan(e.currentTarget.value)
    }

    return (
        <> {editMode
            ? <input value={title} onChange={onChangeInputTask} onBlur={ChangeEditMode} autoFocus/>
            : <span onDoubleClick={ChangeEditMode} >{title}</span>
        }

        </>


    );
};

