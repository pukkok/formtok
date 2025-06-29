import { useAnswerStore } from "@/stores/useAnswerStore"

const ExtraInput = ({pId, qId, answerBox}) => {

  const extraInValue = useAnswerStore(s => s.extraInValue)

  return (
    <div className={`w-full h-10 py-2 px-2.5 rounded-xl 
      bg-light-w dark:bg-dark-elevated outline-none mt-3
    `}>
      <input 
        onChange={e => extraInValue(e.target.value, pId, qId)} 
        value={answerBox[pId][qId].extra || ''}
        placeholder="내용을 입력해 주세요."
      />
    </div>
  )
}

export default ExtraInput