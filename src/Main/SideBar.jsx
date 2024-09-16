import React, { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { isSideOpenAtom, ViewerBGAtom } from "../Recoils/surveyAtoms";
import { useNavigate } from "react-router-dom";
import { SideBarWrapper } from "./_StyledMainPage";
import Logo from "../Components/Logo/Logo";
import { Icon } from "../Components/Icons";
import classNames from "classnames";
function SideBar () {

    const viewerBG = useRecoilValue(ViewerBGAtom)
    const [isSideOpen, setIsSideOpen] = useRecoilState(isSideOpenAtom)
    
    const [userInfo, setUserInfo] = useState(JSON.parse(localStorage.getItem('userInfo')))
    const token = localStorage.getItem('token')

    useEffect(()=>{
        const localStorageChange = () => {
            setUserInfo(JSON.parse(localStorage.getItem('userInfo')))
        }

        window.addEventListener('storage', localStorageChange)

        // 클린업
        return () => window.removeEventListener('storage', localStorageChange)
    }, [])

    const sideOpener = () => {
        setIsSideOpen(prev => !prev)
    }

    const navigate = useNavigate()

    const [active, setActive] = useState(0)
    const [openDepth2, setOpenDepth2] = useState([])

    const navClick = (e, idx) => {
        setActive(idx)
        const depth2 = e.target.dataset.depth2
        if(!depth2) return
        if(openDepth2.includes(depth2)){
            setOpenDepth2(prev => prev = prev.filter(od => od !== depth2))
        }else{
            setOpenDepth2([...openDepth2, depth2])
        }
    }

    const sidebarNavs = [
        {depth1: '홈', code: 'home'},
        {depth1: '설문지', code: 'lab_profile', dataset: 'survey-list', depth2: [{text:'제작하기'}, {text:'참여하기'}, {text:'결과보기'}]},
        {depth1: '대시보드', code: 'equalizer'},
        {depth1: '문항 관리', code: 'folder_managed'},
        {depth1: '설정', code: 'settings'},
    ]

    return <SideBarWrapper>
        {isSideOpen ? 
        <div className="tabs">
            <div className="logo-box">
                <Logo/>
                <button onClick={sideOpener}>닫기</button>
            </div>
            <ul className="depth1">
            {sidebarNavs.map((list, idx) => {
                const {depth1, code, dataset, depth2} = list
                return <li key={depth1} className={classNames({active : active === idx})}>
                    <button data-depth2={depth2 && dataset}
                    onClick={e=>navClick(e, idx)}
                    ><Icon code={code}/>{depth1}</button>
                    {depth2 &&
                    <ul className={classNames("depth2",{active: openDepth2.includes(dataset)})}>
                        {depth2.map(item => {
                            const {text} = item
                            return <li key={text}><button>{text}</button></li>
                        })}
                    </ul>}
                </li>
            })}
            </ul>
            {/* <ul className="depth1">
                <li className="active"><button><Icon code={'home'}/>홈</button></li>
                <li><button data-depth2='survey-list' onClick={depth2Opener}>
                    <Icon code={'lab_profile'}/>
                    설문지</button>
                    {openDepth2.includes('survey-list') && 
                    <ul className="depth2">
                        <li><button>제작하기</button></li>
                        <li><button>참여하기</button></li>
                        <li><button>결과보기</button></li>
                    </ul>}
                </li>
                <li><button><Icon code={'equalizer'}/>대시보드</button></li>
                <li><button><Icon code={'folder_managed'}/>문항 관리</button></li>
            </ul> */}

            <div className="user-info-wrapper">
                <div className="user-info">
                    <Icon code={'account_circle'}/>
                    <div>
                        <h4>{userInfo ? userInfo.userId : '비회원'}</h4>
                        <p>{userInfo ? userInfo.email && userInfo.email : '이메일 없음'}</p>
                    </div>
                </div>
                
                {userInfo ? 
                <button onClick={()=>{
                    localStorage.clear()
                    setUserInfo(null)
                }}><Icon code={'logout'}/></button> :
                <button onClick={()=>navigate('/user/login')}><Icon code={'login'}/></button>
                }
            </div>
        </div> :
        <button className="open-tab" onClick={sideOpener}></button>}

        <span className="top block"></span>
        <span style={{backgroundColor : viewerBG}} className="bottom block"></span>
    </SideBarWrapper>
}
export default SideBar

