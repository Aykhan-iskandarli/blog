import { Component } from 'react'
import { IProps } from '../types/modal'

class ModalFooter extends Component<IProps>{
    render() {
        return (
            <div className='modal__footer'>
                {this.props.children}
            </div>
        )
    }
}

export default ModalFooter
