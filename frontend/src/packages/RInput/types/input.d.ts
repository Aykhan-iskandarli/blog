import React from "react";

export interface InputProps {
  onChange?: function;
  color?: string;
  name?: string;
  value?: string;
  label?: string;
  error?: string;
  placeholder?: string;
  size?: string;
  type?: "text" | "email" | "password" | "checkbox" | "file";
  className?: string;
  disabled?: boolean;
  children?: React.ReactNode,
  inputCont?: String,
  show?: function,
  close?: function,
  onKeyDown?:function,
  maxLength?:number,
  accept?:any
}
