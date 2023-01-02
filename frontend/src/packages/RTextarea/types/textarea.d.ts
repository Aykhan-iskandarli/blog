import React from "react";

export interface TextAreaProps {
  onChange?: function;
  color?: string;
  name?: string;
  value?: string;
  label?: string;
  error?: string;
  placeholder?: string;
  size?: string;
  className?: string;
  disabled?: boolean;
  children?: React.ReactNode;
}
