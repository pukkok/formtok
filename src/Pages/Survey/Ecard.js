import React from "react";
import { useRecoilState } from "recoil";
import { activeCardAtom, endingMentAtom } from "../../recoils/surveyAtoms";
import DescriptionEditor from "../../components/DescriptionEditor";
import classNames from "classnames";
import StyledCard from "../../styles/StyledCard";

function Ecard () {

    const [endingMent, setEndingMent] = useRecoilState(endingMentAtom)
    const [activeCard, setActiveCard] = useRecoilState(activeCardAtom)

    return (
        <StyledCard>
    <div className={classNames("card ending-field", 
    {active : `end` === activeCard})}
    onClick={()=>setActiveCard(`end`)}>

        <h4 className="pd">엔딩 메세지</h4>
        <div className="pd">
            <input className="title-B" 
            placeholder="응답해 주셔서 감사합니다." onChange={e=>setEndingMent(ment => ment = {...ment, title : e.target.value})}/>
            <DescriptionEditor
            value={endingMent.description}
            placeholder={'추가 설명'}
            // changeHandler={e => setEndingMent(ment => ment = {...ment, description : e.target.value})}
            />
        </div>

    </div>
    </StyledCard>
    )
    
}

export default Ecard