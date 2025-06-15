'use client'

import React, { useEffect } from "react"
import { useScreenStore } from "@/stores/useScreenStore"
import { useRouter } from "next/navigation"

function PageSwitchButton ({to, children, className}) {
  const switchTheScreen = useScreenStore(s => s.switchTheScreen)
  const setSwitchTheScreen = useScreenStore(s => s.setSwitchTheScreen)
  const router = useRouter()

  const goToPage = (path) => {
    setSwitchTheScreen('go')
    setTimeout(() => {
      router.push(path)
    }, 500)
  }

  useEffect(() => {
    if(switchTheScreen === 'go'){
      setTimeout(() => {
        setSwitchTheScreen('')
      }, 1000)
    }
  }, [switchTheScreen])

  return <button className={className} onClick={()=>goToPage(to)}>{children}</button>
}

export default PageSwitchButton