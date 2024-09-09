import React from "react";
import { useRecoilState } from "recoil";
import { activeCardAtom, endingMentAtom } from "../../recoils/surveyAtoms";
import DescriptionInput from "../../components/DescriptionInput";
import classNames from "classnames";

function Ecard () {

    const [endingMent, setEndingMent] = useRecoilState(endingMentAtom)
    const [activeCard, setActiveCard] = useRecoilState(activeCardAtom)

    return (
    <div className={classNames("card ending-field", 
    {active : `end` === activeCard})}
    onClick={()=>setActiveCard(`end`)}>

        <div className="pd">
            <input className="title-B" 
            placeholder="응답해 주셔서 감사합니다." onChange={e=>setEndingMent(ment => ment = {...ment, title : e.target.value})}/>
            <DescriptionInput
            value={endingMent.description}
            placeholder={'추가 설명'}
            changeHandler={e => setEndingMent(ment => ment = {...ment, description : e.target.value})}
            />
        </div>

    </div>
    )
    
}

export default Ecard