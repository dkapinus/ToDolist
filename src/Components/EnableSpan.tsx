import React, {ChangeEvent, memo, useState} from 'react';

type EnableSpanType = {
    title: string
    changeInputTitle: (newTitle:string) => void
}


export const EnableSpan: React.FC<EnableSpanType> =memo( ({
                                                         title,
                                                         changeInputTitle,
                                                         ...props
                                                     }) => {


    const [editMode, setEditMode] = useState(false)


    const ChangeEditMode = () => {
        setEditMode(!editMode)
    }

    const onChangeInputTitle = (e: ChangeEvent<HTMLInputElement>) => {
        changeInputTitle(e.currentTarget.value)


    }


    return (
        <> {editMode
            ? <input value={title} onChange={onChangeInputTitle} onBlur={ChangeEditMode} autoFocus />

            : <span onDoubleClick={ChangeEditMode}>{title}</span>}

        </>
    );
})

