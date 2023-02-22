import React, {useReducer} from 'react';
import './App.css';
import {v1} from 'uuid'
import {TaskType, Todolist} from "./Todolist";
import {SuperInput} from "./Components/SuperInput";
import {
    addTaskAC,
    AddTodolistTaskAC,
    ChangeStatusAC,
    ChangeTitleSpanAC,
    reducerTasks,
    removeTaskAC
} from "./Reducer/ReducerTasks";
import {AddTodolistAC, filteredTasksAC, reducerTodolist, removeTodolistAC} from "./Reducer/ReducerTodolist";


export type FilterValueType = 'All'|'Active'|'Completed'

 export type  TodolistsType = {
    id:string;
    title:string;
    filter:FilterValueType
}

export  type TaskTypeForDispatch = {
    [key:string]:TaskType[]
}



function App() {


    let todolistID1 = v1()
    let todolistID2 = v1()

    let [todolists, dispatchTodolists] = useReducer(reducerTodolist,[
        {id: todolistID1, title: 'What to learn', filter: 'All'},
        {id: todolistID2, title: 'What to buy', filter: 'All'},
    ])

    let [tasks, dispatchTasks] = useReducer(reducerTasks,{
        [todolistID1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false},

        ],
        [todolistID2]: [
            {id: v1(), title: 'Rest API', isDone: true},
            {id: v1(), title: 'GraphQL', isDone: false},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false},
        ]
    })
    const removeTask = (todolistID:string,taskId:string)=> {
        // setTasks(tasks.filter((el)=>el.id!==taskId))
        dispatchTasks( removeTaskAC(todolistID,taskId))
    }

    const AddMessage = (todolistID:string,value:string)=> {
        // let NewTask = {id: v1(), title: value, isDone: true}
        // setTasks({...tasks,[todolistID]:[NewTask,...tasks[todolistID]]})

        // setTasks([NewTask,...tasks])
     dispatchTasks(addTaskAC(todolistID,value))
    }






    const filteredTask =(todolistID:string,nameButton:FilterValueType)=> {

   // setTodolists(todolists.map((el)=>el.id===todolistID ? {...el, filter:nameButton}: el))
        dispatchTodolists(filteredTasksAC(todolistID,nameButton))
    }



    const changeStatus = (todolistID:string,id:string,e:boolean)=> {
        // // setTasks(tasks.map((el)=>el.id===id ? {...el,isDone: e}: el))
        // setTasks({...tasks,[todolistID]:tasks[todolistID].map((el)=>el.id===id ? {...el,isDone: e}: el)})
        dispatchTasks(ChangeStatusAC(todolistID,id,e))
    }
    const deleteTodolist = (todolistID:string)=> {
// setTodolists(todolists.filter((el)=>el.id!==todolistID))
        dispatchTodolists(removeTodolistAC(todolistID))
    }

    const AddTodolist = (value:string)=> {
        let todolistID3 = v1()
       //  let NewTask:TodolistsType={id:todolistID3, title: value, filter: 'All'}
       // setTodolists([...todolists,NewTask])
       //  setTasks({...tasks,[todolistID3]:[]})
        dispatchTodolists( AddTodolistAC(todolistID3,value))
        dispatchTasks(AddTodolistTaskAC(todolistID3))

    }

    const changeTitleSpan = (todolistID:string,taskId:string,title:string)=> {
        // setTasks({...tasks,[todolistID]:tasks[todolistID].map((el)=>el.id===taskId ?{...el,title:e} : el)})
        dispatchTasks(ChangeTitleSpanAC(todolistID,taskId,title))
    }

    return (
        <div className="App">

            <SuperInput AddMessage={AddTodolist}/>
            {todolists.map((el)=>{

                let filtered =tasks[el.id]
                if (el.filter==='Active'){filtered=tasks[el.id].filter((el)=>el.isDone===false)}
                if (el.filter==='Completed'){filtered=tasks[el.id].filter((el)=>el.isDone===true)}
                return (

                    <Todolist

                               key={el.id}
                               todolistID={el.id}
                               title ={el.title}
                               task={filtered}
                               removeTask={removeTask}
                               filteredTask={filteredTask}
                               AddMessage={AddMessage}
                               changeStatus={changeStatus}
                               Filter={el.filter}
                               deleteTodolist={deleteTodolist}
                               changeTitleSpan={changeTitleSpan}
                    />
                )
            })}

        </div>
    );
}

export default App;