import { useEffect, useRef, useState } from "react"

// 외부 클릭시 상태 초기화
const useOutsideClick = (initialState) => {
    const [isOpen, setIsOpen] = useState(initialState)
    const ref = useRef(null)

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (ref.current && !ref.current.contains(e.target)) {
                setIsOpen(false)  // 외부 클릭 시 메뉴 닫기
            }
        }

        document.addEventListener("mousedown", handleClickOutside)
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [ref])

    return { isOpen, setIsOpen, ref }
}

export default useOutsideClick