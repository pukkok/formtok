import React from "react";

function AddAnswer({type, inputChange, buttonClick, placeholder, defaultValue, value, disabled, isNotUseBtn=false}){

    return <div className="option-box">
        <input type={type} placeholder={placeholder} onChange={inputChange} defaultValue={defaultValue} value={value} disabled={disabled}/>
        <button onClick={buttonClick} style={{display: isNotUseBtn ? 'none' : 'block'}}>
            <span className="material-symbols-outlined">close</span>
        </button>
    </div>
}

export default AddAnswer