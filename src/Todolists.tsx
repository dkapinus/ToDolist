import React, {useCallback, useEffect} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
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
import {useSelector} from "react-redux";
import {AppRootStateType, useAppDispatch} from "./state/store";
import {TaskStatuses, TaskType} from "./api/task-api";
import {TodolistType} from "./api/todolist-api";
import LinearProgress from "@mui/material/LinearProgress";
import {RequestStatusType} from "./state/app-reducer";
import {ErrorSnackbar} from "./Components/ErrorSnakeBar";
import {Navigate} from "react-router-dom";
import { ThunkLogout} from "./Components/Login/auth-Reducer";




export type FilterValueType = 'all' | 'active' | 'completed'


export type TaskKeyType = {
    [key: string]: TaskType[]
}

 export  const  Todolists = ()=> {


    let todolists = useSelector<AppRootStateType, TodolistType[]>(state => state.todolists)

    let task = useSelector<AppRootStateType, TaskKeyType>(state => state.tasks)

    let loading = useSelector<AppRootStateType, RequestStatusType>(state => state.app.status)

    const isLogin=useSelector<AppRootStateType,boolean>(state => state.authReducer.isLoggedIn)


    const dispatch = useAppDispatch()





    useEffect(() => {
        if(!isLogin) return
        dispatch(ThunkGetStateTC())
    }, [dispatch])


    const removeTask = useCallback((todolistID: string, taskId: string) => {
        dispatch(ThunkDeleteTaskTC(todolistID, taskId))
    }, [dispatch])

    const filterTasks = useCallback((todolistID: string, filterValue: FilterValueType) => {
        dispatch(filterTasksTodoAC(todolistID, filterValue))
    }, [dispatch])

    const addTask = useCallback((todolistID: string, inputValue: string) => {
        dispatch(ThunkCreateTaskTC(todolistID, inputValue))
    }, [dispatch])

    const changeStatus = useCallback((todolistID: string, taskId: string, status: TaskStatuses) => {
        dispatch(ThunkTaskUpdateTC(todolistID, taskId, {status}))
    }, [dispatch])

    const removeTodolist = useCallback((todolistID: string) => {
        dispatch(ThunkDeleteTodoTC(todolistID))

    }, [dispatch])

    const addTodolist = useCallback((inputValue: string) => {
        let action = ThunkCreateTodoTC(inputValue)
        dispatch(action)

    }, [dispatch])

    const changeInputTask = useCallback((todolistID: string, id: string, title: string) => {
        dispatch(ThunkTaskUpdateTC(todolistID, id, {title}))
    }, [dispatch])

    const changeTodolistName = useCallback((todolistID: string, e: string) => {
        dispatch(ThunkUpdateTodoTC(todolistID, e))
    }, [dispatch])


     const Logout =useCallback(()=>{
         dispatch(ThunkLogout())
     },[dispatch])

     if (!isLogin) return <Navigate to={"/login"}/>

    return (
        <div className="App">
            <ButtonAppBar logoutCallback={Logout}/>

            {loading === 'loading' ? <LinearProgress color='secondary'/> : ''}
            <Container fixed>
                <Grid container style={{padding: '10px'}}>
                    <SuperInput add={addTodolist}/>
                </Grid>
                <Grid container spacing={3}>

                    {todolists.map((el) => {

                        return <Grid item key={el.id}>
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
                                        disable={el.entityStatus}
                                    />


                            </Paper>

                        </Grid>
                    })}
                </Grid>


                <ErrorSnackbar/>

            </Container>

        </div>
    );
}

