'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

function NavigateButton({ to = '/', handleClick = null, className, children }) {
  const router = useRouter()
  const [canGoBack, setCanGoBack] = useState(false)

  useEffect(() => {
    // INFO: 최소한 2 이상이면 back할 히스토리가 있음
    setCanGoBack(window.history.length > 2)
  }, [])

  const onClick = () => {
    if (to === 'back') {
      if (canGoBack) {
        router.back()
      } else {
        router.push('/') // INFO: 앱 루트로 대체
      }
    } else {
      router.push(to)
    }

    if (handleClick) handleClick()
  }

  return (
    <button type="button" className={className} onClick={onClick}>
      {children}
    </button>
  )
}

export default NavigateButton
