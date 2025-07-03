'use client'

import { useEffect } from "react"
import { useAuthStore } from '@/stores/useAuthStore'
import { useRouter } from "next/navigation"

const InitialWork = ({ children }) => {
  const router = useRouter()

  const initializeAuth = useAuthStore(s => s.initializeAuth)
  const isHydrated = useAuthStore(s => s.isHydrated)

  useEffect(() => {
    initializeAuth()
  }, [])
  
  useEffect(() => {
    // 자주 사용하는 경로 미리 프리페치
    router.refresh()
    router.push('/my-form/manage')
    router.push('/login')
    router.push('/')
  }, [])

  if (!isHydrated) return null // 아직 초기화 안 끝났으면 아무것도 렌더 안함

  return children
}

export default InitialWork
