import ModalCancelButton from "@/components/Modal/ModalCancelButton.style"
import QuestionPreviewRenderer from "./QuestionPreviewRenderer"
import CustomEditor from "@/components/CustomEditor"

const QuestionPreviewModal = ({ readMore, onClose }) => {

  const { q, d, icon, type: questionType, options, ...rest} = readMore

  return (
    <div className="p-5 rounded-xl border-2 border-point dark:bg-dark-base bg-light-w dark:text-bright-c">

      <div className="border-2 pt-2.5 pb-1 px-5 min-w-3xl
        dark:border-dark-hover border-light-w dark:bg-dark-surface bg-bright-a
        dark:text-bright-a text-black
        rounded-xl mb-4">
        <div className="flex items-center relative">
            <span className={`absolute -left-3 ${readMore.essential ? 'text-red-500 visible' : 'invisible'}`}>*</span>
            <span className="mr-1 text-lg">Q .</span>
            <p className="flex-1 text-lg">{q || '제목없는 질문'}</p>
          </div>
          {d && <CustomEditor content={d} readOnly={true}/>}
          <QuestionPreviewRenderer questionType={questionType} options={options} {...rest}/>
      </div>
      
      <footer className="border-t border-t-gray-300 dark:border-t-dark-line-hover w-full pt-2.5 flex justify-end gap-3">
        <ModalCancelButton onClick={onClose} />
      </footer>
    </div>
  )
}

export default QuestionPreviewModal