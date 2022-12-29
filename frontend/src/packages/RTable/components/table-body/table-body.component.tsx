import React, {Component} from 'react';

class TableBodyComponent extends Component {
    static displayName = 'Body'
    render() {
        return (
            <>
            {this.props.children}
            </>
        );
    }
}

export default TableBodyComponent;
