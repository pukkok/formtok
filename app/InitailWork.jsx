'use client'

import { useEffect } from "react"
import { useAuthStore } from '@/stores/useAuthStore'

const InitialWork = ({ children }) => {
  const initializeAuth = useAuthStore(s => s.initializeAuth)
  const isHydrated = useAuthStore(s => s.isHydrated)

  useEffect(() => {
    initializeAuth()
  }, [])

  if (!isHydrated) return null // 아직 초기화 안 끝났으면 아무것도 렌더 안함

  return children
}

export default InitialWork
