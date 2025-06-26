import { useEffect } from "react"
import { useAuthStore } from "@/stores/useAuthStore"

export const useTokenFetch = (fetchAction) => {
  const token = useAuthStore(s => s.token)

  useEffect(() => {
    if(token) fetchAction(true)
  }, [token])
}