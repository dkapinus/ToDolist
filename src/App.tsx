import React,{useState} from 'react';
import './App.css';
import {ToDolist} from "./ToDolist";
import {v1} from 'uuid'

function App() {
  let [tasks, setTasks] = useState([
    {id: v1(), title: "HTML&CSS", isDone: true},
    {id: v1(), title: "JS", isDone: true},
    {id: v1(), title: "ReactJS", isDone: false},
    {id: v1(), title: "Rest API", isDone: false},
    {id: v1(), title: "GraphQL", isDone: false},
  ]);

  const addMessage = (valueInput:string)=> {
    let newTasks ={id: v1(), title: valueInput, isDone: true}
    setTasks([newTasks,...tasks])
  }

const deleteButton = (id:string)=> {

  let deleteButton=tasks.filter((el)=>el.id !==id)
  setTasks(deleteButton)
}

let [NameButton,setNameButton]=useState('All')

const addNameButton = (nameButton:string)=> {
  setNameButton(nameButton)
}

const FilteredTasks = ()=> {
  let filtered=tasks
  if(NameButton==='Active')(filtered=tasks.filter((el)=>el.isDone ===true))
  if(NameButton==='Completed')(filtered=tasks.filter((el)=>el.isDone===false))
  return filtered
}






  return (
    <div className="App">
    <ToDolist title={'What to learn'}  task={FilteredTasks()} deleteButton={deleteButton} addNameButton={addNameButton}
              addMessage={addMessage}/>
    </div>
  );
}

export default App;
