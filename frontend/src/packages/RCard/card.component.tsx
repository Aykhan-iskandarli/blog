import './card.component.scss';
import { ICardProps } from './types';

const CardComponent = (props : ICardProps)=>{
        return (
            <div className={`card ${props.className}`}>
                {props.children}
            </div>
        );
}

export default CardComponent;
