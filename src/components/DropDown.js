import classNames from "classnames";
import React from "react";
import useOutsideClick from "../hooks/useOutsideClick";


function DropDown ({initialItem, children, initialState=false}) {
    const {isOpen, setIsOpen, ref} = useOutsideClick(initialState)

    return (
    <div className="drop-down-wrapper" ref={ref}>
        <button className={classNames("drop-down-btn", {open : isOpen})}
            onClick={()=>{setIsOpen(!isOpen)}}>{initialItem}</button>
        
        <ul className={classNames({open: isOpen})} onClick={()=>setIsOpen(false)}>
            {children}
        </ul>
    </div>
    )
}
export default DropDown