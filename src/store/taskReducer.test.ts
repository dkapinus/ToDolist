import {v1} from "uuid";
import {
    addTaskTypeAC,
    ADDTodolistTaskAC,
    ChangeCheckedInputTypeAC,
    ChangeInputTitleAC,
    removeTaskAC,
    tasksReducer
} from "./tasks-reducer";
import {TaskTypeKey} from "../App";
import {RemoveTodolistAC} from "./todolists-reducer";



test('correct task should be deleted from correct array', () => {
    const startState:  TaskTypeKey= {
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

    const action =removeTaskAC('todolistId2','2' )

    const endState = tasksReducer(startState, action)

    expect(endState).toEqual({
        'todolistId1': [
            {id: '1', title: 'CSS', isDone: false},
            {id: '2', title: 'JS', isDone: true},
            {id: '3', title: 'React', isDone: false}
        ],
        'todolistId2': [
            {id: '1', title: 'bread', isDone: false},
            {id: '3', title: 'tea', isDone: false}
        ]
    })
})
test('correct task should be added to correct array', () => {

    const startState: TaskTypeKey  = {
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

    const action = addTaskTypeAC('todolistId2',   'jucie')

    const endState = tasksReducer(startState, action)

    expect(endState['todolistId1'].length).toBe(3)
    expect(endState['todolistId2'].length).toBe(4)
    expect(endState['todolistId2'][0].id).toBeDefined()
    expect(endState['todolistId2'][0].title).toBe('jucie')
    expect(endState['todolistId2'][0].isDone).toBe(true)
})

test('status of specified task should be changed', () => {
    const startState: TaskTypeKey  = {
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

    const action = ChangeCheckedInputTypeAC('todolistId2', '2',false )

    const endState = tasksReducer(startState, action)

    expect(endState['todolistId2'][1].isDone).toBe(false)

})

test('status of changed title', () => {
    const startState: TaskTypeKey = {
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

    const action = ChangeInputTitleAC('todolistId2', '2','hi' )

    const endState = tasksReducer(startState, action)

    expect(endState['todolistId2'][1].title).toBe('hi')

})

test('new array should be added when new todolist is added', () => {
    const startState:TaskTypeKey = {
        'todolistId1': [
            {id: '1', title: 'CSS', isDone: false},
            {id: '2', title: 'JS', isDone: true},
            {id: '3', title: 'React', isDone: false}
        ],
        'todolistId2': [
            {id: '1', title: 'bread', isDone: false},
            {id: '2', title: 'milk', isDone: true},
            {id: '3', title: 'tea', isDone: false}
        ],
        'fla':[]
    }
    let todolistId3 = v1()
    const action = ADDTodolistTaskAC(  todolistId3)

    const endState = tasksReducer(startState, action)


    const keys = Object.keys(endState)
    const newKey = keys.find(k => k != 'todolistId1' && k != 'todolistId2')
    if (!newKey) {
        throw Error('new key should be added')
    }

    expect(keys.length).toBe(3)
    expect(endState[newKey]).toEqual([])
})
//
// test('property with todolistId should be deleted', () => {
//     const startState: TaskTypeKey = {
//         'todolistId1': [
//             {id: '1', title: 'CSS', isDone: false},
//             {id: '2', title: 'JS', isDone: true},
//             {id: '3', title: 'React', isDone: false}
//         ],
//         'todolistId2': [
//             {id: '1', title: 'bread', isDone: false},
//             {id: '2', title: 'milk', isDone: true},
//             {id: '3', title: 'tea', isDone: false}
//         ]
//     }
//
//     const action = RemoveTodolistAC('todolistId1')
//
//     const endState = tasksReducer(startState, action)
//
//
//     const keys = Object.keys(endState)
//
//     expect(keys.length).toBe(1)
//     expect(endState['todolistId2']).not.toBeUndefined()
// })
