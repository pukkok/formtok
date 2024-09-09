import React from "react"
import usePageActions from "../../hooks/usePageActions"
import useOutsideClick from "../../hooks/useOutsideClick"
import classNames from "classnames"

// more-vertical
function QmoreVert({ pi, qi }) {
    const { isOpen, setIsOpen, ref } = useOutsideClick(false)
    const { copyQ, deleteQ } = usePageActions()

    return (
        <div className="modify-wrapper" ref={ref}>
            <span
                className="material-symbols-outlined"
                onClick={() => setIsOpen(!isOpen)}
            >
                more_vert
            </span>
            <div 
                onClick={() => setIsOpen(false)}
                className={classNames({ on: isOpen }, "modify-option")}
            >
                <button onClick={() => copyQ(pi, qi)}>복사</button>
                <button onClick={() => deleteQ(pi, qi)}>삭제</button>
            </div>
        </div>
    )
}

export default QmoreVert