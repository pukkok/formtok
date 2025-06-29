'use client'

import { useEffect, useRef } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { useFormEditStore } from '@/stores/useFormEditStore'

const useRouteGuard = () => {
  const router = useRouter()
  const pathname = usePathname()
  const modalRef = useRef(null)
  const nextPath = useRef(null)

  const isModified = useFormEditStore(s => s.isModified)
  const resetOriginData = useFormEditStore(s => s.resetOriginData)

  const handleRouteChange = (path) => {
    if (!isModified()) {
      router.push(path)
      return false // 변경사항 없음.
    } else {
      nextPath.current = path
      modalRef.current?.open()
      return true
    }
  }

  const confirmNavigation = () => {

    if(!nextPath.current) {
      if(pathname?.startsWith('/my-form/edit')) {
        nextPath.current = '/my-form/manage'
      }
    }
    
    resetOriginData()
    router.push(nextPath.current)
    modalRef.current?.close()
    return nextPath.current
  }

  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (!isModified()) return
      e.preventDefault()
      e.returnValue = ''
    }

    window.addEventListener('beforeunload', handleBeforeUnload)
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload)
    }
  }, [isModified])

  useEffect(() => {
    const onPopState = () => {
      // TODO: edit페이지의 이전 pathname은 /my-form/manage이므로 /my-form/manage가 아니면 팝스테이트는 무시해야한다.
      if(!pathname.includes('/my-form/manage')) return console.log('포함하지 않아')

      if (!isModified()) return router.push('/my-form/manage')
      modalRef.current?.open()
    }
    window.addEventListener('popstate', onPopState)
    return () => window.removeEventListener('popstate', onPopState)
  }, [isModified])

  return {
    modalRef,
    handleRouteChange,
    confirmNavigation,
  }
}

export default useRouteGuard
