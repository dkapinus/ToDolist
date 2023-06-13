import React from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist";
import {SuperInput} from "./Components/SuperInput";
import {ButtonAppBar} from "./Components/ButtonAppBar";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import {
    addTaskAC,
    changeInputTaskAC,
    changeStatusTaskAC,
    removeTaskAC,
} from "./state/taskReducer";
import {
    addTodolistAC,
    changeTodolistNameAC,
    filterTasksTodoAC,
    removeTodolistAC,
} from "./state/todoReducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";

export type FilterValueType = 'all' | 'active' | 'completed'

export type TodolistType = {
    id: string,
    title: string,
    filter: FilterValueType
}

export type TaskKeyType = {
    [key: string]: TaskType[]
}

function AppWithReducer() {


    let todolists = useSelector<AppRootStateType, TodolistType[]>(state => state.todolists)

    let task = useSelector<AppRootStateType, TaskKeyType>(state => state.tasks)

    const dispatch = useDispatch()

    const removeTask = (todolistID: string, taskId: string) => {
        dispatch(removeTaskAC(todolistID, taskId))
    }

    const filterTasks = (todolistID: string, filterValue: FilterValueType) => {
        dispatch(filterTasksTodoAC(todolistID, filterValue))
    }

    const addTask = (todolistID: string, inputValue: string) => {
        dispatch(addTaskAC(todolistID, inputValue))
    }

    const changeStatus = (todolistID: string, taskId: string, e: boolean) => {
        dispatch(changeStatusTaskAC(todolistID, taskId, e))
    }

    const removeTodolist = (todolistID: string) => {
        dispatch(removeTodolistAC(todolistID))
        dispatch(removeTodolistAC(todolistID))
    }

    const addTodolist = (inputValue: string) => {
        let action = addTodolistAC(inputValue)
        dispatch(action)


    }

    const changeInputTask = (todolistID: string, id: string, e: string) => {
        dispatch(changeInputTaskAC(todolistID, id, e))
    }

    const changeTodolistName = (todolistID: string, e: string) => {
        dispatch(changeTodolistNameAC(todolistID, e))
    }

    return (
        <div className="App">
            <ButtonAppBar/>
            <Container fixed>
                <Grid container style={{padding: '10px'}}>
                    <SuperInput add={addTodolist}/>
                </Grid>
                <Grid container spacing={3}>
                    {todolists.map((el) => {

                        let filtered = task[el.id]
                        if (el.filter === 'active') {
                            filtered = task[el.id].filter((el) => el.isDone === false)
                        }
                        if (el.filter === 'completed') {
                            filtered = task[el.id].filter((el) => el.isDone === true)
                        }
                        return <Grid item>
                            <Paper elevation={6} style={{padding: '10px'}}>
                                <Todolist
                                    key={el.id}
                                    todolistID={el.id}
                                    title={el.title}
                                    task={filtered}
                                    removeTask={removeTask}
                                    filterTasks={filterTasks}
                                    addTask={addTask}
                                    changeStatus={changeStatus}
                                    filter={el.filter}
                                    removeTodolist={removeTodolist}
                                    callbackChangeInputTask={changeInputTask}
                                    callbackChangeTodolistName={changeTodolistName}
                                />
                            </Paper>

                        </Grid>
                    })}
                </Grid>


            </Container>


        </div>
    );
}

export default AppWithReducer;
