import React, { useState, useEffect } from "react";

import { useRecoilValue, useRecoilState } from "recoil";
import { pagesAtom, endingMentAtom, activeCardAtom, surveyListStyleSelector } from "../../Recoils/surveyAtoms";

import usePageActions from "../../Hooks/usePageActions";
import classNames from "classnames";
import { FormCardWrapper, QuestionOptionsWrapper } from "./FormCards.styled";
import questionForms from '../../C3-Datas/questionList'

import QuestionForm from "../QuestionForm";

import DescriptionEditor from "../../1-Components/DescriptionEditor";
import ToggleButton from '../../1-Components/ToggleButton'
import DropDown from "../../1-Components/DropDown";
import MoreVert from "../../1-Components/MoreVert";
import { Icon } from "../../1-Components/Icons";

function PageCard({pi}) {
    const pages = useRecoilValue(pagesAtom)
    const [activeCard, setActiveCard] = useRecoilState(activeCardAtom)

    const [pageCnt, setPageCnt] = useState('1/1')
    useEffect(() => {
        setPageCnt(`${pi+1}/${pages.length}`)
    }, [pages, pi])

    const {changePTitle, changePDescription} = usePageActions()
    
    return (
        <FormCardWrapper 
        className={classNames("card", {active : `P-${pi}` === activeCard})}
        onClick={()=>setActiveCard(`P-${pi}`)}>
            <h4>{pageCnt} 페이지</h4>
            <div>
                <input className="title-A" 
                placeholder="페이지 제목" 
                onChange={e=>changePTitle(e, pi)} value={pages[pi].title}/>
                
                <DescriptionEditor
                value={pages[pi].description}
                pi={pi}
                placeholder={'페이지 설명'}
                handleChange={changePDescription}
                />
            </div>
        </FormCardWrapper>
    )
}




export {PageCard, QuestionCard, EndingCard}