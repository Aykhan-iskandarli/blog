import {SyntheticEvent, useEffect} from 'react';
import { IModalProps } from './types/modal';
import './modal.component.scss';
// import modalCloseSquare from '../../assets/images/modal-x-square.svg'
import LoadingComponent from '../RLoading/loading.component';
const ModalComponent =(props : IModalProps)=> {

    useEffect(()=>{

    }, [props.loading])

        return (
            <>
                <div className={`modal fade ${props.show ? 'show' : ''} `}>
                    <div className='modal-overlay' onClick={() => {
                        props.setShow(false)
                        document.body.style.overflow = 'auto'
                    }}>
                        <div onClick={(e: SyntheticEvent)=>e.stopPropagation()} className={`modal--${props.size} ${props.classes || ''} modal__dialog modal__dialog--${props.position}`}>
                            <div className='modal__content'>
                                {props.loading ? <LoadingComponent scoped={true}/> : null}
                                {!props.hideHeader &&
                                    <div className='modal__header'>
                                        <h5 className={`modal__title ${props.header}`}>{props.title}</h5>
                                        <button
                                            onClick={() => {
                                                props.setShow(false)
                                                document.body.style.overflow = 'auto'
                                            }
                                            }
                                            type='button'
                                            className='modal__close'
                                        >
                                            {
                                                props.closeIcon ?
                                                    props.closeIcon
                                                    :
                                                    null
                                            }
                                        </button>
                                    </div>
                                }
                                {props.children}
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
};

export default ModalComponent;
