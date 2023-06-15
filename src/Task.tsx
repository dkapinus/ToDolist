import React, {useCallback} from 'react';
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

export  const Task = ({task,removeTask,changeStatus,callbackChangeInputTask}:TasksType) => {

    const onClickHandlerRemoveTask =useCallback( (taskId: string) => {
        removeTask( taskId)
    },[removeTask])

    const changeInputTask =useCallback( ( e: string) => {
        callbackChangeInputTask( task.id, e)
    },[callbackChangeInputTask])

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

            <button onClick={() => onClickHandlerRemoveTask(task.id)}>X</button>
        </div>
    );
};

