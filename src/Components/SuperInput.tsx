import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import s from "../Todolist.module.css";
import Button from "@mui/material/Button";
import TextField from '@mui/material/TextField';


type SuperInputType = {
    addTask: (inputValue: string) => void
}


export const SuperInput: React.FC<SuperInputType> = ({addTask, ...props}) => {

    let [inputValue, setInputValue] = useState('')

    let [error, setError] = useState<null | string>('')

    const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.currentTarget.value)
    }

    const addTaskHandler = () => {
        if (inputValue.trim() !== '') {
            addTask(inputValue.trim())
        } else (setError('Title is required'))
        setInputValue('')
    }


    const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            addTaskHandler()
        }
        setError('')
    }

    const ButtonStyle = {
        maxWidth: '38px',
        maxHeight: '38px',
        minWidth: '38px',
        minHeight: '38px'
    }
    return (
        <span>

              <TextField
                  // className={error ? s.error : ''} onChange={onChangeInput} onKeyPress={onKeyPress}
                  error={!!error}
                  value={inputValue}
                  size='small'
                  id="outlined-textarea"
                  label={error ? error:"Write Text"}
                  placeholder="Write Text"

                  onChange={onChangeInput}
                  onKeyDown={onKeyDown}
              />
            <Button variant="contained"
                    style={ButtonStyle}
                    onClick={addTaskHandler}>+</Button>

        </span>
    );
};

