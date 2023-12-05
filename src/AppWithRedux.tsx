import React, {useEffect} from 'react';
import './App.css';
import {Login} from "./Components/Login/Login";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import {Todolists} from "./Todolists";
import {SetLoginStatusTC} from "./Components/Login/auth-Reducer";
import {AppRootStateType, useAppDispatch} from "./state/store";
import CircularProgress from "@mui/material/CircularProgress";
import {useSelector} from "react-redux";


function AppWithReducer() {








    const isInitialized =useSelector<AppRootStateType,boolean>(state => state.app.isInitialized)

    const dispatch =useAppDispatch()

    useEffect(() => {

        dispatch(SetLoginStatusTC())
    }, [dispatch])




    if (!isInitialized) {

        return <div
            style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
            <CircularProgress/>
        </div>
    }

    return (
        <div>

            <BrowserRouter>
                                <Routes>
                                    <Route path={"/"} element={<Todolists/>}/>
                                    <Route path={"/login"} element={<Login/>}/>
                                    <Route path={"/404"} element={<h1>{'404 Page not founded'}</h1>}/>
                                    <Route path={'/*'} element={<Navigate to={"/404"}/>} />
                                </Routes>
                </BrowserRouter>


        </div>
    );
}

export default AppWithReducer;
