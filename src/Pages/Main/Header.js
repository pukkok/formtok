import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { activeTabAtom, tabsAtom } from "../../recoils/surveyAtoms";
import classNames from "classnames";
import { useNavigate } from "react-router-dom";
import UserButton from "../../components/UserButton";

function Header () {

    const tabs = useRecoilValue(tabsAtom)
    const [activeTab, setActiveTab] = useRecoilState(activeTabAtom)
    
    const navigate = useNavigate()

    return <div className="header">
        {tabs.length > 0 && 
        tabs.map(tab => {
            return <div 
            key={tab}
            onClick={()=> setActiveTab(tab)}
            className={classNames({active : activeTab === tab})}
            >{tab}</div>
        })}
        <div className="btns">
            <UserButton onClick={()=>navigate('/user/login')}/>
            {/* <button onClick={()=>navigate('/user/login')}>로그인</button> */}
        </div>
        <button>미리보기</button>
        <button>임시저장</button>
    </div>
}

export default Header