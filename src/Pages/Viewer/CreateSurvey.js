import React, { useEffect } from "react";
import Qcard from "../Survey/Qcard";
import Pcard from "../Survey/Pcard";
import SurveyNav from "../Survey/SurveyNav";
import { useRecoilValue } from "recoil";
import { activeCardAtom, pagesAtom } from "../../recoils/surveyAtoms";
import DropDown from "../../components/DropDown";
import Ecard from "../Survey/Ecard";

function CreateSurvey () {
    const pages = useRecoilValue(pagesAtom)
    const activeCard = useRecoilValue(activeCardAtom)

    useEffect(() => {
        const activeTag = document.querySelector(`.active`)
        activeTag.scrollIntoView({behavior : "smooth", block: 'center'})
    }, [activeCard])

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
                        <DropDown initialItem={'다음페이지로 이동'}>
                            <li><button onClick={()=>{}}>다음페이지로 이동</button></li>
                            {pages.map((page, cnt) => {
                                const { title, id } = page
                                return <li key={id}>
                                    <button>{cnt+1}페이지({title ? title : '제목 없음'})로 이동</button>
                                </li>
                            })}
                            <li><button onClick={()=>{}}>설문지 제출</button></li>
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