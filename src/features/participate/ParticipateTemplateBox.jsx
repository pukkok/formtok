import dayjs from "dayjs"
import { useParticipateStore } from "@/stores/useParticipateStore"
import CardWrapper from "../../components/CardWrapper"
import { FaLink } from "react-icons/fa"
import { toast } from "sonner"
import { useAuthStore } from "@/stores/useAuthStore"
import { useRouter } from "next/navigation"
import Lights from "./components/Lights"
import { getParticipateWorks } from "@/utils/participateFilter"


const ParticipateTemplateBox = () => {
  const router = useRouter()
  const searchedForms = useParticipateStore(s => s.searchedForms)

  const linkOpen = (e, url) => {
    e.stopPropagation()
    navigator.clipboard.writeText(`${origin}/participate/${url}`)
    toast.success('링크가 복사되었습니다.')
  }

  const checkSurveyBlocked = (form) => {
    const token = useAuthStore.getState().token
    const { options, numberOfResponses } = form
    const { isNeedLogin, isEnd, startDate, endDate, maximumCount } = options
    const now = dayjs()
    const start = dayjs(startDate)
    const end = dayjs(endDate)

    if (isEnd || end.isBefore(now) || numberOfResponses.length === maximumCount) {
      toast.warning('이미 종료된 설문지 입니다.', { duration: 1500 })
      return true
    }

    if (isNeedLogin && !token) {
      toast.warning('로그인이 필요한 설문지 입니다', { duration: 1500 })
      return true
    }

    if (start.isAfter(now)) {
      toast.warning('아직 참여할 수 없는 설문지입니다.', { duration: 1500 })
      return true
    }

    return false
  }

  const goToSurvey = (form) => {
    if (checkSurveyBlocked(form)) return

    useParticipateStore.getState().setSurveyForms(form)
    router.push(`/participate/${form.url}`)
  }
  
  return (
    <div className="mt-7.5 grid grid-cols-[repeat(auto-fit,_minmax(260px,_280px))] flex-wrap gap-y-4 gap-x-3">
      {searchedForms.length > 0 && (
        searchedForms.map(form => {
          const { title, url, pages, options, numberOfResponses} = form
          const allQuetinoCount = pages.reduce((acc, currentPage) => acc += currentPage.questions.length, 0)
          const {startDate, endDate, maximumCount, isNeedLogin} = options

          return (
            <CardWrapper key={url}>
              <div className="w-full h-full p-5 flex flex-col justify-start
              dark:bg-dark-surface dark:hover:bg-dark-hover 
              bg-bright-a hover:bg-bright-b"
              onClick={() => goToSurvey(form)}
              >
                <div className="flex mb-2.5">
                  <Lights works={getParticipateWorks(form)}/>
                  <button className="flex items-center mb-3 ml-auto hover:text-point cursor-pointer" onClick={e => linkOpen(e, url)}><FaLink /></button>
                </div>
                <h5 className="mb-2.5 text-lg line-clamp-2">{title}</h5>
                <div className="mt-auto text-sm space-y-1">
                  {isNeedLogin && <p>로그인 : 필수</p>}
                  <p>총 문항 수 : {allQuetinoCount}</p>
                  <p className={`${numberOfResponses.length === maximumCount ? 'text-work-red' : ''}`}>
                    참여 : {numberOfResponses.length || 0} | {maximumCount ? `최대 ${maximumCount}`: '제한 없음' }
                  </p>
                  <p className={`${dayjs(endDate).isBefore(dayjs()) ? 'text-work-red' : ''}`}>
                    기간 : {startDate ? <> 
                      {startDate ? dayjs(startDate).format('YYYY-MM-DD') : '무제한'}
                      <span> ~ </span>
                      {endDate ? dayjs(endDate).format('YYYY-MM-DD') : '무제한'}
                      </> :
                      '무제한'
                      }
                  </p>
                </div>
              </div>
            </CardWrapper>
          )
        })
      )}
    </div>
  )
}

export default ParticipateTemplateBox