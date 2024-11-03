import React from "react";

function LargeBoxInput ({ onKeyUp=null, onFocus=null, onBlur=null, onChange=null, value='', ...props }) {
  const { name, placeholder, type } = props

  return <input
    autoFocus={name === 'userId'} 
    name={name}
    placeholder={placeholder}
    type={type}
    onKeyUp={type === 'password' ? onKeyUp : null}
    onFocus={onFocus}
    onBlur={type === 'password' ? onBlur : null}

    autoComplete="off"
    onChange={onChange}
    value={value}
  />
}

export default LargeBoxInput