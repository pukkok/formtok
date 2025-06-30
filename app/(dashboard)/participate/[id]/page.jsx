'use client'

import SurveyParticipateHeader from "@/features/survey-participate/SurveyParticipateHeader"
import SurveyParticipateSinglePage from "@/features/survey-participate/SurveyParticipateSinglePage"
import { useParticipateStore } from "@/stores/useParticipateStore"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

const SurveyParticipatePage = () => {

  const router = useRouter()
  const surveyForms = useParticipateStore(s => s.surveyForms)

  useEffect(() => {
    if(surveyForms.length === 0) return router.push('/participate')
  }, [surveyForms])

  if(surveyForms.length === 0) return null

  return (
    <div>
      <SurveyParticipateHeader />
      <div className="overflow-scroll h-[calc(100vh-60px)] mx-1 scroll-hidden">
        <SurveyParticipateSinglePage />
      </div>
    </div>
  )
}

export default SurveyParticipatePage