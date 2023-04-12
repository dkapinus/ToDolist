import React, {ChangeEvent, KeyboardEvent, memo, useState} from 'react';
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

type SuperButtonType = {
    addMessage: (valueInput: string) => void
}


export const SuperInput:React.FC<SuperButtonType> = memo(({addMessage,...props}) => {


    const [valueInput, setInputValue] = useState('')
    const [error, setError] = useState('')

    const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.currentTarget.value)

    }

    const AddMessage = () => {
        if (valueInput.trim() !== '') {
            addMessage(valueInput)
        } else {
            setError('Title is requiet')
        }
        setInputValue('')


    }
    const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if(error==='') { setError('')}
        if (e.key === 'Enter') {
            AddMessage()
        }

    }
    return (
        <div>

            <TextField
                size='small'
                value={valueInput}
                onChange={onChangeInput}
                onKeyDown={onKeyDown}
                error={!!error}
                id="outlined-basic" label={error ? 'Error' : 'SomeWrite'} variant='outlined'/>
            <Button size='small' style={{maxWidth: '40px', maxHeight: '40px', minWidth: '40px', minHeight: '40px'}}
                    onClick={AddMessage} variant="contained">+</Button>

        </div>
    );
})

