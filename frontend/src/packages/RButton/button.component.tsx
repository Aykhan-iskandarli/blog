import React from 'react';
import { IButtonProps } from './types/button';
const ButtonComponent = ({ type, size, color, click, className, width, outline, rounded, disabled, children, circle} : IButtonProps) =>{
        return (
            <button type={type || 'button'}
                    onClick={click}
                    style={width ? { width : width+'px'} : {}}
                    className={
                        `btn
                         btn--${color || 'primary'}
                         btn--size-${size || 'md'}
                         ${outline ? `btn--outline btn--outline-${color}` : ''}
                         ${rounded ? ' btn--rounded' : ''}
                         ${circle ? ' btn--rounded-circle' : ''}
                         ${className}  `}
                    disabled={disabled || false}
            >
                {children}
            </button>
        );
}

export default ButtonComponent
