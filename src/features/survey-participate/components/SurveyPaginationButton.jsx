import { GoArrowLeft, GoArrowRight } from "react-icons/go"

const SurveyPaginationButton = ({ 
  isFirst, 
  isLast, 
  onPrev, 
  onNext, 
  onSubmit 
}) => {
  return (
    <div className="flex gap-3 items-center mt-4">
      {!isFirst && (
        <button
          onClick={onPrev}
          className={`
            px-4 py-2 text-sm flex items-center gap-2 rounded border 
            text-gray-700 dark:text-gray-200
            bg-white dark:bg-dark-surface
            border-gray-300 dark:border-dark-line-light
            hover:bg-gray-100 dark:hover:bg-dark-hover
          `}
        >
          <GoArrowLeft />
          이전페이지
        </button>
      )}

      {!isLast ? (
        <button
          onClick={onNext}
          className="px-4 py-2 text-sm flex items-center gap-2 bg-point text-white rounded hover:opacity-90"
        >
          다음페이지
          <GoArrowRight />
        </button>
      ) : (
        <button
          onClick={onSubmit}
          className="px-4 py-2 text-sm flex items-center gap-2 bg-point text-white rounded hover:opacity-90"
        >
          제출
          <GoArrowRight />
        </button>
      )}
    </div>
  )
}

export default SurveyPaginationButton
