import React from 'react';
import {FilterValueType} from "./App";
import s from  "./Todolist.module.css"
import {SuperInput} from "./Components/SuperInput";
import {EnableSpan} from "./Components/EnableSpan";

type TodolistType = {
    todolistID:string
    title:string;
    task:TaskType[]
    removeTask:(todolistID:string,taskId:string)=>void
    filteredTask:(todolistID:string,nameButton:FilterValueType)=>void
    AddMessage:(todolistID:string,value:string)=>void
    changeStatus:(todolistID:string,id:string,e:boolean)=>void
    Filter:FilterValueType
    deleteTodolist:(todolistID:string)=>void
    changeTitleSpan:(todolistID:string,taskId:string,e:string)=>void
}

 export  type TaskType= {
    id:string;
    title:string;
    isDone:boolean
}






export  const Todolist:React.FC<TodolistType> = ({ todolistID,task,
                                                     title,
                                                     removeTask,filteredTask,
                                                     AddMessage, changeStatus,
                                                     Filter,deleteTodolist,
                                                     changeTitleSpan,
                                                     ...props}) => {


    const onClickHandlerRemoveTask = (todolistID:string,taskId:string)=> {
        removeTask(todolistID,taskId)
    }

    const onclickFilter = (todolistID:string,nameButton:FilterValueType)=> {
       filteredTask(todolistID,nameButton)
  }



     const onclickHandlerStatusInput = (todolistID:string,id:string,e:boolean)=> {
       changeStatus(todolistID,id,e)
}

     const DeleteTodolist = (todolistID:string)=> {
        deleteTodolist(todolistID)
      }

      const AddMessageFunction = (value:string)=> {
        AddMessage(todolistID,value)

      }


    return (
        <div>
            <h3>{title}
                <button onClick={()=>DeleteTodolist(todolistID)}>X</button>
            </h3>

               <SuperInput  AddMessage={AddMessageFunction}/>
           <ul>{task.map((el)=>{
               const ChangeTitleSpan = (e:string)=> {
                   changeTitleSpan(todolistID,el.id,e)
               }
               return( <li key={el.id}  className={el.isDone ? s.Completed : ''}>
                  <EnableSpan  titleSpan={ChangeTitleSpan}  title={el.title}/>
                   <input  onChange={(e)=>onclickHandlerStatusInput(todolistID,el.id,e.currentTarget.checked)} type={"checkbox"} checked={el.isDone}/>
                   <button onClick={()=>onClickHandlerRemoveTask(todolistID,el.id)}>X</button>
               </li>)
               })

           }

           </ul>

            <button  className={Filter==='All' ? s.active: ''} onClick={()=>onclickFilter(todolistID,'All')}>All</button>
            <button className={Filter==='Active' ? s.active: ''} onClick={()=>onclickFilter(todolistID,'Active')}>Active</button>
            <button className={Filter==='Completed' ? s.active: ''} onClick={()=>onclickFilter(todolistID,'Completed')}>Completed</button>
        </div>
    );

};

