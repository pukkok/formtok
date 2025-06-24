import React, { useEffect, useCallback, useImperativeHandle } from 'react'
import useOutsideClick from '@/hooks/useOutsideClick'

// React 19에서는 ref가 일반 prop처럼 전달됩니다.
const ModalContainer = ({ children, ref }) => { // ref를 일반 prop으로 받음
  const { isOpen, setIsOpen, ref: modalContentRefInternal } = useOutsideClick(false) // useOutsideClick 내부용 ref

  // 부모 컴포넌트가 모달을 열고 닫을 수 있도록 open/close 메서드를 노출
  useImperativeHandle(ref, () => ({ // 전달받은 ref prop을 사용
    open: () => setIsOpen(true),
    close: () => setIsOpen(false),
  }), [setIsOpen])

  // Escape 키를 눌러 모달을 닫는 로직
  const handleEscapeKey = useCallback((e) => {
    if (e.key === 'Escape' && isOpen) {
      setIsOpen(false)
    }
  }, [isOpen, setIsOpen])

  // 모달이 열리거나 닫힐 때 Escape 키 이벤트 리스너를 추가/제거
  useEffect(() => {
    if (isOpen) {
      window.addEventListener('keydown', handleEscapeKey)
      if (modalContentRefInternal.current) {
        modalContentRefInternal.current.focus()
      }
    }
    return () => {
      window.removeEventListener('keydown', handleEscapeKey)
    }
  }, [isOpen, handleEscapeKey, modalContentRefInternal])

  // 모달이 닫혀있으면 아무것도 렌더링하지 않음
  if (!isOpen) return null

  // 자식 컴포넌트에게 onClose prop을 주입합니다.
  const childrenWithProps = React.Children.map(children, child => {
    // React 요소인 경우에만 prop을 추가합니다.
    if (React.isValidElement(child)) {
      return React.cloneElement(child, { onClose: () => setIsOpen(false) })
    }
    return child
  })


  return (
    <div className="fixed top-0 left-0 w-screen h-screen bg-black/20 z-1000">
      <div
        ref={modalContentRefInternal} // useOutsideClick의 내부 ref를 여기에 연결
        tabIndex={-1} // div가 키보드 포커스를 받을 수 있도록 설정
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 outline-none"
      >
        {childrenWithProps} {/* onClose prop이 주입된 자식들을 렌더링 */}
      </div>
    </div>
  )
}

export default ModalContainer