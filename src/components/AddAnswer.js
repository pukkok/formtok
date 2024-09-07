import React from "react";

function AddAnswer({type, inputChange, buttonClick, placeholder, defaultValue, value, disabled}){

    return <div className="option-box">
        <input type={type} placeholder={placeholder} onChange={inputChange} defaultValue={defaultValue} value={value} disabled={disabled}/>
        <button onClick={buttonClick}>
            <span className="material-symbols-outlined">close</span>
        </button>
    </div>
}

export default AddAnswer