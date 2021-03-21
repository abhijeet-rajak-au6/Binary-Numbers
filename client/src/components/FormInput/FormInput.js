import React from "react";

function FormInput({
  labelText,
  name,
  CustomOnChange,
  type,
  customClass,
  id,
  placeholder,
  value,
  children,
  disabled,
}) {
  // console.log(value);
  return type !== "submit" ? (
    <div className="form-group">
      <label htmlFor={id}>{labelText}</label>
      <input
        name={name}
        onChange={CustomOnChange}
        type={type}
        className={customClass}
        id={id}
        placeholder={placeholder}
        value={value}
        disabled={disabled}
      />
    </div>
  ) : (
    <button type={type} className={customClass}>
      {children}
    </button>
  );
}

export default FormInput;
