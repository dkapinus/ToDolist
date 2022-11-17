import React from 'react';


type PropsType = {
    title: string
    tasks: Array<TaskType>
    callback:(id:number)=>void;
    callbackButton:(nameButton:string)=>void

}

type TaskType = {
    id: number
    title: string
    isDone: boolean
}

export function Todolist(props: PropsType) {




    const onClickHandler = (nameButton:string)=> {
        props.callbackButton(nameButton)
    }

    return <div>
        <h3>{props.title}</h3>
        <div>
            <input/>
            <button>+</button>
        </div>

        <ul> {props.tasks.map((el) => {
            return (
                <div key={el.id}>
                    <li>
                        <input type="checkbox" checked={el.isDone}/>
                        <span>{el.title}</span>
                        <button onClick={(callback) => props.callback(el.id)}>X</button>
                    </li>

                </div>
            )
        })


        }</ul>
        <div>
            <button onClick={()=>onClickHandler('All')}>All</button>
            <button onClick={()=>onClickHandler('Active')}>Active</button>
            <button onClick={()=>onClickHandler('Completed')}>Completed</button>
        </div>
    </div>
}
