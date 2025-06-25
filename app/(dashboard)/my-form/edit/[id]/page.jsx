'use client'

import EditHeader from "@/features/form-edit/EditHeader"
import EditSidebar from "@/features/form-edit/EditSidebar"
import FormEditor from "@/features/form-edit/FormEditor"
import { useEffect } from "react"

const EditPage = () => {

  useEffect(() => {
    window.history.pushState(null, '', window.location.href)
  }, [])

  return (
    <div className="flex justify-start">
      <div className="flex-1">
        <EditHeader />
        <FormEditor />
      </div>
      <div className="shrink-0 ml-auto">
        <EditSidebar />
      </div>
    </div>
  )
}

export default EditPage