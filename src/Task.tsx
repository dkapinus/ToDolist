import React, {memo, useCallback} from 'react';
import Checkbox from "@mui/material/Checkbox";
import s from "./Todolist.module.css"
import {EditableSpan} from "./Components/EditableSpan";
import {TaskType} from "./Todolist";


type TasksType = {
    task:TaskType
    removeTask: ( taskId: string) => void
    changeStatus: (taskId: string, e: boolean) => void
    callbackChangeInputTask: ( id: string, e: string) => void
}

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

export  const Task =memo( ({task,removeTask,changeStatus,callbackChangeInputTask}:TasksType) => {
    console.log('task')

    const onClickHandlerRemoveTask =useCallback( () => {
        removeTask( task.id)
    },[removeTask,task.id])

    const changeInputTask =useCallback( ( e: string) => {
        callbackChangeInputTask( task.id, e)
    },[callbackChangeInputTask,task.id])

    const onChangeStatus =useCallback( (id: string, e: boolean) => {
        changeStatus( id, e)
    },[changeStatus])
    return (
        <div>
            <Checkbox {...label}
                      checked={task.isDone}
                      onChange={(e) => onChangeStatus(task.id, e.currentTarget.checked)}
                      className={task.isDone === true ? s.isDone : ''}
            />


            <EditableSpan title={task.title} changeEditableSpan={changeInputTask}/>

            <button onClick={onClickHandlerRemoveTask}>X</button>
        </div>
    );
})

