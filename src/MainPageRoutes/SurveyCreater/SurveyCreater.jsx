import React, { useEffect } from "react";

import PageCard from "../Survey/Card_Page";
import QuestionCard from "../Survey/Card_Question";
import EndingCard from "../Survey/Card_End";

import SurveyCreaterWrapper from "./_StyledSurveyCreater";

import SurveyNav from "../Survey/SurveyNav";
import { useRecoilValue } from "recoil";
import { activeCardAtom, pagesAtom } from "../../Recoils/surveyAtoms";
import DropDown from "../../Components/DropDown";
import usePageActions from "../../Hooks/usePageActions";

function SurveyCreater () {
    const pages = useRecoilValue(pagesAtom)
    const activeCard = useRecoilValue(activeCardAtom)

    const { whereIsNextPage } = usePageActions()

    useEffect(() => {
        const activeTag = document.querySelector(`.card-box .card.active`)
        activeTag &&
        activeTag.scrollIntoView({behavior : "smooth", block: 'center'})
    }, [activeCard])

    const nextPageText = (page) => {
        if(page.next === 'end') return '설문지 제출'
        if(page.next){
            let text = pages[page.next].title.length > 8 ? pages[page.next].title.slice(0, 8) + '...' : pages[page.next].title ? pages[page.next].title : '제목 없음' 
            return `${page.next+1}페이지(${text}}로 이동`
        } 
    }

    return <SurveyCreaterWrapper>
            <div className="card-box">
                {pages.map((page, idx) => {
                    const {id, questions} = page
                    return (
                    <React.Fragment key={id}>
                    <PageCard pi={idx}/>
                      
                    {questions.map((question, idx2) => {
                        return <QuestionCard key={question.id} pi={idx} qi={idx2}/>
                    })}

                    {pages.length-1 !== idx ?
                    <div className="page-move">
                        <p>답변 후</p>
                        <DropDown initialItem={nextPageText(page) || '다음페이지로 이동'} width={320}>
                            <li><button onClick={()=>{whereIsNextPage(idx, null)}}>다음페이지로 이동</button></li>
                            {pages.filter((_, cnt) => cnt>idx).map((page, cnt) => {
                                const { title, id } = page
                                let text = title.length > 8 ? title.slice(0, 8) + '...' : title ? title : '제목 없음' 
                                return <li key={id}>
                                    <button onClick={()=>whereIsNextPage(idx, idx + cnt+1)}>{idx+1 + cnt+1}페이지({text})로 이동</button>
                                </li>
                            })}
                            <li><button onClick={()=>whereIsNextPage(idx, 'end')}>설문지 제출</button></li>
                        </DropDown>
                    </div> : 
                    <EndingCard />
                    }
                    </React.Fragment>
                    )
                })}
            </div>
            <SurveyNav />
    </SurveyCreaterWrapper>
}

export default SurveyCreater