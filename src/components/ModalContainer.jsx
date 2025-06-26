'use client'

import React, { useEffect, useState, useCallback, useImperativeHandle } from 'react'
import ReactDOM from 'react-dom'
import useOutsideClick from '@/hooks/useOutsideClick'

const ModalContainer = ({ children, ref }) => {
  const [mounted, setMounted] = useState(false)
  const [modalRoot, setModalRoot] = useState(null)
  const [enableEscapeClose, setEnableEscapeClose] = useState(true) // INFO: Escape 사용 여부 제어
  // useOutsideClick 훅에서 내부 ref와 열림 상태, 닫기 함수 가져오기
  const { isOpen, setIsOpen, ref: modalContentRefInternal } = useOutsideClick(false)

  // 포탈용 루트 div 생성 및 상태 세팅
  useEffect(() => {
    setMounted(true)
    let modalRootEl = document.getElementById('modal-root')

    if (!modalRootEl) {
      modalRootEl = document.createElement('div')
      modalRootEl.setAttribute('id', 'modal-root')
      document.body.appendChild(modalRootEl)
    }
    setModalRoot(modalRootEl)
  }, [])

  // 부모가 ref로 모달 열고 닫기 가능하도록 메서드 노출
  useImperativeHandle(ref, () => ({
    open: () => setIsOpen(true),
    close: () => setIsOpen(false),
    setEscapeEnabled: (enabled) => setEnableEscapeClose(enabled)
  }), [setIsOpen])

  // ESC 키 눌렀을 때 모달 닫기
  const handleEscapeKey = useCallback(e => {
    if (e.key === 'Escape' && isOpen && enableEscapeClose) setIsOpen(false)
  }, [isOpen, setIsOpen])

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

  if (!mounted || !modalRoot || !isOpen) return null

  // 자식들에게 onClose prop 주입 (닫기 함수)
  const childrenWithProps = React.Children.map(children, child =>
    React.isValidElement(child)
      ? React.cloneElement(child, { onClose: () => setIsOpen(false) })
      : child
  )

  // 모달 내용
  const modalContent = (
    <div className="fixed top-0 left-0 w-screen h-screen bg-black/20 z-[1000]">
      <div
        ref={modalContentRefInternal}
        tabIndex={-1}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 outline-none"
      >
        {childrenWithProps}
      </div>
    </div>
  )

  return ReactDOM.createPortal(modalContent, modalRoot)
}

export default ModalContainer
