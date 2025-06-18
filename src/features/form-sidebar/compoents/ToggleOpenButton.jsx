'use client'

import ani from '@/animations/SidebarExpand.module.css'
import { useScreenStore } from "@/stores/useScreenStore"
import { ArrowIcon } from 'pk-icons'
import { useEffect } from "react"

const ToggleOpenButton = () => {

  const isSidebarOpen = useScreenStore(s => s.isSidebarOpen)
  const setIsSidebarOpen = useScreenStore(s => s.setIsSidebarOpen)

  const setSidebarWidth = useScreenStore(s => s.setSidebarWidth)

  const toggleOpen = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }
  
  useEffect(() => {
   isSidebarOpen ? setSidebarWidth(320) : setSidebarWidth(20)
  }, [isSidebarOpen])

  return (
    isSidebarOpen ? 
    <button 
      onClick={toggleOpen}
      className={`${ani['contract-sidebar']} overflow-hidden
        absolute left-[320px] top-[100px] z-20
        -translate-x-1/2 -translate-y-1/2
        w-0 h-0 rounded-full text-black
        bg-light-w flex items-center justify-center cursor-pointer font-bold
        hover:scale-105 hover:duration-100
        `}>
      <ArrowIcon size={28} direction='left' className='mr-0.5'/>
    </button> :
    <button 
      onClick={toggleOpen}
      className={`
        ${ani['expand-sidebar']}
        w-full h-full flex justify-center items-center
        after:content-[""] after:fixed
        after:w-1.5 after:h-10 after:bg-light-w
        after:py-1.5 after:rounded-xl cursor-pointer hover:after:bg-point
      `}
    >
    </button>

    
  )
}

export default ToggleOpenButton