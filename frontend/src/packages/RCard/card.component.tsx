import React from 'react';
import './card.component.scss';
import { ICardProps } from './card.types';

const CardComponent = ({ theme = 'light', children, className = '', click } : ICardProps)=>{
        return (
            <div className={`card card--${theme} ${className}`} onClick={click}>
                {children}
            </div>
        );
}

export default CardComponent;
