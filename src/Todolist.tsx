import React, {ChangeEvent} from 'react';
import {FilterValuesType} from "./App";
import s from './Todolist.module.css'
import {Input} from "./Components/Input";
import {EditableSpan} from "./Components/EditableSpan";


export type TaskTypeArray = {
    id:string;
    title:string;
    isDone:boolean
}

type TaskType = {
    id:string
    title:string
    task:TaskTypeArray[]
    FilterTask:(todolistId:string,nameButton:FilterValuesType)=>void
    removeTask:(todolistId:string,taskId:string)=>void
    changeStatus:(todolistId:string,id:string,e:boolean)=>void
    addMessage:(todolistId:string,valueInput:string)=>void
    filter:FilterValuesType
    deleteTodolist:(todolistId:string)=>void
    changeSpanTask:(todolistId:string,id:string,e:string)=>void
    changeSpanTodolist:(todolistId:string,e:string)=>void
}



export  const Todolist:React.FC<TaskType> = ({id,title,task,
                                                 FilterTask,removeTask,changeStatus,addMessage,filter, deleteTodolist,changeSpanTask,changeSpanTodolist,...props}) => {

const onClickFilter= (nameButton:FilterValuesType)=>{
    FilterTask(id,nameButton)
}



    const ChangeStatus = (taskId:string,e:boolean)=> {
        changeStatus(id,taskId,e)

    }
        const AddNameTitle = (valueInput:string)=> {
            addMessage(id,valueInput)
       }


      const DeleteTodolist = ()=> {
    deleteTodolist(id)
      }

    const DeleteTask = (taskId:string)=> {
        removeTask(id,taskId)
    }
    const ChangeSpanTodolist = (e:string)=>{
        changeSpanTodolist(id,e)
    }

    return (
        <div>
            <h3><EditableSpan title={title} ChangeSpan={ChangeSpanTodolist}/>
                <button onClick={DeleteTodolist}>DeleteTODOLIST</button>
            </h3>
          <Input addMessage={AddNameTitle}/>

            <ul>
                {task.map((el)=>{
                    const ChangeSpan=(e:string)=> {
                        changeSpanTask(id,el.id,e)
                    }
                    return (
                        <li key={el.id}>
                            <EditableSpan title={el.title} ChangeSpan={ChangeSpan}/>
                            <input className={el.isDone ? s.active_task :''} type={'checkbox'} onChange={(e:ChangeEvent<HTMLInputElement>)=>ChangeStatus(el.id,e.currentTarget.checked)} checked={el.isDone}/>
                            <button onClick={()=>DeleteTask(el.id)}>X</button>
                        </li>
                    )
                })}
            </ul>
            <button className={filter==='all'? s.active_Button:''} onClick={()=>onClickFilter('all')}>All</button>
            <button className={filter==='active'? s.active_Button:''} onClick={()=>onClickFilter('active')}>Active</button>
            <button className={filter==='completed'? s.active_Button:''} onClick={()=>onClickFilter('completed')}>Completed</button>
        </div>
    );
};

