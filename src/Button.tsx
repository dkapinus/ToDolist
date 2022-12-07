import React from 'react';
import s from './Button.module.css';


type ComponentButtonType = {
nameButton:string;
started:()=>void;
active?:boolean;

}


export const Button = (props:ComponentButtonType) => {
    const Started = ()=>{
        props.started()
    }
    return (

   <button className={ props.active  ? s.activeButton:''} onClick={Started}>{props.nameButton}</button>

    );
};

