import { useState, useRef, useEffect } from 'react'

const HoldToDeleteButton = ({ onDelete, children = '2초간 눌러서 삭제' }) => {
  const [holding, setHolding] = useState(false)
  const [progress, setProgress] = useState(0)
  const timerRef = useRef(null)
  const startTimeRef = useRef(null)

  const DURATION = 2000

  useEffect(() => {
    if (!holding) {
      setProgress(0)
      cancelAnimationFrame(timerRef.current)
      return
    }

    startTimeRef.current = performance.now()

    const animate = (time) => {
      const elapsed = time - startTimeRef.current
      if (elapsed >= DURATION) {
        setProgress(100)
        onDelete()
        setHolding(false)
        return
      }
      setProgress((elapsed / DURATION) * 100)
      timerRef.current = requestAnimationFrame(animate)
    }

    timerRef.current = requestAnimationFrame(animate)

    return () => cancelAnimationFrame(timerRef.current)
  }, [holding, onDelete])

  const handleMouseDown = () => {
    setHolding(true)
  }

  const handleMouseUpOrLeave = () => {
    setHolding(false)
  }

  return (
    <button
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUpOrLeave}
      onMouseLeave={handleMouseUpOrLeave}
      className={`relative overflow-hidden 
        px-3 py-2 min-w-18 rounded-md 
        bg-gray-300 dark:bg-dark-elevated
        ${holding ? 'text-white cursor-wait' : 'text-red-400 cursor-pointer'}`} 
    >
      <div
        className="absolute top-0 left-0 h-full dark:bg-red-700 bg-red-400 text-light-w"
        style={{ width: `${progress}%`, transition: holding ? 'none' : 'width 0.3s ease' }}
      />
      <span className="relative z-10">{children}</span>
    </button>
  )
}

export default HoldToDeleteButton
