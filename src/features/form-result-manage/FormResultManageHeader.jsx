import SearchFilter from "@/components/SearchFilter"
import SearchForm from "@/components/SearchForm"
import { useFormManageStore } from "@/stores/useFormManageStore"
import { filterResultForms } from "@/utils/resultFilter"
import { RESULT_COLOR_MAP, RESULT_HOVER_MAP } from "@/utils/workColor"
import { useState } from "react"

const FormResultManageHeader = () => {

  const allForms = useFormManageStore(s => s.allForms)
  const setSearchedForms = useFormManageStore(s => s.setSearchedForms)

  const [pick, setPick] = useState('all')
  const [resetKey, setResetKey] = useState(0)

  const filters = [
    { work: 'all', text: '전체' },
    { work: 'active', text: '진행 중' },
    { work: 'finish', text: '설문 종료' }
  ]

  const search = (word) => {
    setSearchedForms(filterResultForms(allForms, pick, word))
  }
  
  const filtering = (work) => {
    setPick(work)
    setResetKey(k => k + 1)
    setSearchedForms(filterResultForms(allForms, work))
  }

  return (
    <header>
      <SearchForm search={search} resetKey={resetKey}/>
      <SearchFilter 
        colorMap={RESULT_COLOR_MAP} hoverMap={RESULT_HOVER_MAP}
        filters={filters} filtering={filtering} pick={pick}
      />
    </header>
  )
}

export default FormResultManageHeader