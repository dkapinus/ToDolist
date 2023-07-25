import React, {useCallback, useEffect} from 'react';
import './App.css';
import { Todolist} from "./Todolist";
import {SuperInput} from "./Components/SuperInput";
import {ButtonAppBar} from "./Components/ButtonAppBar";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import {
    ThunkCreateTaskTC,
    ThunkDeleteTaskTC, ThunkTaskUpdateTC,
} from "./state/taskReducer";
import {

    filterTasksTodoAC,
    ThunkCreateTodoTC, ThunkDeleteTodoTC, ThunkGetStateTC, ThunkUpdateTodoTC,
} from "./state/todoReducer";
import { useSelector} from "react-redux";
import { AppRootStateType, useAppDispatch} from "./state/store";
import {TaskStatuses, TaskType} from "./api/task-api";
import {TodolistType} from "./api/todolist-api";



export type FilterValueType = 'all' | 'active' | 'completed'



export type TaskKeyType = {
    [key: string]: TaskType[]
}

function AppWithReducer() {


    let todolists = useSelector<AppRootStateType, TodolistType[]>(state => state.todolists)

    let task = useSelector<AppRootStateType, TaskKeyType>(state => state.tasks)

    const dispatch = useAppDispatch()

    useEffect(()=>{
        dispatch(ThunkGetStateTC())
    },[])



    const removeTask = useCallback( (todolistID: string, taskId: string) => {
        dispatch(ThunkDeleteTaskTC(todolistID, taskId))
    },[])

    const filterTasks = useCallback((todolistID: string, filterValue: FilterValueType) => {
        dispatch(filterTasksTodoAC(todolistID, filterValue))
    },[dispatch])

    const addTask =useCallback( (todolistID: string, inputValue: string) => {
        dispatch(ThunkCreateTaskTC(todolistID, inputValue))
    },[])

    const changeStatus =useCallback( (todolistID: string, taskId: string, status:TaskStatuses) => {
        dispatch(ThunkTaskUpdateTC(todolistID, taskId, {status}))
    },[])

    const removeTodolist =useCallback( (todolistID: string) => {
        dispatch(ThunkDeleteTodoTC(todolistID))
        dispatch(ThunkDeleteTodoTC(todolistID))
    },[])

    const addTodolist = useCallback((inputValue: string) => {
        let action = ThunkCreateTodoTC(inputValue)
        dispatch(action)

    },[])

    const changeInputTask = useCallback((todolistID: string, id: string, title:string) => {
        dispatch(ThunkTaskUpdateTC(todolistID, id, {title}))
    },[])

    const changeTodolistName =useCallback( (todolistID: string, e: string) => {
        dispatch(ThunkUpdateTodoTC(todolistID, e))
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
