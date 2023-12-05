import React, {memo, useCallback} from 'react';
import Checkbox from "@mui/material/Checkbox";
import s from "./Todolist.module.css"
import {EditableSpan} from "./Components/EditableSpan";
import {TaskStatuses, TaskType} from "./api/task-api";
import {RequestStatusType} from "./state/app-reducer";



type TasksType = {
    task:TaskType
    removeTask: ( taskId: string) => void
    changeStatus: (taskId: string, status: TaskStatuses) => void
    callbackChangeInputTask: ( id: string, e: string) => void
    disable:RequestStatusType
}

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

export  const Task =memo( ({task,
                               removeTask,
                               changeStatus,
                               callbackChangeInputTask,
                               disable}:TasksType) => {




    const onClickHandlerRemoveTask =useCallback( () => {
        removeTask( task.id)
    },[removeTask,task.id])

    const changeInputTask =useCallback( ( e: string) => {
        callbackChangeInputTask( task.id, e)
    },[callbackChangeInputTask,task.id])

    const onChangeStatus =useCallback( (id: string, e:boolean) => {
        const NewValueChecked = e
        changeStatus( id, NewValueChecked ? TaskStatuses.Completed : TaskStatuses.New)
    },[changeStatus])
    return (
        <div>
            <Checkbox {...label}
                      checked={task.status === TaskStatuses.Completed}
                      onChange={(e) => onChangeStatus(task.id, e.currentTarget.checked)}
                      className={task.status === TaskStatuses.Completed ? s.isDone : ''}
            />


            <EditableSpan title={task.title} changeEditableSpan={changeInputTask} disable={disable} />

            <button onClick={onClickHandlerRemoveTask} disabled={disable==='loading'}>X</button>
        </div>
    );
})

