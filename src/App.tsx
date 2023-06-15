import React, {useCallback, useState} from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist";
import {v1} from "uuid";
import {SuperInput} from "./Components/SuperInput";
import {ButtonAppBar} from "./Components/ButtonAppBar";
import Container from "@mui/material/Container";
import  Paper from "@mui/material/Paper";
import  Grid from "@mui/material/Grid";

export type FilterValueType = 'all' | 'active' | 'completed'

type TodolistType = {
    id: string,
    title: string,
    filter: FilterValueType
}

type TaskKeyType = {
    [key: string]: TaskType[]
}

function App() {


    let todolistId1 = v1();
    let todolistId2 = v1();

    let [todolists, setTodolists] = useState<TodolistType[]>([
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ])


    let [task, setTask] = useState<TaskKeyType>({
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

    const removeTask = (todolistID:string,taskId: string) => {
        setTask({...task,[todolistID]:task[todolistID].filter((el)=>el.id!==taskId)})
    }


    const filterTasks = (todolistID:string,filterValue: FilterValueType) => {
        setTodolists(todolists.map((el)=>el.id ===todolistID ? {...el,filter:filterValue} : el))
    }

    const addTask =(todolistID:string,inputValue: string) => {
        let newTask:TaskType = {id: v1(), title: inputValue, isDone: true}
        setTask({ ...task,[todolistID]:[newTask,...task[todolistID]]})
    }

    const changeStatus = (todolistID:string,taskId: string, e: boolean) => {
        setTask({...task,[todolistID]:task[todolistID].map((el)=>el.id===taskId ? {...el,isDone:e}: el)})
    }

    const removeTodolist =(todolistID:string)=> {
        setTodolists(todolists.filter((el)=>el.id !==todolistID))
        delete (task[todolistID])
    }

    const addTodolist =(inputValue:string)=> {
        let todolistId3 = v1();
        let newTodolist:TodolistType ={id: todolistId3, title: inputValue, filter: "all"}
        setTodolists([...todolists,newTodolist])
        setTask({...task,[todolistId3]:[]})
    }

    const changeInputTask =(todolistID: string,id:string,e:string)=> {
        setTask({...task,[todolistID]:task[todolistID].map((el)=>el.id===id ? {...el,title:e}: el)})
    }

    const changeTodolistName =(todolistID: string, e: string)=> {
        setTodolists(todolists.map((el)=>el.id===todolistID ?{...el,title:e} : el))
    }

    return (
        <div className="App">
            <ButtonAppBar/>
            <Container fixed>
                <Grid container style={{padding:'10px'}}>
                    <SuperInput add={addTodolist}/>
                </Grid >
                <Grid container spacing={3}>
                    {todolists.map((el) => {

                        let filtered = task[el.id]
                        if (el.filter === 'active') {
                            filtered = task[el.id].filter((el) => el.isDone === false)
                        }
                        if (el.filter === 'completed') {
                            filtered = task[el.id].filter((el) => el.isDone === true)
                        }
                        return  <Grid item>
                            <Paper  elevation={6} style={{padding:'10px'}} >
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
                            </Paper>

                        </Grid>
                    })}
                </Grid >


            </Container>


        </div>
    );
}

export default App;
