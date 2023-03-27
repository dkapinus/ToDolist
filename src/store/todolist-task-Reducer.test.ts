
import {v1} from "uuid";
import {TaskTypeKey, TodolistType} from "../App";
import {ADDTodolistAC, todolistsReducer} from "./todolists-reducer";
import {ADDTodolistTaskAC, tasksReducer} from "./tasks-reducer";



test('ids should be equals', () => {
    const startTasksState: TaskTypeKey = {}
    const startTodolistsState: Array<TodolistType > = []

    let todolistId3 = v1()
    const actionn = ADDTodolistAC( {id: todolistId3, title: 'bla', filter: "all"})
    const action=ADDTodolistTaskAC(todolistId3)

    const endTasksState = tasksReducer(startTasksState, action)
    const endTodolistsState = todolistsReducer(startTodolistsState, actionn)

    const keys = Object.keys(endTasksState)
    const idFromTasks = keys[0]
    const idFromTodolists = endTodolistsState[0].id

    expect(idFromTasks).toBe(action.payload.todolistId3)
    expect(idFromTodolists).toBe(actionn.payload.newTitle.id)
})
