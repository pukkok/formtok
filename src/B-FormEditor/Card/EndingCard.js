import React from "react"
import { useRecoilState, useRecoilValue } from "recoil"
import { activeCardAtom, endingMentAtom } from "../../C-Recoils/surveyAtoms"
import usePageActions from "../../C-Hooks/usePageActions"
import { FormCardWrapper } from "./FormCards.styled"
import classNames from "classnames"
import DescriptionEditor from "../../A-Components/DescriptionEditor"

function EndingCard () {

    const endingMent = useRecoilValue(endingMentAtom)
    const [activeCard, setActiveCard] = useRecoilState(activeCardAtom)

    const { changeEndingTitle, changeEndingDescription } = usePageActions()

    return (
    <FormCardWrapper className={classNames("card ending-field", 
    {active : `end` === activeCard})}
    onClick={()=>setActiveCard(`end`)}>
        <h4>엔딩 메세지</h4>
        <div>
            <input className="title-B"
            value={endingMent?.title || ""}
            placeholder="응답해 주셔서 감사합니다." 
            onChange={e=>changeEndingTitle(e)}
            />
            
            <DescriptionEditor
            value={endingMent?.description}
            placeholder={'추가 설명'}
            handleChange={changeEndingDescription}
            />
        </div>

    </FormCardWrapper>
    )
    
}

export default EndingCard