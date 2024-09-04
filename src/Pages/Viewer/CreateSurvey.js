import React, { useEffect, useState } from "react";
import { QuestionEditor, PageEditor, RemoteControl, TableEditor } from "../Survey";
import { useRecoilState, useRecoilValue } from "recoil";
import { activeCardAtom, pagesAtom } from "../../Recoil/AdminRecoil";
import classNames from "classnames";

function CreateSurvey () {
    const pages = useRecoilValue(pagesAtom)
    const [activeCard, setActiveCard] = useRecoilState(activeCardAtom)

    const moveCard = (idx, idx2) => {
        setActiveCard(`q-${idx}-${idx2}`)
    }

    useEffect(() => {
        const activeTag = document.querySelector(`.active`)
        activeTag.scrollIntoView({behavior : "smooth", block: 'center'})
    }, [activeCard])

    return <section className="create-survey">
        <div className="editor-box">
            <div className="card-box" >
                {pages.map((page, idx) => {
                    const {id, questions} = page
                    return (
                    <React.Fragment key={id}>
                        <div
                        className={classNames("card", 
                        {active : `h-${idx}` === activeCard})}
                        onClick={()=>setActiveCard(`h-${idx}`)}
                        >
                            <PageEditor pageIdx={idx}/>
                        </div>

                        {questions.map((question, idx2) => {
                            return <div
                            className={classNames("card", 
                            {active : `q-${idx}-${idx2}` === activeCard})}
                            onClick={()=>moveCard(idx, idx2)}
                            key={question.id}>
                                <QuestionEditor pageIdx={idx} questionIdx={idx2} />
                            </div>
                        })}
                        <div>
                            <p>답변 후</p>
                            {pages.map((page, idx) => {
                                const { title } = page
                                return <div key={idx}>{idx+1}페이지({title? title : '제목 없음'})로 이동</div>
                            })}
                        </div>
                    </React.Fragment>
                    )
                })}
            </div>
            <RemoteControl/>
        </div>
        
        <TableEditor/>

    </section>
}

export default CreateSurvey