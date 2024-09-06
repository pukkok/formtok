import React from "react"
import usePageActions from "../../hooks/usePageActions"
import useOutsideClick from "../../hooks/useOutsideClick"
import classNames from "classnames"

// more-vertical
function QmoreVert({ pi, qi }) {
    const { isOpen: isOpenQEdit, setIsOpen: setIsOpenQEdit, ref: dropdownRef } = useOutsideClick(false)
    const { copyQ, deleteQ } = usePageActions()

    return (
        <div className="modify-wrapper" ref={dropdownRef}>
            <span
                className="material-symbols-outlined"
                onClick={() => setIsOpenQEdit(!isOpenQEdit)}
            >
                more_vert
            </span>
            <div 
                onClick={() => setIsOpenQEdit(false)}
                className={classNames({ on: isOpenQEdit }, "modify-option")}
            >
                <button onClick={() => copyQ(pi, qi)}>복사</button>
                <button onClick={() => deleteQ(pi, qi)}>삭제</button>
            </div>
        </div>
    )
}

export default QmoreVert