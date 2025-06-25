import MoreVert from "@/components/MoreVert"
import MoreButton from "./MoreButton"
import { useFormEditUiStore } from "@/stores/useFormEditUiStore"
import { useFormEditStore } from "@/stores/useFormEditStore"

const QuestionSummary = ({question, pi, qi, isActive, ref, ...props}) => {

  const setActiveCard = useFormEditUiStore(s => s.setActiveCard)

  const saveQuestionAction = useFormEditStore(s => s.saveQuestionAction)
  const addQuestion = useFormEditStore(s => s.addQuestion)
  const deleteQuestion = useFormEditStore(s=> s.deleteQuestion)

  const textColor = (isQ, isActive) => {
    if(isActive) return 'text-bright-a'
    if(isQ) return 'text-black'
    return 'text-[#aaa]'
  }

  return (
    <div 
      className={`
        group px-2.5 my-1 h-10 rounded-xl flex items-center relative
        ${isActive ? 'bg-point text-bright-a' : ''} hover:bg-point-hover hover:text-bright-a
        transition-[background-color_0.3s]
      `}
      ref={ref}
      onClick={()=> setActiveCard(`Q-${pi}-${qi}`)}
      {...props}
    >
      <p className={`maxw-w-4/5 truncate ${textColor(question.q, isActive)} group-hover:text-bright-a`}>{question.q || `${qi +1}번 문항`}</p>

      {isActive &&
      <div className="ml-auto">
        <MoreVert 
          addIsOpenClass={'bg-point'}
          addButtonClass={'hover:bg-none'}
          addOptionClass={'w-20 text-black'}>
          <MoreButton 
            onClick={()=> saveQuestionAction(pi, qi)}
            >저장</MoreButton>
          <MoreButton 
            onClick={() => addQuestion(pi, qi, true)}
            >복사</MoreButton>
          <MoreButton 
            onClick={()=> deleteQuestion(pi, qi)}
            className="text-red-500"
            >삭제</MoreButton>
        </MoreVert>
      </div>
      }
    </div>
  )
}

export default QuestionSummary