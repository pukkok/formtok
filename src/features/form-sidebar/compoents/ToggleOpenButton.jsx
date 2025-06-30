'use client'

import ani from '@/animations/SidebarExpand.module.css'
import { useScreenStore } from "@/stores/useScreenStore"
import { usePathname } from 'next/navigation'
import { ArrowIcon } from 'pk-icons'
import { useEffect } from "react"
import { toast } from 'sonner'

const ToggleOpenButton = () => {
  const pathname = usePathname()

  const isSidebarOpen = useScreenStore(s => s.isSidebarOpen)
  const setIsSidebarOpen = useScreenStore(s => s.setIsSidebarOpen)
  const setSidebarWidth = useScreenStore(s => s.setSidebarWidth)

  const setPreviousSidebarState = useScreenStore(s => s.setPreviousSidebarState)

  const isPreview = pathname.includes('/preview')

  const toggleOpen = () => {
    if (isPreview) {
      toast.warning('미리보기 상태에선 사용할 수 없습니다.')
      return
    }
    setIsSidebarOpen(!isSidebarOpen)
  }

  useEffect(() => {
    if (isPreview) {
      // 프리뷰 진입 시 이전 상태 저장 후 닫음
      setPreviousSidebarState(isSidebarOpen)
      setIsSidebarOpen(false)
    } else {
      // 프리뷰 종료 후 이전 상태 복원
      const previousSidebarState = useScreenStore.getState().previousSidebarState
      setIsSidebarOpen(previousSidebarState)
    }
  }, [pathname])

  useEffect(() => {
    setSidebarWidth(isSidebarOpen ? 320 : 20)
  }, [isSidebarOpen])

  return (
    isSidebarOpen ? (
      <button
        onClick={toggleOpen}
        className={`${ani['contract-sidebar']} overflow-hidden
          absolute left-[320px] top-[100px] z-20
          -translate-x-1/2 -translate-y-1/2
          w-0 h-0 rounded-full 
          bg-white text-black
          shadow-lg
          flex items-center justify-center cursor-pointer font-bold
          hover:scale-105 hover:duration-100
        `}
      >
        <ArrowIcon size={28} direction='left' className='mr-0.5' />
      </button>
    ) : (
      <button
        onClick={toggleOpen}
        className={`
          ${ani['expand-sidebar']}
          w-full h-full flex justify-center items-center
          after:content-[""] after:fixed
          after:w-1.5 after:h-10 after:bg-light-w 
          after:py-1.5 after:rounded-xl cursor-pointer
        `}
      />
    )
  )
}

export default ToggleOpenButton
