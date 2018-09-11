import React from "react";
import withStyle from "../../../withStyle";
import style from "./Input.style";

const Input = ({
  name,
  type,
  placeholder,
  className,
  onBlur,
  onChange,
  onClick,
  isDirty,
  isTouched,
  isValid,
  inValiderrorMessage,
  emptyErrorMessage,
  value
}) => (
  <div className={className}>
    <input
      className={` form-control  ${
        !isValid && (isTouched || isDirty) ? "error" : "valid"
      }`}
      type={type}
      name={name}
      placeholder={placeholder}
      onClick={onClick}
      onChange={onChange}
      onBlur={onBlur}
      value={value}
    />
    {!isValid &&
      isTouched &&
      !isDirty && <span className="error-text">{emptyErrorMessage}</span>}
    {!isValid &&
      isDirty && <span className="error-text">{inValiderrorMessage}</span>}
  </div>
);

export default withStyle(Input, style);
