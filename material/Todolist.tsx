import React, {ChangeEvent} from 'react';
import {FilterValuesType} from './App';
import {Input} from "./Components/Input";
import {EditableSpan} from "./Components/EditableSpan";
import Button from "@mui/material/Button";
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import ButtonGroup from '@mui/material/ButtonGroup';
import Checkbox from '@mui/material/Checkbox';

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    todolistId: string
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string, todolistId: string) => void
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void
    removeTodolist: (id: string) => void
    filter: FilterValuesType
    changeTask:(todolistId: string,taskId:string,value:string)=>void
    ChangeTodolistTitle:(todolistId: string,value:string)=>void
}

export function Todolist(props: PropsType) {


    const removeTodolist = () => props.removeTodolist(props.todolistId)

    const onAllClickHandler = () => props.changeFilter("all", props.todolistId);
    const onActiveClickHandler = () => props.changeFilter("active", props.todolistId);
    const onCompletedClickHandler = () => props.changeFilter("completed", props.todolistId);

    const AddInput = (title: string)=> {
        props.addTask(title,props.todolistId)
    }

    const ChangeTodolistTitle = (value:string)=> {
    props.ChangeTodolistTitle(props.todolistId,value)
    }


    return <div>
        <h3> <EditableSpan title={props.title} ChangeTask={ChangeTodolistTitle}/>

            <IconButton style={{maxWidth: '100px', maxHeight: '30px', minWidth: '100px', minHeight: '30px'}} onClick={removeTodolist} aria-label="delete">
                <DeleteIcon />
            </IconButton>
        </h3>
        <div>
           <Input   addTask={AddInput}/>
        </div>
        <ul>
            {
                props.tasks.map(t => {
                    const onClickHandler = () => props.removeTask(t.id, props.todolistId)
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        let newIsDoneValue = e.currentTarget.checked;
                        props.changeTaskStatus(t.id, newIsDoneValue, props.todolistId);
                    }
                    const ChangeTask = (value:string)=> {
                        props.changeTask(props.todolistId,t.id,value)
                    }
                    return <li key={t.id} className={t.isDone ? "is-done" : ""}>
                        <Checkbox onChange={onChangeHandler} checked={t.isDone} defaultChecked />
                        <span><EditableSpan title={t.title} ChangeTask={ChangeTask}/></span>


                        <IconButton style={{maxWidth: '100px', maxHeight: '30px', minWidth: '100px', minHeight: '30px'}} onClick={onClickHandler} aria-label="delete">
                            <DeleteIcon />
                        </IconButton>
                    </li>
                })
            }
        </ul>
        <div><ButtonGroup>
            <Button variant={props.filter === 'all' ? "outlined" : "contained"} size='small'  onClick={onAllClickHandler} >All</Button>
            <Button variant={props.filter === 'active' ? "outlined" : "contained"} size='small'  onClick={onActiveClickHandler} >Active</Button>
            <Button variant={props.filter === 'completed' ? "outlined" : "contained"} size='small'  onClick={onCompletedClickHandler} >Completed</Button>
        </ButtonGroup>

        </div>
    </div>
}


