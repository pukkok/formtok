import React, { useEffect, useState } from "react";
import { useRecoilValue, useRecoilState } from "recoil";
import { pagesAtom, activeCardAtom } from "../../recoils/surveyAtoms";
import usePageActions from "../../hooks/usePageActions";
import DescriptionEditor from "../../components/DescriptionEditor";
import classNames from "classnames";
import StyledCard from "../../styles/StyledCard";

function Pcard({pi}) {
    const pages = useRecoilValue(pagesAtom)
    const [activeCard, setActiveCard] = useRecoilState(activeCardAtom)

    const [pageCnt, setPageCnt] = useState('1/1')
    useEffect(() => {
        setPageCnt(`${pi+1}/${pages.length}`)
    }, [pages, pi])

    const {changePTitle, changePDescription} = usePageActions()
    
    return (
        <StyledCard>
        <div className={classNames("card", 
            {active : `P-${pi}` === activeCard})}
            onClick={()=>setActiveCard(`P-${pi}`)}>
            
            <h4 className="pd">{pageCnt} 페이지</h4>
            <div className="pd">
                <input className="title-A" 
                placeholder="페이지 제목" onChange={e=>changePTitle(e, pi)} value={pages[pi].title}/>
                <DescriptionEditor 
                value={pages[pi].description}
                pi={pi}
                placeholder={'페이지 설명'}
                handleChange={changePDescription}
                // changeHandler={changePDescription(pi)}
                />
            </div>
        </div>
        </StyledCard>
    )
}

export default Pcard