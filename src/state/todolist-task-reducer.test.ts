import {TaskKeyType, TodolistType} from "../AppWithReducer";
import {addTodolistAC, removeTodolistAC, todoReducer} from "./todoReducer";
import {taskReducer} from "./taskReducer";

test('ids should be equals', () => {
    const startTasksState: TaskKeyType = {}
    const startTodolistsState: TodolistType[] = []

    const action = addTodolistAC('new todolist')

    const endTasksState = taskReducer(startTasksState, action)
    const endTodolistsState = todoReducer(startTodolistsState, action)

    const keys = Object.keys(endTasksState)
    const idFromTasks = keys[0]
    const idFromTodolists = endTodolistsState[0].id

    expect(idFromTasks).toBe(action.payload.todolistId)
    expect(idFromTodolists).toBe(action.payload.todolistId)
})

test('property with todolistId should be deleted', () => {
    const startState: TaskKeyType = {
        'todolistId1': [
            {id: '1', title: 'CSS', isDone: false},
            {id: '2', title: 'JS', isDone: true},
            {id: '3', title: 'React', isDone: false}
        ],
        'todolistId2': [
            {id: '1', title: 'bread', isDone: false},
            {id: '2', title: 'milk', isDone: true},
            {id: '3', title: 'tea', isDone: false}
        ]
    }

    const action = removeTodolistAC('todolistId2')

    const endState = taskReducer(startState, action)


    const keys = Object.keys(endState)

    expect(keys.length).toBe(1)
    expect(endState['todolistId2']).not.toBeDefined()
})

