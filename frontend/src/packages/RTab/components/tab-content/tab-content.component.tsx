import React, { ComponentProps} from 'react';
import './tab-content.component..scss';

const TabContentComponent = (props : ComponentProps<any>) =>{
        return (
            <div className="tab-content px-16 py-20">
                {props.children}
            </div>
        );
}

export default TabContentComponent;
