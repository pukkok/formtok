'use client'

import { useFormEditStore } from "@/stores/useFormEditStore"
import React from "react"
import PageCard from "./components/PageCard"
import QuestionCard from "./components/QuestionCard"
import EndingCard from "./components/EndingCard"
import NextPageNav from "./components/NextPageNav"

const FormEditor = () => {

  const pages = useFormEditStore(s => s.pages)

  return (
    <div className="p-4 max-w-4xl mx-auto">
      {pages.map((page, pi) => {
        const {id, questions} = page
        return (
          <React.Fragment key={id}>
            <PageCard pi={pi}/>

            {questions.map((question, qi) => 
              <QuestionCard key={question.id} pi={pi} qi={qi}/>
            )}

            {pages.length-1 !== pi ?
            <NextPageNav pages={pages} pi={pi} /> : 
            <EndingCard />}
          </React.Fragment>
        )
      })}
    </div>
  )
}

export default FormEditor