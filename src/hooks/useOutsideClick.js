import { useEffect, useRef, useState } from "react"

/**
 * 외부 클릭 시 isOpen을 false로 설정하는 훅
 * @param {boolean} initialState 초기 열림 상태
 * @returns {object} { isOpen, setIsOpen, ref }
 */
const useOutsideClick = (initialState = false) => {
  const [isOpen, setIsOpen] = useState(initialState)
  const ref = useRef(null)

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("pointerdown", handleClickOutside)
    return () => {
      document.removeEventListener("pointerdown", handleClickOutside)
    }
  }, [])

  return { isOpen, setIsOpen, ref }
}

export default useOutsideClick
