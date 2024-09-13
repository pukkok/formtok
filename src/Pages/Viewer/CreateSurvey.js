import React, { useEffect } from "react";
import Qcard from "../Survey/Qcard";
import Pcard from "../Survey/Pcard";
import SurveyNav from "../Survey/SurveyNav";
import { useRecoilValue } from "recoil";
import { activeCardAtom, pagesAtom } from "../../recoils/surveyAtoms";
import DropDown from "../../components/DropDown";
import Ecard from "../Survey/Ecard";
import usePageActions from "../../hooks/usePageActions";

function CreateSurvey () {
    const pages = useRecoilValue(pagesAtom)
    const activeCard = useRecoilValue(activeCardAtom)

    const { whereIsNextPage } = usePageActions()

    useEffect(() => {
        const activeTag = document.querySelector(`.active`)
        activeTag.scrollIntoView({behavior : "smooth", block: 'center'})
    }, [activeCard])

    const nextPageText = (page) => {
        if(page.next === 'end') return '설문지 제출'
        if(page.next){
            let text = pages[page.next].title.length > 15 ? pages[page.next].title.slice(0, 15) + '...' : pages[page.next].title ? pages[page.next].title : '제목 없음' 
            return `${page.next+1}페이지(${text}}로 이동`
        } 
    }

    return <section className="create-survey">
        <div className="editor-box">
            <div className="card-box">
                {pages.map((page, idx) => {
                    const {id, questions} = page
                    return (
                    <React.Fragment key={id}>
                    <Pcard pi={idx}/>
                      
                    {questions.map((question, idx2) => {
                        return <Qcard key={question.id} pi={idx} qi={idx2}/>
                    })}

                    {pages.length-1 !== idx ?
                    <div className="page-move">
                        <p>답변 후</p>
                        <DropDown initialItem={nextPageText(page) || '다음페이지로 이동'} width={300}>
                            <li><button onClick={()=>{whereIsNextPage(idx, null)}}>다음페이지로 이동</button></li>
                            {pages.filter((_, cnt) => cnt>idx).map((page, cnt) => {
                                const { title, id } = page
                                let text = title.length > 15 ? title.slice(0, 15) + '...' : title ? title : '제목 없음' 
                                return <li key={id}>
                                    <button onClick={()=>whereIsNextPage(idx, idx + cnt+1)}>{idx+1 + cnt+1}페이지({text})로 이동</button>
                                </li>
                            })}
                            <li><button onClick={()=>whereIsNextPage(idx, 'end')}>설문지 제출</button></li>
                        </DropDown>
                    </div> : 
                    <Ecard/>
                    }
                    </React.Fragment>
                    )
                })}
            </div>
            <SurveyNav/>
        </div>
        {/* <TableEditor/> */}
    </section>
}

export default CreateSurvey