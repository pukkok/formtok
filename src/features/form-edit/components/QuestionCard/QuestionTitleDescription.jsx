import { useFormEditStore } from "@/stores/useFormEditStore"
import CustomEditor from "@/components/CustomEditor"
import { useCallback } from "react"

const QuestionTitleDescription = ({pi, qi}) => {

  const pages = useFormEditStore(s => s.pages)

  const listStyle = useFormEditStore(s => s.listStyle)
  const { essential, hasDescription, d } = pages[pi].questions[qi]

  const updateQuestion = useFormEditStore(s => s.updateQuestion)

  const getListStyleForIndex = useCallback((qi) => {
    switch (listStyle) {
      case 'N': return `${qi + 1}.`
      case 'Q': return 'Q.'
      case 'QN': return `Q${qi + 1}.`
      default: return ''
    }
  }, [listStyle])

  return (
    <div className=" mt-5">
      <div className="flex items-center relative">
        <span className={`absolute -left-3 ${essential ? 'text-red-500 visible' : 'invisible'}`}>*</span>
        {getListStyleForIndex(qi) && <span className="mr-2">{getListStyleForIndex(qi)}</span>}
        <input 
          placeholder="질문" 
          className="flex-1 text-lg border-b border-b-transparent hover:border-b-gray-300 focus:border-b-point focus:border-b-2"
          onChange={e=> updateQuestion(pi, qi, { q: e.target.value })}
          value={pages[pi].questions[qi].q}
        />
      </div>
      {hasDescription && (
        <CustomEditor 
          placeholder="질문 설명"
          onChange={(html)=> updateQuestion(pi, qi, { d: html})}
          content={d}
        />
      )}
    </div>
  )
}

export default QuestionTitleDescription