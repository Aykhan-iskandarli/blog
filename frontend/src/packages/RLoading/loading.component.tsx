import React, {Component} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {ILoadingProps} from './types/loading';
const LoadingComponent = (props : ILoadingProps)=> {
        return (
            <div className={`loading-container`}>
               <div className="lds-ripple"><div></div><div></div></div>
            </div>
        );
}

export default LoadingComponent;

