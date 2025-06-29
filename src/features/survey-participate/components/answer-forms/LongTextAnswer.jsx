import { useAnswerStore } from "@/stores/useAnswerStore"

const LongTextAnswer = ({ pId, qId, answerBox }) => {
  const answerInHTML = useAnswerStore(s => s.answerInHTML)

  return (
    <div
      className={`content-div
        w-full h-20 py-2 px-2.5 rounded-xl bg-light-w dark:bg-dark-elevated outline-none relative
      `}
      contentEditable
      data-placeholder="답변 입력(최대 1000자)"
      onBlur={e => answerInHTML(e.target.innerHTML, pId, qId)}
      dangerouslySetInnerHTML={{ __html: answerBox[pId][qId].answer || '' }}
    />
  )
}

export default LongTextAnswer