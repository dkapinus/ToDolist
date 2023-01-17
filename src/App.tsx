import React,{useState} from 'react';
import './App.css';
import {v1} from 'uuid'
import {Todolist} from "./Todolist";

export type ButtonFilterType ='All'|'Active'|'Completed'

type TodoListsType = {id: string, title: string, filter: ButtonFilterType}

function App() {

    let todoListsID1=v1()
    let todoListsID2=v1()

    let [todoLists, SetTodoLists] = useState<TodoListsType[]>([
        {id: todoListsID1, title: "Whats to learn", filter: "All"},
        {id: todoListsID2, title: "Whats to buy", filter: "All"},

    ])

    let [tasks, setTasks] = useState({
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
        ],
    });


         const FilterNameButton = (todolistID:string,nameButton:ButtonFilterType)=> {

             SetTodoLists(todoLists.map((el)=>el.id===todolistID ? {...el,filter:nameButton}: el))
        // setFilter(nameButton)
        }



    const removeTask = (todolistID:string,id:string)=> {
         setTasks({...tasks,[todolistID]:tasks[todolistID].filter((el)=>el.id !==id)})
        // let newTask=tasks.filter((el)=>el.id !==id)
        // setTasks(newTask)
    }
    const AddMessage =(todolistID:string,valueInput:string)=> {
        let newTask ={id: v1(), title: valueInput, isDone: true}
        setTasks({...tasks,[todolistID]:[newTask,...tasks[todolistID]]})
        // setTasks([newTask,...tasks])
    }


    const CheckInput=(todolistID:string,idCheck:string,event:boolean)=> {

         // setTasks(tasks.map((el)=>el.id===idCheck ? {...el,isDone:event}:el))
        setTasks({...tasks,[todolistID]:tasks[todolistID].map((el)=>el.id===idCheck ? {...el,isDone:event}:el)})


    }

    const deleteTodolist = (todolistID:string)=> {
             SetTodoLists(todoLists.filter((el)=>el.id!==todolistID))
        delete tasks[todolistID]
    }
    return (
        <div className="App">
            {todoLists.map((el)=>{
                const FilteredTask=()=> {
                    let newTask=tasks[el.id]
                    if(el.filter==='Active'){newTask=tasks[el.id].filter((el)=>el.isDone===false)}
                    if(el.filter==='Completed'){newTask=tasks[el.id].filter((el)=>el.isDone===true)}
                    return newTask
                }
                return(
                    <div>
                        <Todolist
                            todolistID={el.id}
                            key={el.id}
                            title={el.title}
                            task={FilteredTask()}
                            FilterNameButton={FilterNameButton}
                            removeTask={removeTask}
                            AddMessage={AddMessage}
                            filter={el.filter}
                            onChangeCheckInput={CheckInput}
                            deleteTodolist={deleteTodolist}/>
                    </div>
                )
            })}


        </div>
    );
}

export default App;



























//-------------------------------------------------------------------------------------------------------
//
// export type FilterValuesType = "all" | "active" | "completed";
//
// function App() {
//
//     let [tasks, setTasks] = useState([
//         {id: v1(), title: "HTML&CSS", isDone: true},
//         {id: v1(), title: "JS", isDone: true},
//         {id: v1(), title: "ReactJS", isDone: false},
//         {id: v1(), title: "Rest API", isDone: false},
//         {id: v1(), title: "GraphQL", isDone: false},
//     ]);
//
//     function removeTask(id: string) {
//         let filteredTasks = tasks.filter(t => t.id != id);
//         setTasks(filteredTasks);
//     }
//
//     function addTask(title: string) {
//         let task = {id: v1(), title: title, isDone: false};
//         let newTasks = [task, ...tasks];
//         setTasks(newTasks);
//     }
//
//     let [filter, setFilter] = useState<FilterValuesType>("all");
//
//     let tasksForTodolist = tasks;
//
//     if (filter === "active") {
//         tasksForTodolist = tasks.filter(t => t.isDone === false);
//     }
//     if (filter === "completed") {
//         tasksForTodolist = tasks.filter(t => t.isDone === true);
//     }
//
//     function changeFilter(value: FilterValuesType) {
//         setFilter(value);
//     }
//
//
//     return (
//         <div className="App">
//             <Todolist title="What to learn"
//                       tasks={tasksForTodolist}
//                       removeTask={removeTask}
//                       changeFilter={changeFilter}
//                       addTask={addTask}>
//                 <div>
//                     <div>Many intresting information</div>
//                     <div>Many intresting information</div>
//                     <div>Many intresting information</div>
//                     <div>Many intresting information</div>
//                     <div>Many intresting information</div>
//                 </div>
//             </Todolist>
//
//             <Todolist title="What to learn"
//                       tasks={tasksForTodolist}
//                       removeTask={removeTask}
//                       changeFilter={changeFilter}
//                       addTask={addTask}>
//                 <div>
//                     <div>A lot of boring information</div>
//                     <div>A lot of boring information</div>
//                     <div>A lot of boring information</div>
//                     <input placeholder={'A lot of boring information'}/>
//                     <div>
//                         <button>Boring Button 1</button>
//                         <button>Boring Button 2</button>
//                         <button>Boring Button 3</button>
//                     </div>
//                 </div>
//             </Todolist>
//
//             <Todolist title="What to learn"
//                       tasks={tasksForTodolist}
//                       removeTask={removeTask}
//                       changeFilter={changeFilter}
//                       addTask={addTask}/>
//         </div>
//     );
// }
//
// export default App;