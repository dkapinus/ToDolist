import React from 'react';

type ButtonType = {
    nameButton : string;
    callback:()=>void;
}



export const Button = (props:ButtonType) => {

    const onClickHandler =()=> {
        props.callback()
    }
    return (
       <span>
           <button onClick={onClickHandler}>{props.nameButton}</button>

       </span>
    );
};


