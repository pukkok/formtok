import { useAnswerStore } from "@/stores/useAnswerStore"
import LongTextAnswer from "./answer-forms/LongTextAnswer"
import ShortTextAnswer from "./answer-forms/ShortTextAnswer"
import SelectOneAnswer from "./answer-forms/SelectOneAnswer"
import SelectMultipleAnswers from "./answer-forms/SelectMultipleAnswers"
import DropDownAnswer from "./answer-forms/DropdownAnswer"
import DateTypeAnswer from "./answer-forms/DateTypeAnswer"

const AnswerForm = ({questionType, pId, qId, options, ...rest}) => {

  const answerBox = useAnswerStore(s => s.answerBox)
  
  if(!answerBox) return <></>

  return (
    <div className="my-5">
      {questionType === '서술형' && <LongTextAnswer pId={pId} qId={qId} answerBox={answerBox}/>}
      {questionType === '단답형' && <ShortTextAnswer pId={pId} qId={qId} answerBox={answerBox} />}
      {questionType === '객관식' && <SelectOneAnswer pId={pId} qId={qId} answerBox={answerBox} options={options} {...rest}/>}
      {questionType === '객관식(복수 선택)' && <SelectMultipleAnswers pId={pId} qId={qId} answerBox={answerBox} options={options} {...rest}/>}
      {questionType === '드롭다운' && <DropDownAnswer pId={pId} qId={qId} answerBox={answerBox} options={options} />}
      {['날짜', '시간', '날짜 + 시간'].includes(questionType) && <DateTypeAnswer pId={pId} qId={qId} answerBox={answerBox} questionType={questionType} {...rest}/>}
    </div>
  )
}

export default AnswerForm