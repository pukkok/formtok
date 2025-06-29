import { useAnswerStore } from "@/stores/useAnswerStore"
import { toast } from "sonner"

const DateTypeAnswer = ({ pId, qId, answerBox, questionType, setPeriod }) => {

    const answerDateType = useAnswerStore(s => s.answerDateType)
    const answerPeriodValueReset = useAnswerStore(s => s.answerPeriodValueReset)

    const swtichByType = (questionType) => {
      switch (questionType) {
        case '날짜' : return 'date'
        case '시간' : return 'time'
        case '날짜 + 시간' : return 'datetime-local'
        default : return 'date'
      }
    }

    const valueCheck = () => {
      const {start, end} = answerBox[pId][qId]
      if(end === '') return
      if(start >= end){
        toast.warning('날짜 및 시간이 다시 정렬 됩니다.')
        answerPeriodValueReset(start, pId, qId, 'end')
        return // INFO: 유효하지 않은 경우 변경하지 않음
      }
    }

    return (
        <div className="flex items-center gap-2.5">
          <div className="w-fit h-10 px-2.5 py-2 rounded-xl bg-light-w dark:bg-dark-elevated">
            <input 
              className="calendar-indicator-filter"
              type={swtichByType(questionType)} 
              onChange={e => answerDateType(e.target.value, pId, qId, 'start')}
              onBlur={valueCheck}
              value={answerBox[pId]?.[qId]?.start || ""}
            />
          </div>
          {setPeriod && (<>
            <span>~</span>
          <div className="w-fit h-10 px-2.5 py-2 rounded-xl bg-light-w dark:bg-dark-elevated">
            <input 
              className="calendar-indicator-filter"
              type={swtichByType(questionType)}
              onChange={e => answerDateType(e.target.value, pId, qId, 'end')}
              onBlur={valueCheck}
              value={answerBox[pId]?.[qId]?.end || ""}/>
          </div>
          </>)}
        </div>
    )
}

export default DateTypeAnswer