import { useAnswerStore } from "@/stores/useAnswerStore"
import { CheckBoxButton } from "@/components/MultipleButtons"
import ExtraInput from "./ExtraInput"

const SelectMultipleAnswers = ({ pId, qId, answerBox, options, hasExtraOption }) => {

  const answerPickMultiple = useAnswerStore(s=> s.answerPickMultiple)
  const extraPick = useAnswerStore(s => s.extraPick)

  return (<>
    {options.map(option => option.answer && (
      <CheckBoxButton 
        key={option.id}
        onClick={() => answerPickMultiple(option.answer, pId, qId)}
        picks={answerBox[pId][qId].answer || []}
      >{option.answer}</CheckBoxButton>)
    )}
    
    {hasExtraOption && (<>
      <CheckBoxButton
        onClick={() => extraPick(pId, qId, true)} 
        picks={answerBox[pId][qId].useExtra ? '기타' : ''}
      >기타</CheckBoxButton>
  
      {answerBox[pId][qId].useExtra && (
        <ExtraInput pId={pId} qId={qId} answerBox={answerBox}/>
      )}
    </>)}
  </>)
}

export default SelectMultipleAnswers