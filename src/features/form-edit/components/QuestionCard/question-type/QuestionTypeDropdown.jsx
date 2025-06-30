'use client'

import { useFormEditStore } from "@/stores/useFormEditStore"
import { questionTypeList, questionTypeMap } from "@/utils/questionTypeList"
import Dropdown from "@/components/Dropdown"

const QuestionTypeDropdown = ({ selectedQuestion, pi, qi }) => {
  
  const icon = questionTypeMap.get(selectedQuestion.type)
  const updateQuestion = useFormEditStore(s => s.updateQuestion)

  return (
    <Dropdown
      initialItem={<>{icon}{selectedQuestion.type}</>}>
      {questionTypeList.map(({ type, icon }) => (
        <button 
        onClick={()=> {
          updateQuestion(pi, qi, {type})
        } }
        className="w-full flex px-1.5 py-2 items-center gap-2.5 mb-1" 
        key={type}>{icon}{type}</button>
      ))}
    </Dropdown>
  )
}

export default QuestionTypeDropdown
