import { useFormEditStore } from "@/stores/useFormEditStore"
import LongText from "./question-forms/LongText"
import ShortText from "./question-forms/ShortText"
import Multiple from "./question-forms/Multiple"
import SelectScore from "./question-forms/SelectScore"
import DateTypeInput from "./question-forms/DateTypeInput"
import TableEditor from "./question-forms/TableEditor"

const QuestionForm = ({pi, qi}) => {
  const pages = useFormEditStore(s => s.pages)
  const { type: style, setPeriod } = pages[pi].questions[qi]
  
  return (
    <div className="my-5">
      {style === '서술형' && <LongText />}
      {style === '단답형' && <ShortText />}
      {style === '점수 선택형' && <SelectScore pages={pages} pi={pi} qi={qi}/>}
      {style === '표형' && <TableEditor pages={pages} pi={pi} qi={qi}/>}
      {['객관식', '객관식(복수 선택)', '드롭다운'].includes(style) && (
        <Multiple style={style} pages={pages} pi={pi} qi={qi} />
      )}
      {['날짜', '시간', '날짜 + 시간'].includes(style) && (
        <DateTypeInput style={style} setPeriod={setPeriod}/>
      )}
    </div>
  )
}

export default QuestionForm