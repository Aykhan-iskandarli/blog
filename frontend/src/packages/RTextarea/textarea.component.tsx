import React from 'react'
import { TextAreaProps } from './types/textarea'

const TextAreaComponent = (props:TextAreaProps) => {
  return (
    <div className="input-div">
    {
      props.label && <label>{props.label}</label>
    }
      <textarea
        className={`form-control ${props.className}`}
        name={props.name}
        value={props.value}
        onChange={props.onChange}
        placeholder={props.placeholder}
    />
    {props.children}
    {
      props.error && <div className="error-text">
        {props.error}
      </div>
    }
  </div>
  )
}

export default TextAreaComponent