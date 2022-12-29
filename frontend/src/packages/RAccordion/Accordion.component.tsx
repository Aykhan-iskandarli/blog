import './Accordion.component.scss';
import {IAccordion} from "./types/accordion";
import CardComponent from "../RCard/card.component";
import ArrowIcon from '../../assets/images/icons/arrow-down-gray-icon.svg';
import {useState} from "react";

const AccordionComponent = ({logoColor,logoName,name,isEditBtn,editIcon,editText,isDeleteBtn,deleteIcon,deleteText,children}: IAccordion) => {

    const [isDefaultHeight,setIsDefaultHeight] = useState(false)
    const clickAccordion = () => {
      setIsDefaultHeight(!isDefaultHeight)
    }
    
    return (
        <CardComponent>
            <div className={`accordion ${isDefaultHeight ? 'accordion__active' : ''}`}>
                <div className={'accordion__heading'}>
                    <div className="accordion__left">
                        <span className={'accordion__color'} style={{background: "#"+logoColor}}>{logoName}</span>
                        <span className={'accordion__name'}>{name}</span>
                    </div>
                    <div className={'accordion__right'}>
                        {
                            isEditBtn && (
                                <button>
                                    <img src={editIcon} alt=""/>
                                    {editText}
                                </button>
                            )
                        }
                        {
                            isDeleteBtn && (
                                <button>
                                    <img src={deleteIcon} alt=""/>
                                    {deleteText}
                                </button>
                            )
                        }
                        {

                        }
                        <img className={isDefaultHeight ? 'accordion__img' : ''} src={ArrowIcon} alt="" onClick={clickAccordion}/>
                    </div>
                </div>
                <div className="accordion__body">
                    {children}
                </div>
            </div>
        </CardComponent>
    )
}

export default AccordionComponent;