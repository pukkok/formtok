import ExtraInput from "./ExtraInput"
import { RadioButton } from "@/components/MultipleButtons"
import { useAnswerStore } from "@/stores/useAnswerStore"

function SelectOneAnswer ({ pId, qId, answerBox, options, hasExtraOption }) {

  const answerPickOne = useAnswerStore(s => s.answerPickOne)
  const extraPick = useAnswerStore(s => s.extraPick)

  return (<>
    {options.map(option => option.answer && (
        <RadioButton 
          key={option.id} 
          onClick={() => answerPickOne(option.answer, pId, qId)}
          pick={answerBox[pId][qId].answer || ''}
        >{option.answer}</RadioButton>)
      )
    }

    {hasExtraOption && (<>
      <RadioButton
        onClick={() => extraPick(pId, qId)} 
        pick={answerBox[pId][qId].useExtra && '기타'}
      >기타</RadioButton>
  
      {answerBox[pId][qId].useExtra && (
        <ExtraInput pId={pId} qId={qId} answerBox={answerBox} />
      )}
    </>)}
  </>) 
}

export default SelectOneAnswer