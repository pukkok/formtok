import SearchFilter from "@/components/SearchFilter"
import SearchForm from "@/components/SearchForm"
import { useQuestionBankStore } from "@/stores/useQuestionBankStore"
import { filterQuestionBank } from "@/utils/questionBankFilter"
import { QUESTION_BANK_COLOR_MAP, QUESTION_BANK_HOVER_COLOR_MAP } from "@/utils/workColor"
import { useState } from "react"

const QuestionBankHeader = () => {

  const [resetKey, setResetKey] = useState(0)
  const [pick, setPick] = useState('all')

  const questions = useQuestionBankStore(s => s.questions)
  const setSearchedQuestions = useQuestionBankStore(s => s.setSearchedQuestions)

  const filters = [
    { work: 'all', text: '전체'},
    { work: 'text', text: '서술형 그룹'},
    { work: 'choice', text: '객관식 그룹'},
    { work: 'dropdown', text: '드롭다운'},
    { work: 'datetime', text: '날짜 그룹'},
    { work: 'table', text: '표형'},
    { work: 'score', text: '점수 선택형'},
  ]

  const search = (word) => {
    setSearchedQuestions(filterQuestionBank(questions, pick, word))
  }

  const filtering = (work) => {
    setPick(work)
    setResetKey(k => k + 1)
    setSearchedQuestions(filterQuestionBank(questions, work))
  }

  return (
    <header>
      <div className="flex items-center">
        <SearchForm search={search} resetKey={resetKey}/>
        <div className="ml-auto">
          <button className="dark:bg-dark-elevated bg-gray-300 ml-2.5 px-2.5 py-1.5 font-bold rounded-md cursor-pointer">만들기</button>
          <button className="bg-red-700 text-light-w ml-2.5 px-2.5 py-1.5 font-bold rounded-md cursor-pointer">삭제</button>
        </div>
      </div>
      
      <SearchFilter 
        colorMap={QUESTION_BANK_COLOR_MAP} hoverMap={QUESTION_BANK_HOVER_COLOR_MAP}
        filters={filters} filtering={filtering} pick={pick}
      />
    </header>
  )
}

export default QuestionBankHeader