import React, {Component} from 'react';

class TableFootComponent extends Component {
    static displayName = 'Foot'
    render() {
        return (
            <>
            {this.props.children}
            </>
        );
    }
}

export default TableFootComponent;
