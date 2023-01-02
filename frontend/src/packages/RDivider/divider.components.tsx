import './divider.component.scss'
import { IDividerProps } from './types/divider'
const DividerComponent = (props:IDividerProps) => {
  return (
         <div className={`divider ${props.className}`} style={props.styles}></div>
  )
}

export default DividerComponent