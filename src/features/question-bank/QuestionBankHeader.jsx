import SearchFilter from "@/components/SearchFilter"
import SearchForm from "@/components/SearchForm"
import { useQuestionBankStore } from "@/stores/useQuestionBankStore"
import { filterQuestionBank } from "@/utils/questionBankFilter"
import { QUESTION_BANK_COLOR_MAP, QUESTION_BANK_HOVER_COLOR_MAP } from "@/utils/workColor"
import { useEffect, useRef, useState } from "react"
import HoldToDeleteButton from "@/components/DeleteButton"
import ModalContainer from "@/components/Modal/ModalContainer"
import QuestionMultiPreviewModal from "./QuestionPreviewModal/QuestionMultiPreviewModal"
import { toast } from "sonner"

const QuestionBankHeader = () => {
  const modalRef = useRef(null)

  const [resetKey, setResetKey] = useState(0)
  const [pick, setPick] = useState('all')

  const questions = useQuestionBankStore(s => s.questions)
  const selectedQuestions = useQuestionBankStore(s => s.selectedQuestions)
  const setSearchedQuestions = useQuestionBankStore(s => s.setSearchedQuestions)
  const deleteManyQuestionsAction = useQuestionBankStore(s => s.deleteManyQuestionsAction)
  const resetSelectedQuestions = useQuestionBankStore(s => s.resetSelectedQuestions)

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

  const previewModalOpen = () => {
    if(selectedQuestions.length === 0) return toast.error('선택된 문항이 없습니다.')
    modalRef.current?.open()
  }

  useEffect(() => { // 나갈때 리셋 시키기
    return () => resetSelectedQuestions()
  }, [])

  return (
    <header>
      <div className="flex items-center">
        <SearchForm search={search} resetKey={resetKey}/>
        <div className="ml-auto">
          <button 
            onClick={previewModalOpen}
            className="dark:bg-dark-elevated bg-gray-300 mr-2.5 px-3 py-2 rounded-md cursor-pointer"
          >선택 보기</button>
          <HoldToDeleteButton 
            onDelete={deleteManyQuestionsAction}
            >선택 삭제</HoldToDeleteButton>
        </div>
      </div>
      
      <SearchFilter 
        colorMap={QUESTION_BANK_COLOR_MAP} hoverMap={QUESTION_BANK_HOVER_COLOR_MAP}
        filters={filters} filtering={filtering} pick={pick}
      />

      <ModalContainer ref={modalRef}>
        <QuestionMultiPreviewModal questions={questions} selectedIds={selectedQuestions}/>
      </ModalContainer>
    </header>
  )
}

export default QuestionBankHeader