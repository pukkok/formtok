'use client'

import React, { useEffect } from "react"
import { useScreenStore } from "@/stores/useScreenStore"
import { useRouter } from "next/navigation"

const PageSwitchButton = ({to, children, className}) => {
  const switchTheScreen = useScreenStore(s => s.switchTheScreen)
  const setSwitchTheScreen = useScreenStore(s => s.setSwitchTheScreen)
  const router = useRouter()

  const goToPage = (path) => {
    setSwitchTheScreen('go')
    setTimeout(() => {
      router.push(path)
    }, 600)
  }

  useEffect(() => {
    if(switchTheScreen === 'go'){
      setTimeout(() => {
        setSwitchTheScreen('')
      }, 2500)
    }
  }, [switchTheScreen])

  return <button className={className} onClick={()=>goToPage(to)}>{children}</button>
}

export default PageSwitchButton