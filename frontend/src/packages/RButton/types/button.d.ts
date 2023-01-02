import React from "react";

export interface IButtonProps {
    click? :function,
    color? : String,
    rounded? : Boolean,
    circle? : Boolean,
    size? : String,
    type? : 'button' | 'reset' | 'submit',
    outline? : Boolean,
    className? : String,
    disabled? : boolean,
    width? : number,
    children? : React.ReactNode
}
