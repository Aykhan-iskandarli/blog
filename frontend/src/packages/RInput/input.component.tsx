import React from "react";
import { InputProps } from "./types/input";
import css from "./input.module.scss";

const InputComponent = (props: InputProps) => {
  return (
    <div className={`${css.input_div} ${props.inputCont}`}>
      {props.label && (
        <div className={css.input_div_label}>
          <label>{props.label}</label>
        </div>
      )}
      <input
        type={props.type}
        className={`${css.form_control} ${props.className}`}
        name={props.name}
        defaultValue={props.value}
        onChange={props.onChange}
        placeholder={props.placeholder}
        onMouseEnter={props.show}
        onKeyDown={props.onKeyDown}
        maxLength={props.maxLength}
        accept={props.accept}
      />
      {props.children}
      {props.error && <div className="error-text">{props.error}</div>}
    </div>
  );
};

export default InputComponent;
