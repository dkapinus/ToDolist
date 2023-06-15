import React, {useCallback} from 'react';
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
import {TodolistWithRedux} from "./TodolistWithRedux";

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

    const removeTask =useCallback( (todolistID: string, taskId: string) => {
        dispatch(removeTaskAC(todolistID, taskId))
    },[dispatch])

    const filterTasks = useCallback((todolistID: string, filterValue: FilterValueType) => {
        dispatch(filterTasksTodoAC(todolistID, filterValue))
    },[dispatch])

    const addTask =useCallback( (todolistID: string, inputValue: string) => {
        dispatch(addTaskAC(todolistID, inputValue))
    },[dispatch])

    const changeStatus =useCallback( (todolistID: string, taskId: string, e: boolean) => {
        dispatch(changeStatusTaskAC(todolistID, taskId, e))
    },[dispatch])

    const removeTodolist =useCallback( (todolistID: string) => {
        dispatch(removeTodolistAC(todolistID))
        dispatch(removeTodolistAC(todolistID))
    },[dispatch])

    const addTodolist = useCallback((inputValue: string) => {
        let action = addTodolistAC(inputValue)
        dispatch(action)

    },[dispatch])

    const changeInputTask = useCallback((todolistID: string, id: string, e: string) => {
        dispatch(changeInputTaskAC(todolistID, id, e))
    },[dispatch])

    const changeTodolistName =useCallback( (todolistID: string, e: string) => {
        dispatch(changeTodolistNameAC(todolistID, e))
    },[])

    return (
        <div className="App">
            <ButtonAppBar/>
            <Container fixed>
                <Grid container style={{padding: '10px'}}>
                    <SuperInput add={addTodolist}/>
                </Grid>
                <Grid container spacing={3}>
                    {todolists.map((el) => {

                        return <Grid item>
                            <Paper elevation={6} style={{padding: '10px'}}>

                                <Todolist
                                    key={el.id}
                                    todolistID={el.id}
                                    title={el.title}
                                    task={task[el.id]}
                                    removeTask={removeTask}
                                    filterTasks={filterTasks}
                                    addTask={addTask}
                                    changeStatus={changeStatus}
                                    filter={el.filter}
                                    removeTodolist={removeTodolist}
                                    callbackChangeInputTask={changeInputTask}
                                    callbackChangeTodolistName={changeTodolistName}
                                />
                                {/*<TodolistWithRedux*/}
                                {/*    todolistID={el.id}*/}
                                {/*    title={el.title}*/}
                                {/*    filter={el.filter}/>*/}
                            </Paper>

                        </Grid>
                    })}
                </Grid>


            </Container>


        </div>
    );
}

export default AppWithReducer;
