import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { activeTabAtom, tabsAtom, urlAtom } from "../../recoils/surveyAtoms";
import classNames from "classnames";
import { useNavigate } from "react-router-dom";
import UserButton from "../../components/UserButton";
import { HeaderWrapper } from "./StyledMainPage";


function Header () {
    const url = useRecoilValue(urlAtom)
    const tabs = useRecoilValue(tabsAtom)
    const [activeTab, setActiveTab] = useRecoilState(activeTabAtom)
    
    const navigate = useNavigate()

    return <HeaderWrapper>
        {tabs.length > 0 && 
        tabs.map(tab => {
            return <div 
            key={tab}
            onClick={()=> setActiveTab(tab)}
            className={classNames({active : activeTab === tab})}
            >{tab}</div>
        })}
        <button onClick={()=>navigate(`/survey/form/${url}`)}>미리보기</button>
        <button>임시저장</button>
        <div className="btns">
            <UserButton onClick={()=>navigate('/user/login')}/>
            {/* <button onClick={()=>navigate('/user/login')}>로그인</button> */}
        </div>
        
    </HeaderWrapper>
}

export default Header