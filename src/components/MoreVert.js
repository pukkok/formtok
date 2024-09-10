import React from "react"
import useOutsideClick from "../hooks/useOutsideClick"
import classNames from "classnames"
import { Icon } from "./Icons"

// more-vertical
function MoreVert({ children, autoClose=true }) {
    const { isOpen, setIsOpen, ref } = useOutsideClick(false)

    return (
        <div className="more-vert-wrapper" ref={ref}>
            <button onClick={() => setIsOpen(!isOpen)}>
                <Icon code={'more_vert'}/>
            </button>
            
            <div onClick={() => autoClose && setIsOpen(false)}
            className={classNames({ on: isOpen }, "modify-option")}>
                {children}
            </div>
        </div>
    )
}

export default MoreVert