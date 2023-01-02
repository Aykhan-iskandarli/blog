import React, { Component, ComponentProps, useEffect, useRef, useState } from 'react';
import './dropdown.component.scss';
import { DropDownState } from './types/drop-down';

const DropdownComponent = (props: ComponentProps<any>) => {


    const [showItem, setShowItem] = useState(false)

    const dropDown: any = useRef();


    const clickEvent = () => {
        setShowItem((prevState) => !prevState)
    }

    const clickOutside = (event: any) => {
        if (dropDown.current && !dropDown.current.contains(event.target)) {
            setShowItem(false)
        }
    }

    useEffect(() => {
        document.addEventListener('mousedown', clickOutside);

        return () => {
            document.removeEventListener('mousedown', clickOutside);
        }
    }, [])

    return (
        <div className='dropdown' ref={dropDown}>
            <button type='button' className='dropdown__button' onClick={clickEvent}>{props.children}</button>
            {
                showItem && (
                    <div className='dropdown__items'>
                        <ul className='dropdown__items-list'>
                            {
                                props.text.map((item: any) => {
                                    return <li onClick={() => props.itemClick(item.label)} key={item.key}>{item.value}</li>
                                })
                            }
                        </ul>
                    </div>
                )
            }
        </div>
    );
}

export default DropdownComponent;
