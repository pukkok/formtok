import React from "react";

function AddAnswer({type, handleClick, placeholder, defaultValue, disabled}){

    return <div className="option-box">
        <input type={type} placeholder={placeholder} defaultValue={defaultValue} disabled={disabled}/>
        <button onClick={handleClick}>
            <span className="material-symbols-outlined">close</span>
        </button>
    </div>
}

export default AddAnswer