import React, {ChangeEvent, KeyboardEvent, useState} from 'react';


type  SuperInputType ={
    addMessage:(value:string)=>void
}

export const SuperInput:React.FC<SuperInputType> = ({addMessage,...props}) => {

    const [value, SetValue] = useState('')

    const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
        SetValue(e.currentTarget.value)
    }

    const [error, SetError] = useState<string | null>()

    const AddMessage = () => {
        if (value.trim() !== '') {
            addMessage(value.trim())
        } else (SetError('Title is requiet'))
        SetValue('')
    }

    const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            AddMessage()
        } else (SetError(''))
    }
    return (
        <>
            <input value={value} className={error ? 'error' : ''} onChange={onChangeInput} onKeyDown={onKeyDown}/>
            <button onClick={AddMessage}>Add</button>
            {error && <div className='error-message'>{error}</div>}
        </>
    );
};

