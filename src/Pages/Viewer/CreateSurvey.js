import React, { useEffect } from "react";
import Qcard from "../Survey/Qcard";
import Pcard from "../Survey/Pcard";
import SurveyNav from "../Survey/SurveyNav";
import TableEditor from '../Survey/TableEditor'
import { useRecoilState, useRecoilValue } from "recoil";
import { activeCardAtom, pagesAtom } from "../../recoils/surveyAtoms";
import classNames from "classnames";
import useOutsideClick from "../../hooks/useOutsideClick";

function CreateSurvey () {
    const pages = useRecoilValue(pagesAtom)
    const [activeCard, setActiveCard] = useRecoilState(activeCardAtom)

    const { isOpen : isOpenMoveList, setIsOpen : setIsOpenMoveList, ref : dropdownRef } = useOutsideClick(false)

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
                            <div className="drop-down-wrapper" ref={dropdownRef}>
                                <button className={classNames("drop-down-btn", {open : isOpenMoveList})}
                                onClick={()=>{setIsOpenMoveList(!isOpenMoveList)}}>
                                다음페이지로 이동</button>
                                <ul className={classNames({open: isOpenMoveList})}>
                                    <li><button onClick={()=>{}}>다음페이지로 이동</button></li>
                                    {pages.map(page => {
                                        const { title, id } = page
                                        return <li key={id}>
                                            <button>{idx+1}페이지({title ? title : '제목 없음'})로 이동</button>
                                        </li>
                                    })}
                                    <li><button onClick={()=>{}}>설문지 제출</button></li>
                                </ul>
                            </div>
                        </div>
                    </React.Fragment>
                    )
                })}
            </div>
            <SurveyNav/>
        </div>
        
        <TableEditor/>

    </section>
}

export default CreateSurvey