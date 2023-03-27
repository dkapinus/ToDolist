import React from 'react';
import {FilterValuesType} from "./App";
import {SuperInput} from "./Components/SuperInput";
import {EnableSpan} from "./Components/EnableSpan";


type TodolistType = {
    todolistId: string
    name: string
    task: TaskType[]
    buttonFilter: (todolistId: string,nameButton: FilterValuesType) => void
    removeTask: (todolistId: string, taskID: string) => void
    addMessage: (todolistId: string, valueInput: string) => void
    changeCheckedInput: (todolistId: string, taskId: string, status: boolean) => void
    filter: FilterValuesType
    changeInputTitle: (todolistId: string, taskId: string, newTitle: string) => void
    changeTodolistTitle: (todolistId: string, newTitle: string) => void
    deleteTodolist: (todolistId: string) => void

}

export type TaskType = {
    id: string,
    title: string,
    isDone: boolean
}


export const Todolist: React.FC<TodolistType> = ({
                                                     todolistId,
                                                     name, task,
                                                     buttonFilter, removeTask,
                                                     addMessage, changeCheckedInput,
                                                     changeInputTitle, changeTodolistTitle,
                                                     deleteTodolist,
                                                     filter,

                                                     ...props
                                                 }) => {


    const onClickHandlerButtonFilter = ( nameButton: FilterValuesType) => {
        buttonFilter(todolistId, nameButton)
    }

    const RemoveTask = (taskID: string) => {
        removeTask(todolistId, taskID)
    }

    const onChangeCheckedInput = (taskId: string, status: boolean) => {
        changeCheckedInput(todolistId, taskId, status)
    }

    const AddMessage = (valueInput: string) => {
        addMessage(todolistId, valueInput)
    }

    const ChangeTodolistTitle = (newTitle: string) => {
        changeTodolistTitle(todolistId, newTitle)

    }

    const DeleteTodolist = () => {
        deleteTodolist(todolistId)
    }
    return (
        <div>
            <h3><EnableSpan title={name} changeInputTitle={ChangeTodolistTitle}/>
                <button onClick={DeleteTodolist}>Delete</button>
            </h3>

            <SuperInput addMessage={AddMessage}/>
            <ul>
                {task.map((el) => {
                    const ChangeInputTitle = (newTitle: string) => {
                        changeInputTitle(todolistId, el.id, newTitle)

                    }
                    return (
                        <li key={el.id} className={el.isDone ? 'is-done' : ''}>
                            <EnableSpan title={el.title}  changeInputTitle={ChangeInputTitle}/>

                            <input type={'checkbox'} checked={el.isDone}
                                   onChange={(e) => onChangeCheckedInput(el.id, e.currentTarget.checked)}/>
                            <button onClick={() => RemoveTask(el.id)}>X</button>
                        </li>

                    )
                })}
            </ul>

            <button className={filter === 'all' ? 'active-filter' : ''}
                    onClick={() => onClickHandlerButtonFilter('all')}>All
            </button>
            <button className={filter === 'active' ? 'active-filter' : ''}
                    onClick={() => onClickHandlerButtonFilter('active')}>Active
            </button>
            <button className={filter === 'completed' ? 'active-filter' : ''}
                    onClick={() => onClickHandlerButtonFilter('completed')}>Completed
            </button>
        </div>
    );
};




