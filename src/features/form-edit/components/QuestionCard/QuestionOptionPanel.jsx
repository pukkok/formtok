'use client'

import ToggleButton from "@/components/ToggleButton"
import QuestionTypeDropdown from "./question-type/QuestionTypeDropdown"
import QuestionMoreVert from "./question-type/QuestionTypeMoreVert"
import { useFormEditStore } from "@/stores/useFormEditStore"

const QuestionOptionPanel = ({pi, qi}) => {

  const pages = useFormEditStore(s => s.pages)
  const selectedQuestion = pages[pi].questions[qi]
  
  const updateQuestion = useFormEditStore(s => s.updateQuestion)

  return (
    <div className="flex items-center justify-end gap-4 mb-1">
      <div className="w-3xs mr-auto">
        <QuestionTypeDropdown selectedQuestion={selectedQuestion} pi={pi} qi={qi}/>
      </div>

      <div className="flex gap-1">
        <p>필수</p> <ToggleButton 
          onClick={()=>updateQuestion(pi, qi, {essential: !selectedQuestion.essential})}
          isOn={selectedQuestion.essential}
        />
      </div>

      <QuestionMoreVert selectedQuestion={selectedQuestion} pi={pi} qi={qi} />
    </div>
  )
}

export default QuestionOptionPanel