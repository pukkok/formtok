'use client'

import { useEffect } from 'react'
import { useScreenStore } from '@/stores/useScreenStore'

const ThemeObserver = ({ children }) => {
  const setMode = useScreenStore(s => s.setMode)

  useEffect(() => {
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    setMode(systemPrefersDark ? 'dark' : 'light')

    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    const listener = (e) => {
      setMode(e.matches ? 'dark' : 'light')
    }
    mq.addEventListener('change', listener)
    return () => mq.removeEventListener('change', listener)
  }, [])

  return <>{children}</>
}

export default ThemeObserver