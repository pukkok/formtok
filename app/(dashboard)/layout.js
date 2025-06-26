'use client'

import Sidebar from "@/features/form-sidebar/Sidebar"
import { useScreenStore } from "@/stores/useScreenStore"
import { usePathname } from "next/navigation"
import { useEffect } from "react"

const DashboardLayout = ({children}) => {
  const pathname = usePathname()
  const resetActiveTab = useScreenStore(s => s.resetActiveTab)

  useEffect(() => {
    // INFO: 나갈 때 active 위치 초기화
    return () => resetActiveTab()
  },[resetActiveTab])

  const isEditPage = pathname.includes('/edit')

  return (
    <main className="flex">
      <Sidebar />
      <div className={`dark:bg-deep-dark dark:text-light-w bg-[#F1F1F1] 
      flex-1 max-h-screen 
      ${isEditPage ? '' : 'px-10 py-5 overflow-y-auto'}
      `}>
        {children}
      </div>
    </main>
  )
}

export default DashboardLayout