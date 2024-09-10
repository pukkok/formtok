import classNames from "classnames";
import React from "react";

function ToggleButton({onClick, isOn=false}) {

    return <button 
    onClick={onClick}
    className={classNames('toggle-button', {on : isOn})}>
        <span ></span>
    </button>
}

export default ToggleButton