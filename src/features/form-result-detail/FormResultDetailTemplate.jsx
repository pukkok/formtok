
import { useFormManageStore } from "@/stores/useFormManageStore"
import { useEffect, useState } from "react"
import ChartBox from "./components/ChartBox"
import ExtraBox from "./components/ExtraBox"
import TextBox from "./components/TextBox"
import DateBox from "./components/DateBox"
import { parseAnswers } from "@/utils/parseAnswerStats"

const FormResultDetailTemplate = () => {

  const resultPages = useFormManageStore(s => s.resultPages)
  const resultAnswers = useFormManageStore(s => s.resultAnswers)

  if(resultAnswers.length === 0) return <p className="p-8">제출된 응답이 없습니다.</p>

  return (
    <div className="p-4 h-[calc(100vh-60px)] overflow-scroll">
      {(resultPages.length> 0 && resultAnswers.length > 0) && resultPages.map((page, pi) => {
        const { title, id: pid, questions } = page 

        return (
          <div key={pid} className="p-4 max-w-4xl mx-auto">
            <h3 className="text-lg mb-2">{pi+1}P. {title || '제목없는 설문지'}</h3>
            <div className="">
              {questions.map((questions, qi) => {
              const { q, id: qid, type, options, hasExtraOption, scoreRanges } = questions

              const { values, extras, count } = parseAnswers(type, resultAnswers, pid, qid, options, hasExtraOption, scoreRanges)

              return (
                <div key={qid} className="p-4 
                dark:bg-dark-surface bg-bright-a rounded-lg
                dark:text-bright-a text-black mb-4 border dark:border-dark-line-base border-light-w">
                  <h4 className="flex justify-between mb-8">{qi+1}. {q || '제목없는 질문'}
                    <p className="text-sm">응답인원 {count} <span className="border px-1 pb-0.5 pt-1 text-xs dark:border-[#446] dark:text-gray-400 border-gray-400 text-gray-600 rounded-sm ml-2">{type}</span></p>
                  </h4>

                  {['객관식', '객관식(복수 선택)', '드롭다운', '점수 선택형'].includes(type) && (
                    <ChartBox qid={qid} values={values} />
                  )}

                  {['서술형', '단답형'].includes(type) && (
                    <TextBox pid={pid} values={values} />
                  )}

                  {['날짜', '시간', '날짜 + 시간'].includes(type) && (
                    <DateBox dateType={type} values={values} qid={qid} />
                  )}

                  {extras.length > 0 && (
                    <ExtraBox extras={extras}/>
                  )}
                </div>
              )
            })}
            </div>
           
            
          </div>
        )
      })}
    </div>
  )
}

export default FormResultDetailTemplate