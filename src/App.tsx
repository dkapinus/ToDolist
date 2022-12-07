import React,{useState} from 'react';
import './App.css';
import {v1} from 'uuid'
import {Todolist} from "./Todolist";


export type ButtonType ='All'|'Active'|'Completed'

function App() {
  let [tasks, setTasks] = useState([
    {id: v1(), title: "HTML&CSS", isDone: true},
    {id: v1(), title: "JS", isDone: true},
    {id: v1(), title: "ReactJS", isDone: false},
    {id: v1(), title: "Rest API", isDone: false},
    {id: v1(), title: "GraphQL", isDone: false},
  ]);



const removeTask = (id:string)=> {
let newTask=tasks.filter((el)=>el.id!=id)
  setTasks(newTask)
}

let [nameButton,setNameButton]=useState<ButtonType>('All')

const ChangeFilter = (nameButton:ButtonType)=> {
setNameButton(nameButton)
}

const Filtered = ()=> {
  let filteredTask=tasks
  if(nameButton==='Active'){filteredTask=tasks.filter((el)=>el.isDone===false)}
  if(nameButton==='Completed'){filteredTask=tasks.filter((el)=>el.isDone===true)}
  return filteredTask
}

const AddMessage = (inputValue:string)=> {
  let newTask={id: v1(), title: inputValue, isDone: true}
  setTasks([newTask,...tasks])
}
const InputCheck = (event:boolean,id:string)=> {
  setTasks(tasks.map((el)=>el.id=== id ? {...el,isDone:event}:el))

}
  return (
    <div className="App">
   <Todolist task={Filtered()} name={'What to learn'} removeTask={removeTask}
             ChangeFilter={ChangeFilter}
             addMessage={AddMessage}
             InputCheck={InputCheck}
   Filter={nameButton}/>
    </div>
  );
}

export default App;
