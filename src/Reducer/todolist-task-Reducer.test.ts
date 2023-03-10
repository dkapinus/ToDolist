import {TaskStateType, TodolistType} from "../App";
import {v1} from "uuid";
import {addTodolistTypeAC, TodoReducer} from "./TodoReducer";
import {ADDTodolistTypeAC, TaskReducer} from "./TaskReducer";

test('ids should be equals', () => {
    const startTasksState: TaskStateType = {}
    const startTodolistsState: Array<TodolistType> = []

    let todolistId3 = v1()
    const actionn = addTodolistTypeAC( {id: todolistId3, title: 'bla', filter: "All"})
    const action=ADDTodolistTypeAC(todolistId3)

    const endTasksState = TaskReducer(startTasksState, action)
    const endTodolistsState = TodoReducer(startTodolistsState, actionn)

    const keys = Object.keys(endTasksState)
    const idFromTasks = keys[0]
    const idFromTodolists = endTodolistsState[0].id

    expect(idFromTasks).toBe(action.payload.todolistId3)
    expect(idFromTodolists).toBe(actionn.payload.newTodolist.id)
})
