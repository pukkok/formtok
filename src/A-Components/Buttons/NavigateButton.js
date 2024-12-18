import React from "react";
import { useNavigate } from "react-router-dom";

function NavigateButton ({ to='/', handleClick = null, className, children }) {
  const navigate = useNavigate()

  const onClick = (to) => {
    navigate(to)
    if(handleClick) handleClick()
  }

  return <button type="button"
    className={className}
    onClick={()=>onClick(to)}
    >{children}</button>
}

export default NavigateButton