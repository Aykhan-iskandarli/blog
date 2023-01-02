import React, {Component} from 'react';
import {Link,withRouter} from 'react-router-dom';
import './breadcrumb.component.scss';
import {IBreadcrumbProps} from "./types/breadcrumb";

const BreadcrumbComponent = ({location} : IBreadcrumbProps)=> {

        const pathnames = location.pathname.split("/").filter((item: any,index:any) => item);
        const t = pathnames.slice(1,2)
        return (
            <div className="breadcrumb">
                {
                    t.map((name: any, index: any) => {
                        const routeTo = `/app/${t.slice(0, index + 1).join("/")}`;
                        const islast = index === pathnames.length - 1;
                        return islast ? (
                            <div key={index}>
                                {name}
                            </div>
                        ): (
                            <div key={index}>
                                <Link to={`${routeTo}`}>{`${name.toUpperCase()} `}</Link>
                            </div>
                        )
                    })
                }
            </div>
        );
}

export default withRouter(BreadcrumbComponent);
