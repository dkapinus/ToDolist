import React,{useState} from 'react';
import './App.css';
import {v1} from 'uuid'
import {Todolist} from "./Todolist";

export type ButtonFilterType ='All'|'Active'|'Completed'



function App() {

    let [tasks, setTasks] = useState([
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false},
        ])

   let [filter,setFilter]=useState<ButtonFilterType>('All')

         const FilterNameButton = (nameButton:ButtonFilterType)=> {
        setFilter(nameButton)
        }

    const FilteredTask=()=> {
        let newTask=tasks
        if(filter==='Active'){newTask=tasks.filter((el)=>el.isDone===false)}
        if(filter==='Completed'){newTask=tasks.filter((el)=>el.isDone===true)}
        return newTask
    }

    const removeTask = (id:string)=> {

        let newTask=tasks.filter((el)=>el.id !==id)
        setTasks(newTask)
    }
    const AddMessage =(valueInput:string)=> {
        let newTask ={id: v1(), title: valueInput, isDone: true}
        setTasks([newTask,...tasks])
    }


    const CheckInput=(idCheck:string,event:boolean)=> {

         setTasks(tasks.map((el)=>el.id===idCheck ? {...el,isDone:event}:el))


    }
    return (
        <div className="App">
          <Todolist

                    name={'What to learn'}
                    task={FilteredTask()}
                    FilterNameButton={FilterNameButton}
                    removeTask={removeTask}
                    AddMessage={AddMessage}
                    filter={filter}
                    onChangeCheckInput={CheckInput}/>

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