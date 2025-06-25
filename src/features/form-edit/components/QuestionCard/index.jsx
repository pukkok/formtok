'use client'

import { useFormEditUiStore } from "@/stores/useFormEditUiStore"
import QuestionForm from "./QuestionForm"
import QuestionOptionPanel from "./QuestionOptionPanel"
import QuestionTitleDescription from "./QuestionTitleDescription"

const QuestionCard = ({pi, qi, ref}) => {

  const activeCard = useFormEditUiStore(s => s.activeCard)
  const setActiveCard = useFormEditUiStore(s => s.setActiveCard)

  return (
    <div 
      ref={ref}
      onClick={()=>setActiveCard(`Q-${pi}-${qi}`)}
      className={`
      border-2 p-2.5 border-light-w rounded-xl bg-bright-a min-h-45 mb-4 text-black
      ${activeCard === `Q-${pi}-${qi}` ? 'border-point-hover' : 'border-light-w'}
      `}>
      <QuestionOptionPanel pi={pi} qi={qi}/>
      <article className="px-4">
        <QuestionTitleDescription pi={pi} qi={qi}/>
        <QuestionForm pi={pi} qi={qi}/>
      </article>
    </div>
  )
}

export default QuestionCard