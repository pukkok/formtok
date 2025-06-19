'use client'

import SearchForm from "@/components/SearchForm"
import SearchFilter from "@/components/SearchFilter"
import { useFormManageStore } from "@/stores/useFormManageStore"
import { useState } from "react"
import { manageWorkColorPick } from "@/utils/workColor"
import { MANAGE_WORK_COLOR_MAP, MANAGE_WORK_HOVER_MAP } from "@/utils/workColor"

const ManageHeader = () => {

  const [resetKey, setResetKey] = useState(0)

  const [pick, setPick] = useState('all')
  const allForms = useFormManageStore(s => s.allForms)
  const setSearchedForms = useFormManageStore(s => s.setSearchedForms)

  const search = (word) => {
    const filteredForms = allForms.filter((form) => {
      const { work: pickWork } = manageWorkColorPick({ ...form.options })
      const matchesFilter = pick === 'all' || pick === pickWork
      const matchesSearch = form.title.includes(word)

      return matchesFilter && matchesSearch
    })

    setSearchedForms(filteredForms)
  }

  const filters = [
    { work: 'all', text: '전체' },
    { work: 'draft', text: '작성 중' },
    { work: 'ready', text: '설문 시작 전'},
    { work: 'active', text: '설문 진행 중'},
    { work: 'finish', text: '설문 종료'}
  ]
  
  // 필터링 기능
  const filtering = (work) => {
    setPick(work)
    setResetKey(key => key + 1)
    if (work==='all') return setSearchedForms(allForms)

    const filteredForms = allForms.filter((form) => { 
      const { work: pickWork } = manageWorkColorPick({...form.options})
      return work === pickWork
    })
    setSearchedForms(filteredForms)
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