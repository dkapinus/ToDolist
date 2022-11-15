import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';

function App() {

    let [ tasks1, setTask] =useState([
            { id: 1, title: "HTML&CSS", isDone: true },
            { id: 2, title: "JS", isDone: true },
            { id: 3, title: "ReactJS", isDone: false }
        ]
    )
    const removeTsk = (id:number)=> {
        tasks1=tasks1.filter((el)=>el.id!==id)
        setTask(tasks1)
    }


let [nameButton,setButton]=useState('All')

    if(nameButton==='Active'){ tasks1=tasks1.filter((el)=>el.isDone===true)}
    if(nameButton==='Completed'){ tasks1=tasks1.filter((el)=>el.isDone===false)}


    const  callbackButton = (nameButton:string)=> {

       setButton(nameButton)

    }
    return (
        <div className="App">
            <Todolist title="What to learn" tasks={tasks1} callback={removeTsk} callbackButton={callbackButton} />

        </div>
    );
}

export default App;
