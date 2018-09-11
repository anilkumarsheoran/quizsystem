import React from "react";

const Checkbox = ({
  type = "checkbox",
  name,
  checked = false,
  onChange,
  onClick
}) => (
  <input
    type={type}
    name={name}
    checked={checked}
    onClick={onClick}
    onChange={onChange}
  />
);

export default Checkbox;
