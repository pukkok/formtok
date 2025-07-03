import { useEffect, useState } from "react"
import SearchFilter from "@/components/SearchFilter"
import SearchForm from "@/components/SearchForm"
import { PARTICIPATE_WORK_HOVER_MAP, PARTICIPATE_WORK_COLOR_MAP } from "@/utils/workColor"
import { useParticipateStore } from "@/stores/useParticipateStore"
import { filterForms } from '@/utils/participateFilter'
import { useSearchParams } from "next/navigation"

const ParticipateHeader = () => {
  const searchParams = useSearchParams()
  const query = searchParams.get('query')

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
    const result = filterForms(allForms, {  keyword: word, filterType: pick })
    setSearchedForms(result)
  }

  const filtering = (work) => {
    setPick(work)
    setResetKey(k => k + 1)

    const result = filterForms(allForms, { keyword: '', filterType: work })
    setSearchedForms(result)
    return work
  }

  useEffect(() => {
    if (query) {
      filtering('faq')
    }
  }, [query, allForms])

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