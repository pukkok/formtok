import { useEffect, useState } from "react"
import SearchFilter from "@/components/SearchFilter"
import SearchForm from "@/components/SearchForm"
import { PARTICIPATE_WORK_HOVER_MAP, PARTICIPATE_WORK_COLOR_MAP } from "@/utils/workColor"
import { useParticipateStore } from "@/stores/useParticipateStore"
import dayjs from "dayjs"

const ParticipateHeader = () => {

  const [resetKey, setResetKey] = useState(0)
  const [pick, setPick] = useState('all')

  const allForms = useParticipateStore(s => s.allForms)
  const setSearchedForms = useParticipateStore(s => s.setSearchedForms)
  const getAvailableFormsAction = useParticipateStore(s => s.getAvailableFormsAction)

  const filters = [
    { work: 'all', text: '전체' },
    { work: 'faq', text: 'FAQ' },
    { work: 'noLogin', text: '비로그인' },
    { work: 'active', text: '진행중인 설문' },
    { work: 'finish', text: '종료된 설문' }
  ]

  const search = (word) => {
    const now = dayjs()
    const filtered = allForms.filter(f => {
      const matchesTitle = f.title.includes(word)
      if (!matchesTitle) return false

      const { isEnd, isUseStartPeriod, isNeedLogin, startDate, endDate } = f.options
      const start = startDate ? dayjs(startDate) : null
      const end = endDate ? dayjs(endDate) : null

      const isFinished = isEnd || (end && end.isBefore(now))
      const isActive = !isUseStartPeriod || (start?.isBefore(now) && (!end || end?.isAfter(now)))

      switch (pick) {
        case 'faq': return f.title === '문의하기'
        case 'noLogin': return !isNeedLogin
        case 'active': return !isFinished && isActive
        case 'finish': return isFinished
        default: return true
      }
    })

    setSearchedForms(filtered)
  }


  const filtering = (work) => {
    setPick(work)
    setResetKey(key => key + 1)

    if (work === 'all') return setSearchedForms(allForms)
    if (work === 'faq') return setSearchedForms(allForms.filter(f => f.title === '문의하기'))
    if (work === 'noLogin') return setSearchedForms(allForms.filter(f => !f.options.isNeedLogin))

    const now = dayjs()
    const filtered = allForms.filter(f => {
      const { isEnd, isUseStartPeriod, startDate, endDate } = f.options
      const start = startDate ? dayjs(startDate) : null
      const end = endDate ? dayjs(endDate) : null

      const isFinished = isEnd || (end && end.isBefore(now))
      const isActive = !isUseStartPeriod || (start?.isBefore(now) && (!end || end?.isAfter(now)))

      if (work === 'finish') return isFinished
      if (work === 'active') return !isFinished && isActive

      return false
    })

    setSearchedForms(filtered)
  }

  useEffect(() => {
    getAvailableFormsAction()
  }, [getAvailableFormsAction])

  return (
    <header>
      <SearchForm search={search} resetKey={resetKey}/>
      <SearchFilter 
      colorMap={PARTICIPATE_WORK_COLOR_MAP} hoverMap={PARTICIPATE_WORK_HOVER_MAP}
      filters={filters} filtering={filtering} pick={pick}
      />
    </header>
  )
}

export default ParticipateHeader