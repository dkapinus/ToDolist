import React, {useReducer, useState} from 'react';
import './App.css';
import {v1} from 'uuid';
import {TaskType, Todolist} from "./Todolist";
import {SuperInput} from "./Components/SuperInput";
import {
    addTodolistTypeAC,
    changeNameTodolistTypeAC,
    deleteTodolistTypeAC,
    filterTodolistTypeAC,
    TodoReducer
} from "./Reducer/TodoReducer";
import {
    addTaskTypeAC, ADDTodolistTypeAC,
    ChangeEnableSpanAC,
    changeStatusTaskTypeAC,
    RemoveTaskTypeAC,
    TaskReducer
} from "./Reducer/TaskReducer";


export type FilterValueType = 'All' | 'Active' | 'Completed'


export type TodolistType = {
    id:string
    title:string;
    filter:FilterValueType
}

export type TaskStateType = {
    [key:string]:TaskType[]
}

function App() {

    let todolistId1 = v1();
    let todolistId2 = v1();

    let [todolists, dispatchTodolist] =useReducer (TodoReducer,[
        {id: todolistId1, title: "What to learn", filter: "All"},
        {id: todolistId2, title: "What to buy", filter: "All"}
    ])

    const [task, dispatchTask] = useReducer(TaskReducer,{
        [todolistId1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false}],
        [todolistId2]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false}],
    }
    )




    const Filtered = (todolistId:string,nameButton: FilterValueType) => {
       dispatchTodolist(filterTodolistTypeAC(todolistId,nameButton))
    }




    const RemoveTask = (todolistId:string,id: string) => {
        // setTask(task.filter((el) => el.id !== id))
      dispatchTask(RemoveTaskTypeAC(todolistId,id))

    }

    const ChangeStatus = (todolistId:string,id: string, e: boolean) => {
        // setTask(task.map((el) => el.id === id ? {...el, isDone: e} : el))
       dispatchTask(changeStatusTaskTypeAC(todolistId,id, e))
    }

    const AddMessage = (todolistId:string,value: string) => {

        let newTask:TaskType = {id: v1(), title: value, isDone: true}
        // setTask([newTask, ...task])
        dispatchTask(addTaskTypeAC(todolistId,newTask))


    }

    const deleteTodolist = (todolistId:string)=> {
        dispatchTodolist(deleteTodolistTypeAC(todolistId))
    }

    const AddTodolist =(value: string)=> {
        let todolistId3 = v1()
let newTodolist:TodolistType = {id: todolistId3, title: value, filter: "All"}
       dispatchTodolist(addTodolistTypeAC(newTodolist))
        dispatchTask(ADDTodolistTypeAC(todolistId3))

    }

    const ChangeEnableSpan =(todolistId:string,id: string,e:string)=> {
       dispatchTask(ChangeEnableSpanAC(todolistId,id,e))
    }

    const EnableTodolistName =(todolistId:string,e:string)=> {
        dispatchTodolist(changeNameTodolistTypeAC(todolistId,e))
    }

    return (

        <div className='App'>
            <SuperInput addMessage={AddTodolist}/>
            {todolists.map((el)=>{
            let filteredButton = task[el.id]
            if(el.filter==='Active'){filteredButton=task[el.id].filter((el)=>el.isDone===false)}
            if(el.filter==='Completed'){filteredButton=task[el.id].filter((el)=>el.isDone===true)}

            return (<Todolist
                key={el.id}
                todolistId={el.id}
                title={el.title}
                task={filteredButton}
                filtered={Filtered}
                removeTask={RemoveTask}
                changeStatus={ChangeStatus}
                addMessage={AddMessage}
                filter={el.filter}
                deleteTodolist={deleteTodolist}
                changeEnableSpan={ChangeEnableSpan}
                enableTodolistName={EnableTodolistName}
            />)
        })}


        </div>
    )

}

export default App