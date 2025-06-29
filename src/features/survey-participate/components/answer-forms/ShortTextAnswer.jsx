import { useAnswerStore } from "@/stores/useAnswerStore"

const ShortTextAnswer = ({ pId, qId, answerBox }) => {
	const answerInValue = useAnswerStore(s => s.answerInValue)  

	return (
		<div className={`content-div
			w-full h-10 py-2 px-2.5 rounded-xl bg-light-w dark:bg-dark-elevated outline-none relative
		`}>
			<input 
				className="w-full"
				placeholder="답변 입력(100자 이내)" 
				onChange={e => answerInValue(e.target.value, pId, qId)} 
				value={answerBox[pId][qId].answer || ""}/>
		</div>
	)
}

export default ShortTextAnswer