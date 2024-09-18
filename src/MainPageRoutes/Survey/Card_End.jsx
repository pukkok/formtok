import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { activeCardAtom, endingMentAtom } from "../../Recoils/surveyAtoms";
import DescriptionEditor from "../../Components/CKEditor/DescriptionEditor";
import classNames from "classnames";
import {SurveyCard} from "./_StyledSurveyCard";
import usePageActions from "../../Hooks/usePageActions";

function EndingCard () {

    const endingMent = useRecoilValue(endingMentAtom)
    const [activeCard, setActiveCard] = useRecoilState(activeCardAtom)

    const { changeEndingTitle, changeEndingDescription } = usePageActions()

    return (
    <SurveyCard className={classNames("card ending-field", 
    {active : `end` === activeCard})}
    onClick={()=>setActiveCard(`end`)}>
        <h4>엔딩 메세지</h4>
        <div>
            <input className="title-B"
            value={endingMent.title}
            placeholder="응답해 주셔서 감사합니다." 
            onChange={e=>changeEndingTitle(e)}
            />
            
            <DescriptionEditor
            value={endingMent.description}
            placeholder={'추가 설명'}
            handleChange={changeEndingDescription}
            />
        </div>

    </SurveyCard>
    )
    
}

export default EndingCard