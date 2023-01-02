import React, {Component} from 'react';
import './tab-header.component.scss';
import {ITabHeadProps} from "../types/tab";


const TabHeaderComponent = (props : ITabHeadProps)=> {

    const click = () => {
        props.setSelectedTab(props.index)
    }

        return (
            <li className={`tab-header p-20 ${props.activeNumber === props.index ? 'active' : ''}`} onClick={click}>
                {props.title}
            </li>
        );
}

export default TabHeaderComponent;
