'use client'

import SearchForm from "@/components/SearchForm"
import SearchFilter from "@/components/SearchFilter"
import { useFormManageStore } from "@/stores/useFormManageStore"
import { useState } from "react"
import { MANAGE_WORK_COLOR_MAP, MANAGE_WORK_HOVER_MAP } from "@/utils/workColor"
import { filterManageForms } from "@/utils/manageFilter"

const ManageHeader = () => {

  const [resetKey, setResetKey] = useState(0)

  const [pick, setPick] = useState('all')
  const allForms = useFormManageStore(s => s.allForms)
  const setSearchedForms = useFormManageStore(s => s.setSearchedForms)

  const filters = [
    { work: 'all', text: '전체' },
    { work: 'draft', text: '작성 중' },
    { work: 'ready', text: '설문 시작 전'},
    { work: 'active', text: '설문 진행 중'},
    { work: 'finish', text: '설문 종료'}
  ]

  const search = (word) => {
    setSearchedForms(filterManageForms(allForms, pick, word))
  }

  const filtering = (work) => {
    setPick(work)
    setResetKey(k => k + 1)
    setSearchedForms(filterManageForms(allForms, work))
  }

  return (
    <header>
      <SearchForm search={search} resetKey={resetKey}/>
      <SearchFilter  
      colorMap={MANAGE_WORK_COLOR_MAP} hoverMap={MANAGE_WORK_HOVER_MAP} 
      filters={filters} filtering={filtering} pick={pick}/>
    </header>
  )
}

export default ManageHeader