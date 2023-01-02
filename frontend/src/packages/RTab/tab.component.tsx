import React, {Component, useState} from 'react';
import './tab.component.scss';
import TabHeaderComponent from './components/tab-header/tab-header.component';
import {ITabProps} from './components/types/tab';


const TabComponent = (props : ITabProps)=> {


    const [selectedTab, setSelectedTab] = useState(0)

        return (
            <div className="tab-wrapper px-20">
                <ul className="tab-wrapper__header">
                    {
                        props.title.map((item: any,index) => (
                          <TabHeaderComponent key={index} title={item.title} activeNumber={selectedTab} index={index} setSelectedTab={setSelectedTab}/>
                        ))}
                </ul>
                {props.children[selectedTab]}
            </div>
        );
}

export default TabComponent;
