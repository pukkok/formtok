import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { activeTabAtom, pagesAtom, surveyTitleAtom, tabsAtom, urlAtom } from "../Recoils/surveyAtoms";
import classNames from "classnames";
import { useHref, useNavigate } from "react-router-dom";
import { HeaderWrapper } from "../MainPageRoutes/_StyledMainPage";
import useAxios from "../Hooks/useAxtios";

function Header () {
    const url = useRecoilValue(urlAtom)
    const pages = useRecoilValue(pagesAtom)
    const title = useRecoilValue(surveyTitleAtom)
    const token = localStorage.getItem('token')

    const tabs = useRecoilValue(tabsAtom)

    const [activeTab, setActiveTab] = useRecoilState(activeTabAtom)
    const href = useHref()

    const { createForm } = useAxios() 
    const navigate = useNavigate()

    return <HeaderWrapper 
    className={classNames(
        {create : href.includes('/create')}
    )}
    >
        {tabs.length > 0 && 
        tabs.map(tab => {
            return <div 
            key={tab}
            onClick={()=> setActiveTab(tab)}
            className={classNames({active : activeTab === tab})}
            >{tab}</div>
        })}

        {href.includes('/create') && <>
            <button onClick={()=>navigate(`/survey/form/${url}`)}>미리보기</button>
            <button onClick={()=>createForm(url, title, pages, token)}>임시저장</button>
        </>}
        
    </HeaderWrapper>
}

export default Header