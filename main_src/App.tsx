import React, {useReducer} from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist";
import {v1} from 'uuid'
import {SuperInput} from "./Components/SuperInput";
import {
    addMessageAC,
    AddTodolistTaskAC,
    ChangeEnableSpanAC,
    changeStatusAC,
    removeTaskAC,
    TaskReduce
} from "./Reducer/TaskReduce";
import {AddTodolistAC, deleteTodolistTypeAC, filteredButtonAC, TodolistReducer} from "./Reducer/TodolistReducer";


export type FilterValueType = 'all'|'active'|'completed'

export type TodolistType = {
    id:string;
    title:string;
    filter:FilterValueType
}

export  type TasksStateType = {
    [key:string]:TaskType[]
}


function App() {

    let todolistId1 = v1();
    let todolistId2 = v1();

    let [todolists,dispatchTodolist ] = useReducer(TodolistReducer,[
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ])

    let [tasks, dispatchTasks] = useReducer(TaskReduce,{
        [todolistId1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false},
        ],
        [todolistId2]: [
            {id: v1(), title: "Milk", isDone: true},
            {id: v1(), title: "React Book", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false},
        ]
    });


    const filteredButton = (todolistId: string, filter: FilterValueType) => {
        // setTodolists(todolists.map((el)=>el.id===todolistId ? {...el, filter:nameButton}: el))
        dispatchTodolist(filteredButtonAC(todolistId, filter))
    }






        const RemoveTask = (todolistId:string,id:string)=> {
        // setTasks(tasks.filter((el)=>el.id!==id))
            dispatchTasks(removeTaskAC(todolistId,id))

    }

    const  changeStatus = (todolistId:string,id:string,e:boolean)=> {
        // setTasks(tasks.map((el)=>el.id===id ? {...el, isDone: e}: el))
        // setTasks({...tasks,[todolistId]:tasks[todolistId].map((el)=>el.id===id ? {...el,isDone:e}: el)})
        dispatchTasks(changeStatusAC(todolistId,id,e))
    }

    const addMessage = (todolistId:string,value:string)=> {
        // setTasks([newTask,...tasks])
        // setTasks({...tasks,[todolistId]:[newTask,...tasks[todolistId]]})
        dispatchTasks(addMessageAC(todolistId,value))
    }

    const deleteTodolist = (todolistId:string)=> {
        // setTodolists(todolists.filter((el)=>el.id!==todolistId))
        dispatchTodolist(deleteTodolistTypeAC(todolistId))
    }

    const AddTodolist = (value:string)=> {
        let todolistId3 = v1();
      // let newTodo:TodolistType=  {id: todolistId3, title: value, filter: "all"}
      //   setTodolists([...todolists,newTodo])
      //   setTasks({...tasks,[todolistId3]:[]})

        dispatchTasks(AddTodolistTaskAC(todolistId3 ))
        dispatchTodolist(AddTodolistAC(value,todolistId3 ))
    }

    const ChangeEnableSpan = (todolistId:string,id:string,e:string)=> {
        // setTasks({...tasks,[todolistId]:tasks[todolistId].map((el)=>el.id===id ? {...el,title:e}:el)})
        dispatchTasks(ChangeEnableSpanAC(todolistId,id,e))
    }
    return (

        <div className="App">
         <div> <SuperInput addMessage={AddTodolist}/></div>


            {todolists.map((el)=>{


                    let filtered =tasks[el.id]
                    if(el.filter==='active'){filtered=tasks[el.id].filter((f)=>f.isDone===false)}
                    if(el.filter==='completed'){filtered=tasks[el.id].filter((f)=>f.isDone===true)}


                return (

                    <Todolist key ={el.id}
                              todolistId={el.id}
                              title={el.title}
                              task={filtered}
                              filteredButton={filteredButton}
                              removeTask={RemoveTask}
                              changeStatus={changeStatus}
                              addMessage={addMessage}
                              filter={el.filter}
                              deleteTodolist={deleteTodolist}
                              ChangeEnableSpan={ChangeEnableSpan}
                    />
                )
            })}



        </div>
    );
}

export default App;