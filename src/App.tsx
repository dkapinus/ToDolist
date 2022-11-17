import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';

function App() {

    let [tasks1, setTask] = useState([
            {id: 1, title: "HTML&CSS", isDone: true},
            {id: 2, title: "JS", isDone: true},
            {id: 3, title: "ReactJS", isDone: false}
        ]
    )
    const removeTsk = (id: number) => {
        tasks1 = tasks1.filter((el) => el.id !== id)
        setTask(tasks1)
    }

    const [Button, setButton] = useState('All')

    const callBackButton = (nameButton: string) => {
        setButton(nameButton)
    }


    const FilterButton = () => {

        let filtredTask = tasks1
        if (Button === 'Active') {
            filtredTask = tasks1.filter((el) => el.isDone)
        }
        if (Button === 'Completed') {
            filtredTask = tasks1.filter((el) => !el.isDone)
        }
        return filtredTask
    }


    return (
        <div className="App">
            <Todolist title="What to learn" tasks={FilterButton()} callback={removeTsk}
                      callbackButton={callBackButton}/>

        </div>
    );
}

export default App;
