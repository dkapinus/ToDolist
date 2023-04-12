import React, {useReducer, useState} from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist";
import {v1} from 'uuid';
import {SuperInput} from "./Components/SuperInput";
import {
    addTaskTypeAC, ADDTodolistTaskAC,
    ChangeCheckedInputTypeAC, ChangeInputTitleAC,
    removeTaskAC,
    tasksReducer
} from "./store/tasks-reducer";
import {
    ADDTodolistAC,
    ChangeTodolistTitleAC, filterTypeAC,

    RemoveTodolistAC,
    todolistsReducer
} from "./store/todolists-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./store/store";


export type FilterValuesType = "all" | "active" | "completed";

export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TaskTypeKey = {
    [key: string]: TaskType[]
}

function App() {


const todolists =useSelector<AppRootStateType,TodolistType[]>(state => state.todolists)
    const tasks =useSelector<AppRootStateType,TaskTypeKey >(state => state.tasks)

   const dispatch =useDispatch()






    const ButtonFilter = (todolistId: string,nameButton: FilterValuesType) => {
        dispatch(filterTypeAC(todolistId,nameButton))
    }

    const RemoveTask = (todolistId: string, taskID: string) => {

        dispatch(removeTaskAC(todolistId, taskID))

    }

    const AddMessage = (todolistId: string, valueInput: string) => {

        dispatch(addTaskTypeAC(todolistId, valueInput))
    }

    const ChangeCheckedInput = (todolistId: string, taskId: string, status: boolean) => {
        dispatch(ChangeCheckedInputTypeAC(todolistId, taskId, status))

    }

    const AddTodolist = (valueInput: string) => {
        let todolistId3 = v1();
        let newTitle: TodolistType = {id: todolistId3, title: valueInput, filter: 'all'}

        dispatch(ADDTodolistAC(newTitle))
        dispatch(ADDTodolistTaskAC(todolistId3))

    }

    const ChangeInputTitle = (todolistId: string, taskId: string, newTitle: string) => {

       dispatch(ChangeInputTitleAC(todolistId, taskId, newTitle))
    }

    const ChangeTodolistTitle = (todolistId: string, newTitle: string) => {

        dispatch(ChangeTodolistTitleAC(todolistId, newTitle))
    }

    const RemoveTodolist = (todolistId: string) => {

        dispatch(RemoveTodolistAC(todolistId))
    }

    return (
        <div className="App">
            <SuperInput addMessage={AddTodolist}/>
            {todolists.map((el) => {

                let filtered = tasks[el.id]
                if (el.filter === 'active') {
                    filtered = tasks[el.id].filter((el) => el.isDone === false)
                }
                if (el.filter === 'completed') {
                    filtered = tasks[el.id].filter((el) => el.isDone === true)
                }
                return (<Todolist
                    key={el.id}
                    todolistId={el.id}
                    name={el.title}
                    task={filtered}
                    buttonFilter={ButtonFilter}
                    removeTask={RemoveTask}
                    addMessage={AddMessage}
                    changeCheckedInput={ChangeCheckedInput}
                    filter={el.filter}
                    changeInputTitle={ChangeInputTitle}
                    changeTodolistTitle={ChangeTodolistTitle}
                    deleteTodolist={RemoveTodolist}
                />)
            })}

        </div>
    );
}

export default App;
