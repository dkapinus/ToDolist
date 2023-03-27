import React from 'react';
import './App.css';
import {v1} from 'uuid';
import {SuperInput} from "./Components/SuperInput";
import {
    ADDTodolistTaskAC,

} from "./store/tasks-reducer";
import {
    ADDTodolistAC,

} from "./store/todolists-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./store/store";
import {TodolistWithRedux} from "./TodolistWithRedux";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Unstable_Grid2";
import {Paper} from "@mui/material";
import {ButtonAppBar} from "./Components/ButtonAppBar";



export type FilterValuesType = "all" | "active" | "completed";

export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}


export function AppWithRedux() {


    const todolists = useSelector<AppRootStateType, TodolistType[]>(state => state.todolists)


    const dispatch = useDispatch()


    const AddTodolist = (valueInput: string) => {
        let todolistId3 = v1();
        let newTitle: TodolistType = {id: todolistId3, title: valueInput, filter: 'all'}

        dispatch(ADDTodolistAC(newTitle))
        dispatch(ADDTodolistTaskAC(todolistId3))

    }


    return (
        <div >

            <ButtonAppBar/>
            <Container maxWidth="md" fixed>
                <Grid container>
                    <SuperInput addMessage={AddTodolist}/>
                </Grid>
                <Grid container gap={1}  >

                    {todolists.map((el) => {

                        return  (
                            <Paper style={{padding:'5px'}}>
                                <TodolistWithRedux
                                    todolist={el}
                                />
                            </Paper>


                        )

                    })
                    }
                </Grid>



            </Container>
        </div>
    );
}



