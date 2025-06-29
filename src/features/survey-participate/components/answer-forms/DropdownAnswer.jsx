import { useAnswerStore } from "@/stores/useAnswerStore"
import Dropdown from "@/components/Dropdown"

const DropDownAnswer = ({ pId, qId, answerBox, options }) => {
    const answerInHTML = useAnswerStore(s => s.answerInHTML)

    return (
      <div className="w-2xs">
        <Dropdown initialItem={answerBox[pId][qId].answer || '옵션을 선택해주세요'}>
          <button 
            className="w-full text-left px-2 py-2 rounded-md"
            onClick={e => answerInHTML(e.target.innerHTML, pId, qId, true)}>옵션을 선택해주세요</button>
          {options.map(option => {
            return (option.answer && 
              <button 
                key={option.id} 
                className="w-full text-left px-2 py-2 rounded-md"
                onClick={e => answerInHTML(e.target.innerHTML, pId, qId)}>{option.answer}</button>
            )
          })}
        </Dropdown>
      </div>
    )
}

export default DropDownAnswer