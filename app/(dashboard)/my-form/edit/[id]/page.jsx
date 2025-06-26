'use client'

import FormEditHeader from "@/features/form-edit/FormEditHeader"
import FormEditSidebar from "@/features/form-edit/FormEditSidebar"
import FormEditor from "@/features/form-edit/FormEditor"
import { useFormEditUiStore } from "@/stores/useFormEditUiStore"
import { useEffect } from "react"

const EditPage = () => {

  const setActiveCard = useFormEditUiStore(s => s.setActiveCard)

  useEffect(() => {
    window.history.pushState(null, '', window.location.href)
    setActiveCard('P-0')
  }, [])

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