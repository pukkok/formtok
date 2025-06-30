import { useParticipateStore } from "@/stores/useParticipateStore"
import PageCard from "./components/PageCard"
import { useCallback, useEffect, useRef } from "react"
import QuestionCard from "./components/QuestionCard"
import { useAnswerStore } from "@/stores/useAnswerStore"
import SurveyPaginationButton from "./components/SurveyPaginationButton"
import { toast } from "sonner"
import { useParams } from "next/navigation"
import EndingCard from "./components/EndingCard"
import SurveyFinishNavButton from "./components/SurveyFinishNavButton"

const SurveyParticipateSinglePage = () => {
  const { id } = useParams()

  const surveyForms = useParticipateStore(s => s.surveyForms)
  const { pages, listStyle, endingMent } = surveyForms
  
  const currentPageIndex = useParticipateStore(s => s.currentPageIndex)  
  const setCurrentPageIndex = useParticipateStore(s => s.setCurrentPageIndex)
  const answerBox = useAnswerStore(s => s.answerBox)
  const setAnswerBox = useAnswerStore(s => s.setAnswerBox)
  const submitAnswerAction = useAnswerStore(s => s.submitAnswerAction)

  const buildAnswerBoxFromPages = (pages) => {
    return pages.reduce((acc, page) => {
      const newQuestions = page.questions.reduce((qAcc, question) => {
        if (['날짜', '시간', '날짜 + 시간'].includes(question.type)) {
          qAcc[question.id] = { start: '', end: '' }
        } else if (question.type === '객관식(복수 선택)') {
          qAcc[question.id] = { answer: [], useExtra: false, extra: '' }
        } else if (question.type === '객관식') {
          qAcc[question.id] = { answer: '', useExtra: false, extra: '' }
        } else {
          qAcc[question.id] = { answer: '' }
        }
        return qAcc
      }, {})
      acc[page.id] = newQuestions
      return acc
    }, {})
  }

  const getListStyleForIndex = useCallback((qi) => {
      switch (listStyle) {
        case 'N': return `${qi + 1}.`
        case 'Q': return 'Q.'
        case 'QN': return `Q${qi + 1}.`
        default: return ''
      }
  }, [listStyle])
  
  useEffect(() => {
    const newAnswerBox = buildAnswerBoxFromPages(pages)
    setAnswerBox(newAnswerBox)
    
    return() => {
      setAnswerBox(null)
      setCurrentPageIndex(0)
    }
  }, [pages])

  const moveLogs = useRef([0])
  const canMoveToNextPage = () => {
    const currentPage = pages[currentPageIndex]
    if (!currentPage) return false

    const pId = currentPage.id

    const essentialCheck = currentPage.questions.every(question => {
      const {id : qId, essential, type, setPeriod} = question
      if(!essential) return true

      const box = answerBox[pId][qId]
      if (['날짜', '시간', '날짜 + 시간'].includes(type)) {
        return setPeriod ? box.start !== '' && box.end !== '' : box.start !== ''
      }

      if (type === '객관식(복수 선택)') {
        return box.answer.length > 0 || box.extra
      }

      if (type === '객관식') {
        return box.answer || box.extra
      }

      return !!box.answer
    })
    return essentialCheck
  }

  const moveToPrevPage = () => {
    moveLogs.current.pop()
    setCurrentPageIndex(moveLogs.current.length > 0 ? moveLogs.current.length-1 : 0)
  }

  const moveToNextPage = () => {
    const essentialCheck = canMoveToNextPage()
    if(!essentialCheck) return toast.warning('필수 질문에 대한 답변을 입력해주세요.')
    
    moveLogs.current = [...moveLogs.current, currentPageIndex]
    setCurrentPageIndex(pages[currentPageIndex].next || currentPageIndex+1)
  }
  
  const handleSubmitAnswer = async () => {
    const essentialCheck = canMoveToNextPage()
    if(!essentialCheck) return toast.warning('필수 질문에 대한 답변을 입력해주세요.')
      
    const success = await submitAnswerAction(id)
    if(success) {
      moveLogs.current = [...moveLogs.current, currentPageIndex + 1]
      setCurrentPageIndex(currentPageIndex+1)
    }
  }

  return (
    <div>
      {(pages && pages[currentPageIndex]) && (
        <div className="p-4 max-w-3xl mx-auto">
          <PageCard 
            pageCnt={`${currentPageIndex + 1}/${pages.length || 1}`}
            title={pages[currentPageIndex].title}
            description={pages[currentPageIndex].description}
          />

          {pages[currentPageIndex].questions.map((question, qi) => {
            const {id, q, d, options, type, ...rest} = question

            const listStyle = getListStyleForIndex(qi)
            return <QuestionCard 
              key={id} q={q} d={d} listStyle={listStyle} 
              questionType={type} options={options}
              pId={pages[currentPageIndex].id} qId={id}
              {...rest}
              />
          })}

          <SurveyPaginationButton 
            isFirst={currentPageIndex === 0}
            isLast={currentPageIndex === pages.length - 1}
            onPrev={moveToPrevPage}
            onNext={moveToNextPage}
            onSubmit={handleSubmitAnswer}
          />
        </div>
      )}

      {currentPageIndex === pages.length && (
        <div className="p-4 max-w-3xl mx-auto">
          <EndingCard title={endingMent.title} description={endingMent.description}/>
          <SurveyFinishNavButton />
        </div>
      )}      
    </div>
  )
}

export default SurveyParticipateSinglePage