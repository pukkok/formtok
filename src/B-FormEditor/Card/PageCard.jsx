import React, { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { activeCardAtom, pagesAtom } from "../../C-Recoils/surveyAtoms";
import usePageActions from "../../C-Hooks/usePageActions";
import { FormCardWrapper } from "./FormCards.styled";
import classNames from "classnames";
import DescriptionEditor from "../../A-Components/DescriptionEditor";


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

export default PageCard