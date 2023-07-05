import type { Meta, StoryObj } from '@storybook/react';
import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import AppWithRedux from "../AppWithRedux";
import {Provider} from "react-redux";
import {store} from "../state/store";
import {SuperInput, SuperInputType} from "../Components/SuperInput";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";



// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta : Meta<typeof SuperInput>= {
  title: 'Todolist/SuperInput',
  component: SuperInput,
  tags: ['autodocs'],
  args: {

  }
}

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args


const SuperInputStoryWrapper:React.FC<SuperInputType> = (args:SuperInputType)=> {

      let [inputValue, setInputValue] = useState('')

  let [error, setError] = useState<null | string>('')

  const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.currentTarget.value)
  }

  const addTaskHandler = () => {
    if (inputValue.trim() !== '') {
      args.add(inputValue.trim())
    } else (setError('Title is required'))
    setInputValue('')
  }


  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      addTaskHandler()
    }
    if (error){ setError('')}

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
  )
}

export const SuperInputStory: Story = {

  render :(args)=><SuperInputStoryWrapper add={args.add}/>



}

