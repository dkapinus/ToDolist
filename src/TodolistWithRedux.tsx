import React, {memo, useCallback} from 'react';
import {FilterValuesType} from "./App";
import {SuperInput} from "./Components/SuperInput";
import {EnableSpan} from "./Components/EnableSpan";
import { TodolistType} from "./AppWithRedux";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./store/store";
import {addTaskTypeAC} from "./store/tasks-reducer";
import {ChangeTodolistTitleAC, filterTypeAC,  RemoveTodolistAC} from "./store/todolists-reducer";

import {TaskType} from "./Todolist";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import {Task} from "./Task";


type PropsType = {
    todolist: TodolistType

}




export const TodolistWithRedux = memo(({todolist}:PropsType) => {


    const {id,title,filter} =todolist

    const tasks =useSelector<AppRootStateType,Array<TaskType>>(state => state.tasks[id])

    let filtered = tasks
    if (filter === 'active') {
        filtered = tasks.filter((el) => el.isDone === false)
    }
    if (filter === 'completed') {
        filtered = tasks.filter((el) => el.isDone === true)
    }

    const dispatch =useDispatch()


    const onClickHandlerButtonFilter = useCallback( (nameButton: FilterValuesType) => {

        dispatch(filterTypeAC(id, nameButton))
    },[dispatch,id])



    const AddMessage =useCallback( (valueInput: string) => {
        dispatch(addTaskTypeAC(id, valueInput))
    },[dispatch])

    const ChangeTodolistTitle = useCallback((newTitle: string) => {
        dispatch(ChangeTodolistTitleAC(id, newTitle))

    },[dispatch,id])

    const DeleteTodolist =useCallback( () => {
        dispatch(RemoveTodolistAC(id))
    },[dispatch])
    return (
        <div>
            <h3><EnableSpan title={title} changeInputTitle={ChangeTodolistTitle}/>

                <IconButton style={{maxWidth: '100px', maxHeight: '30px', minWidth: '100px', minHeight: '30px'}} onClick={DeleteTodolist} aria-label="delete">
                    <DeleteIcon />
                </IconButton>
            </h3>

            <SuperInput addMessage={AddMessage}/>
            <ul>
                {filtered.map((el) => {

                    return (
                        <Task key={el.id} taskId={el.id} isDone={el.isDone} title={el.title} todolistID ={id}  />
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
})




