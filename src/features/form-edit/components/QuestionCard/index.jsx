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
      border-2 p-2.5 
      dark:border-dark-hover border-light-w dark:bg-dark-surface bg-bright-a
      dark:text-bright-a text-black
      rounded-xl 
       min-h-45 mb-4 
      ${activeCard === `Q-${pi}-${qi}` ? 'dark:border-point border-point-hover' : 'dark:border-dark-line-base border-light-w'}
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