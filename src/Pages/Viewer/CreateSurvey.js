import React, { useEffect } from "react";
import Qcard from "../Survey/Qcard";
import Pcard from "../Survey/Pcard";
import RemoteControl from "../Survey/RemoteControl";
import TableEditor from '../Survey/TableEditor'
import { useRecoilState, useRecoilValue } from "recoil";
import { activeCardAtom, pagesAtom } from "../../recoils/surveyAtoms";
import classNames from "classnames";

function CreateSurvey () {
    const pages = useRecoilValue(pagesAtom)
    const [activeCard, setActiveCard] = useRecoilState(activeCardAtom)

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
                        {active : `P-${idx}` === activeCard})}
                        onClick={()=>setActiveCard(`P-${idx}`)}
                        >
                            <Pcard pi={idx}/>
                        </div>

                        {questions.map((question, idx2) => {
                            return <div
                            className={classNames("card", 
                            {active : `Q-${idx}-${idx2}` === activeCard})}
                            onClick={()=>setActiveCard(`Q-${idx}-${idx2}`)}
                            key={question.id}>
                                <Qcard pi={idx} qi={idx2} />
                            </div>
                        })}
                        <div className="page-move">
                            <p>답변 후</p>
                            <button className="drop-down-btn">다음페이지로 이동</button>
                            <div className="next">
                                <button onClick={()=>{}}>다음페이지로 이동</button>
                                {pages.map((page, idx) => {
                                    const { title } = page
                                    return <div key={idx}>{idx+1}페이지({title ? title : '제목 없음'})로 이동</div>
                                })}
                                <button onClick={()=>{}}>설문지 제출</button>
                            </div>
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