import ModalCancelButton from "@/components/Modal/ModalCancelButton.style"
import QuestionPreviewRenderer from "./QuestionPreviewRenderer"
import CustomEditor from "@/components/CustomEditor"

const QuestionMultiPreviewModal = ({ questions=[], selectedIds=[], onClose }) => {
  const selected = questions.filter(question => selectedIds.includes(question.id))

  return (
    <div className="p-5 rounded-xl border-2 border-point dark:bg-dark-base bg-light-w dark:text-bright-c max-h-[90vh] overflow-y-auto">
      {selected.map((question, i) => (
        <div key={question.id} className="mb-6 last:mb-0 min-w-3xl">
          <div className="border-2 pt-2.5 pb-1 px-5
            dark:border-dark-hover border-light-w dark:bg-dark-surface bg-bright-a
            dark:text-bright-a text-black rounded-xl">
            <div className="flex items-center relative">
              <span className={`absolute -left-3 ${question.essential ? 'text-red-500 visible' : 'invisible'}`}>*</span>
              <span className="mr-1 text-lg">Q{i + 1}.</span>
              <p className="flex-1 text-lg">{question.q || '제목없는 질문'}</p>
            </div>
            {question.d && <CustomEditor content={question.d} readOnly />}
            <QuestionPreviewRenderer questionType={question.type} {...question} />
          </div>
        </div>
      ))}

      <footer className="border-t dark:border-t-dark-line-hover border-t-gray-300 w-full pt-2.5 flex justify-end gap-3">
        <ModalCancelButton onClick={onClose}>닫기</ModalCancelButton>
      </footer>
    </div>
  )
}

export default QuestionMultiPreviewModal