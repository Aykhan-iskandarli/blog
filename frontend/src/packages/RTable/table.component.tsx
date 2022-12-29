import React, {Component} from 'react';
import './table.component.scss'
import TableHeadComponent from "./components/table-head/table-head.component";
import TableBodyComponent from "./components/table-body/table-body.component";
import TableFootComponent from "./components/table-foot/table-foot.component";


class TableComponent extends Component<any, any> {
    public static Head: any = TableHeadComponent
    public static Body: any = TableBodyComponent
    public static Foot: any = TableFootComponent


    render() {
        const {children} = this.props;
        let head : any;
        let body: any;
        let foot: any;
        React.Children.map(children, (child: any) => {
            if (child.type){
                switch (child.type.displayName){
                    case 'Head' :
                        head = child;
                        break;
                    case 'Body' :
                        body = child
                        break;
                    case 'Foot' :
                        foot = child
                        break;
                }
            }
        })

        return (
            <table className="table-section">
                <thead className="table-section__thead">
                {head && head.props ? head.props.children : null}
                </thead>
                <tbody className="table-section__tbody">
                {body && body.props ? body.props.children : null}
                </tbody>
                <tfoot className="table-section__tfoot">
                {foot && foot.props ? foot.props.children : null}
                </tfoot>
            </table>

        );
    }
}

export default TableComponent;
