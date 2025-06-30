import React, { useEffect, useRef, useState } from "react"
import { questionTypeList } from "../../utils/questionTypeList"
import { getQuestionGroup } from "@/utils/questionBankFilter"
import { QUESTION_BANK_TEXT_COLOR_MAP } from "@/utils/workColor"
import { useQuestionBankStore } from "@/stores/useQuestionBankStore"
import { useAuthStore } from "@/stores/useAuthStore"
import { CustomCheckBox } from "../../components/MultipleButtons"
import ModalContainer from "@/components/Modal/ModalContainer"
import QuestionPreviewModal from "./QuestionPreviewModal"

const QuestionBankTemplateBox = () => {
	const modalRef = useRef()
	const [readMore, setReadMore] = useState()
	const token = useAuthStore(s => s.token)
	const searchedQuestions = useQuestionBankStore(s => s.searchedQuestions)
	const loadQuestions = useQuestionBankStore(s=> s.loadQuestions)

	const selectedQuestions = useQuestionBankStore(s => s.selectedQuestions)
	const toggleSelectedQuestions = useQuestionBankStore(s => s.toggleSelectedQuestions)

	useEffect(() => {
		loadQuestions()
	}, [loadQuestions])

	const readMoreView = (faq, icon) => {
		setReadMore({...faq, icon})
		modalRef.current?.open()
	}

	return (

		<div className="grid grid-cols-[repeat(auto-fit,_minmax(330px,_350px))] flex-wrap gap-y-4 gap-x-3 mt-7.5">
			{searchedQuestions.length > 0 ? 
			searchedQuestions.map((question) => {
				const {id, q, options, type} = question
				const form = questionTypeList.find(x => x.type === type)

				return (
					<div key={id} className="w-full h-full p-5 rounded-xl dark:bg-dark-surface bg-bright-a">
						<div className="flex justify-between items-center user-none">
							<button onClick={()=>toggleSelectedQuestions(id)} className="cursor-pointer">
								<CustomCheckBox isChecked={(selectedQuestions && selectedQuestions.includes(id))}/>
							</button>
							<p className="border px-1 pb-0.5 pt-1 text-xs dark:border-[#446] border-gray-400 text-gray-400 rounded-sm">{type}</p>
						</div>

						<p className={`flex justify-center mb-2 ${QUESTION_BANK_TEXT_COLOR_MAP[getQuestionGroup(type)]}`}>
							{React.cloneElement(form.icon, { className: 'text-6xl' })}
						</p>

						<h4 className="text-lg text-center truncate">Q. {q}</h4>
						
						<div className="my-3 py-2 pl-4 text-left h-27 overflow-scroll bg-dark-base border-dark-line-hover border rounded-lg">
							{options.map((option) => {
								return <p className="not-first:pt-1" key={option.id}>{option.answer}</p>
							})}
						</div>

						<div className="flex justify-center">
							<button 
								className="dark:bg-dark-elevated px-3 py-2 rounded-xl w-fit hover:bg-point cursor-pointer" 
								onClick={() => readMoreView(question, form.icon)}>자세히 보기</button>
						</div>
					</div>
				)
			}) : token ? <p>검색 결과가 없습니다.</p> : <p>해당 탭은 로그인 후 사용 가능합니다.</p>}

			<ModalContainer ref={modalRef}>
				<QuestionPreviewModal readMore={readMore}/>
			</ModalContainer>
		</div>
	)
}
export default QuestionBankTemplateBox