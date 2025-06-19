'use client'

import { useState, useRef, useEffect } from "react"
import FormTokLogo from "@/components/FormTokLogo"
import { MdOutlineCached } from "react-icons/md"
import { useRouter } from "next/navigation"
import { jwtDecode } from "jwt-decode"
import { useAuthStore } from "@/stores/useAuthStore"
import { toast } from "sonner"
import { updateTimeLeft } from "@/utils/updateTimeLeft"

const SidebarHeader = () => {
  const [timeLeft, setTimeLeft] = useState("0시간 00분")
  const intervalRef = useRef(null)
  const warnedRef = useRef(false) // toast 1회 제한용
  const token = useAuthStore(s => s.token)
  const logoutAction = useAuthStore(s => s.logoutAction)
  const refreshAuthTokenAction = useAuthStore(s => s.refreshAuthTokenAction)
  const router = useRouter()

  useEffect(() => {
    if (!token) return setTimeLeft('비회원 이용 중')

    const { exp } = jwtDecode(token)
    const expTime = exp * 1000

    intervalRef.current = setInterval(() => {
      const now = Date.now()
      const remainingMs = expTime - now

      if (remainingMs <= 1000 * 60 * 30 && !warnedRef.current) {
        toast.warning('로그인 만료까지 30분 남았습니다.')
        warnedRef.current = true
      }

      if (remainingMs <= 0) {
        clearInterval(intervalRef.current)
        toast.warning('로그인 시간이 만료되었습니다.')
        setTimeLeft("만료 됨")
        logoutAction()
        router.replace('/')
      } else {
        setTimeLeft(updateTimeLeft(remainingMs))
      }
    }, 1000)

    return () => clearInterval(intervalRef.current)
  }, [token, logoutAction, router])

  return (
    <header className="
      w-[280px] h-[70px] overflow-hidden flex gap-2.5 px-2.5 items-end relative 
      border-b border-b-light-purple dark:border-b-charcoal pb-5 mb-4
    ">
      <FormTokLogo boxSize={48}/>
      <div>
        <h1 className="text-xl">폼톡</h1>  
        <p className="text-xs">만료시간: {timeLeft}</p>
      </div>
      <button className={`
        ml-2.5 p-1 flex justify-center items-center bg-charcoal font-bold rounded-md cursor-pointer
        hover:bg-point-hover hover:rotate-180 duration-200
      `}
        onClick={token ? refreshAuthTokenAction : null}
      >
        <MdOutlineCached />
      </button>
    </header>
  )
}

export default SidebarHeader
