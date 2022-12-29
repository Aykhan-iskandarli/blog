import React, {Component} from 'react';

class TableHeadComponent extends Component {
    static displayName = 'Head'
    render() {
        return (
            <>
            {this.props.children}
            </>
        );
    }
}

export default TableHeadComponent;
