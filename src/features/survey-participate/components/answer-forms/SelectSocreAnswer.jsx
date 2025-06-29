import { useAnswerStore } from "@/stores/useAnswerStore"
import ScoreCanvas from "@/components/ScoreCanvas"

const SelectScoreAnswer = ({ pId, qId, answerBox, scoreRanges }) => {

  const {min, max, minText, maxText} = scoreRanges
  
  const answerInValue = useAnswerStore(s => s.answerInValue)

  return(
    <div className="w-4/5 mx-auto mt-4">
      <div className="flex justify-between text-[#99A1AF] dark:light-w">
        <p>{minText}</p>
        <p>{maxText}</p>
      </div>
      <ScoreCanvas min={min} max={max} selected={answerBox[pId][qId].answer} onSelect={(value)=>answerInValue(value, pId, qId)}/>  
    </div>
  )
}

export default SelectScoreAnswer