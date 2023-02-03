import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import Button from "@mui/material/Button";
import TextField from '@mui/material/TextField';
import s from  './Input.module.css'

type InputType = {

    addTask:(title: string)=>void
}

export const Input = (props:InputType) => {
    let [title, setTitle] = useState("")
    let [error, setError] = useState<string | null>(null)

    const addTask = () => {
        let newTitle = title.trim();
        if (newTitle !== "") {
            props.addTask(newTitle);
            setTitle("");
        } else {
            setError("Title is required");
        }
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null);
        if (e.charCode === 13) {
            addTask();
        }
    }
    return (
        <div>


            <TextField
                       size='small'
                       value={title}
                       onChange={onChangeHandler}
                       onKeyPress={onKeyPressHandler}
                       error={!!error}
                      id="outlined-basic" label={error? 'Error':'SomeWrite'} variant= 'outlined' />

            <Button  size='small' style={{maxWidth: '40px', maxHeight: '40px', minWidth: '40px', minHeight: '40px'}} onClick={addTask} variant="contained">+</Button>
            {error && <div className="error-message">{error}</div>}
        </div>
    );
};

