import React, {ChangeEvent, useState} from 'react';

type EnableSpanType = {
    title: string
    changeEnableSpan: (e: string) => void
}

export const EnableSpan: React.FC<EnableSpanType> = ({title, changeEnableSpan, ...props}) => {

    const [editMode, setEditMode] = useState(false)

    const ChangeEditMode = () => {
        setEditMode(!editMode)
    }

    const ChangeEnableSpan = (e: ChangeEvent<HTMLInputElement>) => {
        changeEnableSpan(e.currentTarget.value)
    }

    return (
        <> {editMode
            ? <input value={title} onBlur={ChangeEditMode} autoFocus onChange={ChangeEnableSpan}/>
            : <span onDoubleClick={ChangeEditMode}>{title}</span>}
        </>
    );
};

