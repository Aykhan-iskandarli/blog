import { Component } from 'react'
import { IProps } from '../types/modal'

class ModalBody extends Component<IProps>{
    render() {
        return (
            <div className='modal__body' >
                {this.props.children}
            </div>
        )
    }
}

export default ModalBody
