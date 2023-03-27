import React from 'react';
import {FilterValuesType} from "./App";
import {SuperInput} from "./Components/SuperInput";
import {EnableSpan} from "./Components/EnableSpan";
import { TodolistType} from "./AppWithRedux";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./store/store";
import {addTaskTypeAC, ChangeCheckedInputTypeAC, ChangeInputTitleAC, removeTaskAC} from "./store/tasks-reducer";
import {ChangeTodolistTitleAC, FilterTypeAC, RemoveTodolistAC} from "./store/todolists-reducer";

import {TaskType} from "./Todolist";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Checkbox from "@mui/material/Checkbox";


type PropsType = {
    todolist: TodolistType

}




export const TodolistWithRedux = ({todolist}:PropsType) => {

    const {id,title,filter} =todolist

    const tasks =useSelector<AppRootStateType,Array<TaskType>>(state => state.tasks[id])

    const dispatch =useDispatch()


    const onClickHandlerButtonFilter = (nameButton: FilterValuesType) => {
        dispatch(FilterTypeAC(id, nameButton))
    }

    const RemoveTask = (taskID: string) => {
        dispatch(removeTaskAC(id, taskID))
    }

    const onChangeCheckedInput = (taskId: string, status: boolean) => {
        dispatch(ChangeCheckedInputTypeAC(id, taskId, status))
    }

    const AddMessage = (valueInput: string) => {
        dispatch(addTaskTypeAC(id, valueInput))
    }

    const ChangeTodolistTitle = (newTitle: string) => {
        dispatch(ChangeTodolistTitleAC(id, newTitle))

    }

    const DeleteTodolist = () => {
        dispatch(RemoveTodolistAC(id))
    }
    return (
        <div>
            <h3><EnableSpan title={title} changeInputTitle={ChangeTodolistTitle}/>

                <IconButton style={{maxWidth: '100px', maxHeight: '30px', minWidth: '100px', minHeight: '30px'}} onClick={DeleteTodolist} aria-label="delete">
                    <DeleteIcon />
                </IconButton>
            </h3>

            <SuperInput addMessage={AddMessage}/>
            <ul>
                {tasks.map((el) => {
                    const ChangeInputTitle = (newTitle: string) => {
                        dispatch(ChangeInputTitleAC(id, el.id, newTitle))

                    }
                    return (
                        <li key={el.id} className={el.isDone ? 'is-done' : ''}>
                            <EnableSpan title={el.title} changeInputTitle={ChangeInputTitle}/>

                            <Checkbox onChange={(e) => onChangeCheckedInput(el.id, e.currentTarget.checked)} checked={el.isDone} defaultChecked style={{alignItems:'flex-end'}} />
                            <IconButton style={{maxWidth: '100px', maxHeight: '30px', minWidth: '100px', minHeight: '30px',alignItems:'flex-end'}} onClick={() => RemoveTask(el.id)} aria-label="delete">
                                <DeleteIcon />
                            </IconButton>
                        </li>

                    )
                })}
            </ul>

            <ButtonGroup>
                <Button variant={filter === 'all' ? "outlined" : "contained"} size='small'  onClick={() => onClickHandlerButtonFilter('all')}>All</Button>
                <Button variant={filter === 'active' ? "outlined" : "contained"} size='small'   onClick={() => onClickHandlerButtonFilter('active')} >Active</Button>
                <Button variant={filter === 'completed' ? "outlined" : "contained"} size='small'   onClick={() => onClickHandlerButtonFilter('completed')} >Completed</Button>
            </ButtonGroup>

        </div>
    );
};




