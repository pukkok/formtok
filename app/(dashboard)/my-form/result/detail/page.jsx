'use client'

import FormResultDetailHeader from "@/features/form-result-detail/FormResultDetailHeader"
import FormResultDetailRightSidebar from "@/features/form-result-detail/FormResultDetailRightSidebar"
import FormResultDetailTemplate from "@/features/form-result-detail/FormResultDetailTemplate"

const FormResultDetailPage = () => {

  return (
    <div className="flex justify-start">
      <div className="flex-1">
        <FormResultDetailHeader />
        <FormResultDetailTemplate />
      </div>
      <div className="shrink-0 ml-auto">
        <FormResultDetailRightSidebar />
      </div>
    </div>
  )
}

export default FormResultDetailPage