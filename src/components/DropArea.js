import React from "react";
import './DropArea.css'

const DropArea = ({ onDrop, isShow }) => {

    return (
        <section 
            onDragOver={e => e.preventDefault()}
            onDrop={onDrop}
            className={isShow ? "drop-area" : "hide-drop"}
        >
            {isShow && 'Drop Here'}
        </section>
    );
};


export default DropArea