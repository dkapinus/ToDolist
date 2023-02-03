import React, {useState} from 'react';
import './App.css';
import {TaskTypeArray, Todolist} from "./Todolist";
import {v1} from 'uuid'
import {Input} from "./Components/Input";


export type FilterValuesType = "all" | "active" | "completed";


type TodoListsType = {
    id:string;
    title:string;
    filter:FilterValuesType;


}

type Tasks = {
    [key:string]:Array<TaskTypeArray>
}

function App() {

    let todoListsID1=v1()
    let todoListsID2=v1()

    let [todoLists, SetTodoLists] = useState<TodoListsType[]>([
        {id: todoListsID1, title: "Whats to learn", filter: "all"},
        {id: todoListsID2, title: "Whats to buy", filter: "all"},

    ])


    let [tasks, setTasks] = useState<Tasks>({
        [todoListsID1]:[
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false},
        ],
        [todoListsID2]:[
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false},
    ]
    });




      const FilterTask = (todolistId:string,nameButton:FilterValuesType)=> {
        SetTodoLists(todoLists.map((el)=>el.id===todolistId ? {...el,filter:nameButton} :el))
       }



       const removeTask=(todolistId:string,taskId:string)=>{

        // setTask(tasks.filter((el)=>el.id!==taskId))
           setTasks({...tasks,[todolistId]:tasks[todolistId].filter((el)=>el.id!==taskId)})
       }

       const  changeStatus=(todolistId:string,id:string,e:boolean)=>{
      // setTask(tasks.map((el)=>el.id===id ? {...el,isDone: isDone}: el))
setTasks({...tasks,[todolistId]:tasks[todolistId].map((el)=>el.id===id ? {...el,isDone: e}:el)})

       }

       const addMessage=(todolistId:string,valueInput:string)=>{
        let newTask= { id: v1(), title: valueInput, isDone: true }
        //    setTask([newTask,...tasks])
           setTasks({...tasks,[todolistId]:[newTask,...tasks[todolistId]]})
       }

       const deleteTodolist = (todolistId:string)=> {

          SetTodoLists(todoLists.filter((el)=>el.id!==todolistId))
       }

       const AddTodolist = (valueInput:string)=> {
           let todoListsID3=v1()

           let newTask:TodoListsType= { id: todoListsID3, title: valueInput, filter: 'all' }
          SetTodoLists([newTask,...todoLists])
           setTasks({...tasks,[todoListsID3]:[]})

       }

       const changeSpanTask=(todolistId:string,id:string,e:string)=>{

          setTasks({...tasks,[todolistId]:tasks[todolistId].map((el)=>el.id===id ? {...el,title:e }:el)})
       }

    const changeSpanTodolist=(todolistId:string,e:string)=>{

          SetTodoLists(todoLists.map((el)=>el.id===todolistId ? {...el,title:e}:el))
    }

    return (
        <div className="App">
            <Input addMessage={AddTodolist}/>

            {todoLists.map((el)=>{
                const FilteredTask = ()=> {
                    let newArrayTask=tasks[el.id]
                    if (el.filter==='active'){newArrayTask=tasks[el.id].filter((el)=>el.isDone===false)}
                    if (el.filter==='completed'){newArrayTask=tasks[el.id].filter((el)=>el.isDone===true)}
                    return newArrayTask
                }
                return (
                    <Todolist
                        key={el.id}
                        id={el.id}
                        title={el.title}
                        task={FilteredTask()}
                        FilterTask={FilterTask}
                        removeTask={removeTask}
                        changeStatus={changeStatus}
                        addMessage={addMessage}
                        filter={el.filter}
                        deleteTodolist={deleteTodolist}
                        changeSpanTask={changeSpanTask}
                        changeSpanTodolist={changeSpanTodolist}
                    />
                )
            })}


        </div>
    );
}

export default App;
