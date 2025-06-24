import ToggleButton from "@/components/ToggleButton"
import MoreVert from "@/components/MoreVert"
import { useFormEditStore } from "@/stores/useFormEditStore"

const QuestionMoreVert = ({ selectedQuestion, pi, qi }) => {

  const updateQuestion = useFormEditStore(s => s.updateQuestion)

  return (
    <MoreVert 
      autoClose={false}
      addOptionClass={'w-[210px] gap-2'}
    >
      <p className="flex items-center justify-between">설명추가 
        <ToggleButton 
          onClick={()=>updateQuestion(pi, qi, {hasDescription: !selectedQuestion.hasDescription})} 
          isOn={selectedQuestion.hasDescription}/>
      </p>
      <p className="flex items-center justify-between">답변별 페이지 이동 
        <ToggleButton 
          onClick={()=>updateQuestion(pi, qi, {setNextToPage: !selectedQuestion.setNextToPage})}
          isOn={selectedQuestion.setNextToPage}
        />
      </p>
      {["날짜", "시간", "날짜 + 시간"].includes(selectedQuestion.type) && (
      <p className="flex items-center justify-between">기간으로 설정 
        <ToggleButton 
          onClick={()=>updateQuestion(pi, qi, {setPeriod: !selectedQuestion.setPeriod}) }
          isOn={selectedQuestion.setPeriod}
        />
      </p>
      )}
    </MoreVert>
  )
}

export default QuestionMoreVert
