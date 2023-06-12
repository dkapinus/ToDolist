import React, {Reducer, useReducer, useState} from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist";
import {v1} from "uuid";
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
    taskReducer,
    TsarType
} from "./state/taskReducer";
import {
    addTodolistAC,
    changeTodolistNameAC,
    filterTasksTodoAC,
    removeTodolistAC,
    todoReducer
} from "./state/todoReducer";

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


    let todolistId1 = v1();
    let todolistId2 = v1();

    let [todolists, dispatchTodolists] = useReducer(todoReducer, [
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ])


    let [task, dispatchTask] = useReducer<Reducer<TaskKeyType, TsarType>>(taskReducer, {
        [todolistId1]: [
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'HTML', isDone: false},
            {id: v1(), title: 'REACT', isDone: true},
        ],
        [todolistId2]: [
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'HTML', isDone: false},
            {id: v1(), title: 'REACT', isDone: true},
        ],
    })

    const removeTask = (todolistID: string, taskId: string) => {
        dispatchTask(removeTaskAC(todolistID, taskId))
    }


    const filterTasks = (todolistID: string, filterValue: FilterValueType) => {
        dispatchTodolists(filterTasksTodoAC(todolistID, filterValue))
    }

    const addTask = (todolistID: string, inputValue: string) => {
        dispatchTask(addTaskAC(todolistID, inputValue))
    }

    const changeStatus = (todolistID: string, taskId: string, e: boolean) => {
        dispatchTask(changeStatusTaskAC(todolistID, taskId, e))
    }

    const removeTodolist = (todolistID: string) => {
        dispatchTodolists(removeTodolistAC(todolistID))
        dispatchTask(removeTodolistAC(todolistID))
    }

    const addTodolist = (inputValue: string) => {
        let action =addTodolistAC(inputValue)
        dispatchTodolists(action)
        dispatchTask(action)


    }

    const changeInputTask = (todolistID: string, id: string, e: string) => {
        dispatchTask(changeInputTaskAC(todolistID, id, e))
    }

    const changeTodolistName = (todolistID: string, e: string) => {
        dispatchTodolists(changeTodolistNameAC(todolistID, e))
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
