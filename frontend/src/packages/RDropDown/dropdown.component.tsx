import React, { useEffect, useRef, useState, FC} from 'react';
import './dropdown.component.scss';

interface DropDownType {
    isImageValid?: boolean,
    image?: string,
    selectedItem?: string
}


const DropdownComponent: FC<DropDownType> =({children,image,isImageValid,selectedItem})=> {


    const [showItem, setShowItem] = useState(false)

    const dropDown : any = useRef();


    const clickEvent = () => {
        setShowItem((prevState) => !prevState)
    }

    const clickOutside = (event: any) => {
        if (dropDown.current && !dropDown.current.contains(event.target)) {
            setShowItem(false)
        }
    }

    useEffect(()=>{
        document.addEventListener('mousedown', clickOutside);

        return ()=>{
            document.removeEventListener('mousedown', clickOutside);
        }
    }, [])

        return (
            <div className='dropdown' ref={dropDown}>
                <button type='button' className='dropdown__button' onClick={clickEvent}>
                    {isImageValid ? <img src={image} alt=""/> : selectedItem}
                </button>
                {
                    showItem && (
                        <div className='dropdown__items'>
                            {children}
                            {/*<ul className='dropdown__items-list'>*/}
                            {/*    {*/}
                            {/*        props.text-area.map((item: any, index: number) => {*/}
                            {/*            return <li onClick={() => props.itemClick(item)} key={index}>{item}</li>*/}
                            {/*        })*/}
                            {/*    }*/}
                            {/*</ul>*/}
                        </div>
                    )
                }
            </div>
        );
}

export default DropdownComponent;
