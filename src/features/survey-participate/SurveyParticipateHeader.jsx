import { useParticipateStore } from "@/stores/useParticipateStore"
import { useRouter } from "next/navigation"

const SurveyParticipateHeader = () => {
  const router = useRouter()
  
  const surveyForms = useParticipateStore(s => s.surveyForms)
  const currentPageIndex = useParticipateStore(s => s.currentPageIndex)
  const { title, pages } = surveyForms

  return (
    <header className={`sticky top-0 w-full flex items-center h-15 z-300
      dark:bg-dark-deep bg-bright-a`}>
      <div className="w-full px-5 flex items-center">
        <p>{title || '제목없는 설문지'}</p>
        <button 
          onClick={() => router.back()}
          className="ml-auto 
          bg-point hover:bg-point-hover dark:hover:bg-dark-point-hover 
          text-bright-a rounded-xl px-3 py-2 cursor-pointer"
          >돌아가기</button>
      </div>
      <p className="w-full absolute bottom-0 h-0.5 dark:bg-dark-line-base bg-gray-300">
        <span 
        className="relative top-0 bottom-0 bg-point h-0.5 block transition-all duration-300"
        style={{width : ((currentPageIndex / (pages?.length || 1)) * 100) + '%' }}></span>
      </p>
    </header>
  )
}

export default SurveyParticipateHeader