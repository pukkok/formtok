'use client'

import { useEffect } from "react";
import { useAuthStore } from '@/stores/useAuthStore'

const InitailWork = () => {
  
  const initializeAuth = useAuthStore(s => s.initializeAuth)

  useEffect(() => {
    initializeAuth()
  }, [])

  return null
}

export default InitailWork