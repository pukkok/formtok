'use client'

import Sidebar from "@/features/form-sidebar/Sidebar"
import { useScreenStore } from "@/stores/useScreenStore"
import { useEffect } from "react"

const DashboardLayout = ({children}) => {

  const resetActiveTab = useScreenStore(s => s.resetActiveTab)

  useEffect(() => {

    // INFO: 나갈 때 active 위치 초기화
    return () => resetActiveTab()
  },[resetActiveTab])

  return (
    <main className="flex">
      <Sidebar />
      <div className="dark:bg-deep-dark bg-[#F1F1F1] px-10 py-5 flex-1 max-h-screen overflow-y-auto">
        {children}
      </div>
    </main>
  )
}

export default DashboardLayout