'use client'

import { useFormEditStore } from "@/stores/useFormEditStore"
import React, { useEffect, useRef } from "react"
import PageCard from "./components/PageCard"
import QuestionCard from "./components/QuestionCard"
import EndingCard from "./components/EndingCard"
import NextPageNav from "./components/NextPageNav"
import { useFormEditUiStore } from "@/stores/useFormEditUiStore"

const FormEditor = () => {

  const pages = useFormEditStore(s => s.pages)
  const activeCard = useFormEditUiStore(s => s.activeCard)
  const refMap = useRef({})

  useEffect(() => {
    const el = refMap.current[activeCard]
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" })
    }
  }, [activeCard])

  return (
    <div className="p-4 max-w-4xl mx-auto">
      {pages.map((page, pi) => {
        const {id, questions} = page
        return (
          <React.Fragment key={id}>
            <PageCard pi={pi} ref={(el) => refMap.current[`P-${pi}`] = el}/>

            {questions.map((question, qi) => 
              <QuestionCard 
                key={question.id} pi={pi} qi={qi}
                ref={(el) => refMap.current[`Q-${pi}-${qi}`] = el}
              />
            )}

            {pages.length-1 !== pi ?
            <NextPageNav pages={pages} pi={pi} /> : 
            <EndingCard ref={(el) => refMap.current['end'] = el}/>}
          </React.Fragment>
        )
      })}
    </div>
  )
}

export default FormEditor