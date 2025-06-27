'use client'

import FormEditHeader from "@/features/form-edit/FormEditHeader"
import FormEditSidebar from "@/features/form-edit/FormEditSidebar"
import FormEditor from "@/features/form-edit/FormEditor"
import { useAuthStore } from "@/stores/useAuthStore"
import { useFormEditStore } from "@/stores/useFormEditStore"
import { useFormEditUiStore } from "@/stores/useFormEditUiStore"
import { useParams, useRouter } from "next/navigation"
import { useEffect } from "react"

const EditPage = () => {
  const { id } = useParams()
  const router = useRouter()

  const userInfo = useAuthStore(s => s.userInfo)
  
  const setActiveCard = useFormEditUiStore(s => s.setActiveCard)
  
  const url = useFormEditStore(s => s.url)
  const loadForm = useFormEditStore(s => s.loadForm)

  useEffect(() => {
    window.history.pushState(null, '', window.location.href)
    setActiveCard('P-0')
  }, [])

  useEffect(() => {
    if(!userInfo && !url) return router.replace('/my-form/manage')
    loadForm(id)

    return () => {
      if(!userInfo) return router.replace('/my-form/manage')
    }
  }, [loadForm, userInfo])

  if(!userInfo && !url) return null

  return (
    <div className="flex justify-start">
      <div className="flex-1">
        <FormEditHeader />
        <div className="overflow-scroll h-[calc(100vh-60px)] mx-1 scroll-hidden">
          <FormEditor />
        </div>
      </div>
      <div className="shrink-0 ml-auto">
        <FormEditSidebar />
      </div>
    </div>
  )
}

export default EditPage