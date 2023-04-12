import React, {memo, useCallback} from 'react';
import {ChangeCheckedInputTypeAC, ChangeInputTitleAC, removeTaskAC} from "./store/tasks-reducer";
import {useDispatch} from "react-redux";
import {EnableSpan} from "./Components/EnableSpan";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

type TaskType ={
    taskId:string
    isDone:boolean
    title:string
todolistID:string

}


export const Task:React.FC<TaskType> =memo( ({taskId,todolistID,isDone,title,...props}) => {
    console.log('Editable span')
    const dispatch = useDispatch()

    const ChangeInputTitle = useCallback((newTitle:string) => {
        dispatch(ChangeInputTitleAC(todolistID, taskId, newTitle))

    },[dispatch,todolistID,taskId])

    const RemoveTask =useCallback( (taskID: string) => {
        dispatch(removeTaskAC(todolistID, taskID))
    },[dispatch,todolistID,taskId])

    const onChangeCheckedInput = useCallback((taskId: string, status: boolean) => {
        dispatch(ChangeCheckedInputTypeAC(todolistID, taskId, status))
    },[dispatch,taskId,isDone])
    return (
        <li key={taskId} className={isDone ? 'is-done' : ''}>
            <EnableSpan title={title} changeInputTitle={ChangeInputTitle}/>

            <Checkbox onChange={(e) => onChangeCheckedInput(taskId, e.currentTarget.checked)} checked={isDone} defaultChecked style={{alignItems:'flex-end'}} />
            <IconButton style={{maxWidth: '100px', maxHeight: '30px', minWidth: '100px', minHeight: '30px',alignItems:'flex-end'}} onClick={() => RemoveTask(taskId)} aria-label="delete">
                <DeleteIcon />
            </IconButton>
        </li>

    );
})

