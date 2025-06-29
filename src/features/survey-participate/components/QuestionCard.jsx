import CustomEditor from "@/components/CustomEditor"
import AnswerForm from "./AnswerForm"

const QuestionCard = ({q, d, listStyle, essential, questionType, options, pId, qId, ...props}) => {

  return (
    <div className="border-2 pt-2.5 pb-1 px-5
      dark:border-dark-hover border-light-w dark:bg-dark-surface bg-bright-a
      dark:text-bright-a text-black
      rounded-xl mb-4">
        <div className="flex items-center relative">
          <span className={`absolute -left-3 ${essential ? 'text-red-500 visible' : 'invisible'}`}>*</span>
          {listStyle && <span className="mr-1 text-lg">{listStyle}</span>}
          <p className="flex-1 text-lg">{q || '제목없는 질문'}</p>
        </div>
        {d && <CustomEditor content={d} readOnly={true}/>}
        <AnswerForm questionType={questionType} pId={pId} qId={qId} options={options} {...props}/>
    </div>
  )
}

export default QuestionCard