import React, { useEffect, useRef, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { isSideOpenAtom } from "../Recoils/screenAtom";
import { useNavigate } from "react-router-dom";
import SideBarWrapper from "./_StyledSideBar";
import Logo from "../Components/DashBoardLogo";
import { Icon } from "../Components/Icons";
import classNames from "classnames";
import sidebarNavs from "../Datas/sidebarNavs";
import SwitchScreenModeBtn from "../Components/SwitchScreenModeBtn";
import useSwitchPage from "../Hooks/useSwitchPage";
import { originalPagesAtom, pagesAtom } from "../Recoils/surveyAtoms";
import _ from 'lodash'
import PagesChangeAlertModal from "./PagesChangeAlertModal";

function SideBar ({logo}) {

    const [isSideOpen, setIsSideOpen] = useRecoilState(isSideOpenAtom)
    const [userInfo, setUserInfo] = useState(JSON.parse(localStorage.getItem('userInfo')))
    const [isExpiredToken, setIsExpiredToken] = useState(false)
    const navigate = useNavigate()
    const modalRef = useRef(null)
    const pages = useRecoilValue(pagesAtom)
    const originPages = useRecoilValue(originalPagesAtom)

    // 사이드바 열고 닫기
    const sideOpener = () => {
        setIsSideOpen(prev => !prev)
    }

    useEffect(() => {
        if(isExpiredToken){
            setUserInfo(null)
        }
    }, [isExpiredToken])

    const [active, setActive] = useState({depth1 : null, depth2: 0})
    const [openDepth2, setOpenDepth2] = useState([1])
    const {goToPage} = useSwitchPage()


    const pagesChangeValueCheck = () => { // 객체의 데이터가 같은지 다른지 확인
        return _.isEqual(pages, originPages)
    }

    const depth1Click = (idx, path) => {
        // 페이지의 데이터가 다르다면 저장 선택 모달 띄우기
        if(!pagesChangeValueCheck()) return modalRef.current.showModal()
        if(idx === 0) return goToPage(path) // 홈 <-> 대시보드 페이지 이동
        setActive({depth1 : idx, depth2: null})
        if(path) return navigate(path)
            
        if(openDepth2.includes(idx)){
            setOpenDepth2(prev => prev = prev.filter(openIdx => openIdx !== idx))
        }else{
            setOpenDepth2([...openDepth2, idx])
        }
    }

    const depth2Click = (idx2, path) => {
        if(!pagesChangeValueCheck()) return modalRef.current.showModal()
        setActive({depth1: null, depth2: idx2})
        navigate(path)
    }

    const logout = () => {
        alert('로그아웃 되었습니다.')
        localStorage.clear()
        setUserInfo(null)
        navigate('/')
    }

    return (
    <SideBarWrapper>
        {isSideOpen ? 
        <div className="tabs">
            <div className="logo-box">
                <Logo src={logo} isExpiredToken={setIsExpiredToken}/>
            </div>
            <ul className="depth1">
            {sidebarNavs.map((list, idx) => {
                const {text, code, path, depth2} = list
                return <li key={text}
                className={classNames({
                toggle : depth2 && openDepth2.includes(idx), 
                active : active['depth1'] === idx})}>
                    <button onClick={()=>depth1Click(idx, path)}>
                    <Icon code={code}/>{text}
                    
                    {depth2 && //애로우 버튼
                    <Icon className={classNames('arrow', {open : openDepth2.includes(idx)})} code={'keyboard_arrow_up'}/>}
                    </button>
                    
                    {depth2 &&
                    <ul className={"depth2"}
                    style={{height: openDepth2.includes(idx) ? 
                        (depth2.length * 40 + (depth2.length-1) * 5)+'px' : 0}}
                    >
                        {depth2.map((item, idx2) => {
                            const {text, path, code} = item
                            return <li key={text} 
                            className={classNames({active : active['depth2'] === idx2})}>
                                <button onClick={()=>depth2Click(idx2, path)}>
                                    <Icon code={code}/>{text}
                                </button>
                                </li>
                        })}
                    </ul>}
                </li>
            })}
            </ul>

            <footer>
            <div className="switch-box">
                <SwitchScreenModeBtn />
            </div>
            <div className="user-info-wrapper">
                <div className="user-info">
                    <Icon code={'account_circle'}/>
                    <div>
                        <h4>{userInfo ? userInfo.userId : '비회원'}</h4>
                        <p>{userInfo ? userInfo.email && userInfo.email : '이메일 없음'}</p>
                    </div>
                </div>
                
                {userInfo ? 
                <button onClick={logout}><Icon code={'logout'}/></button> :
                <button onClick={()=>navigate('/user/login')}><Icon code={'login'}/></button>
                }
            </div>
            </footer>
            
        </div> :
        <button className="open-tab" onClick={sideOpener}></button>}

        <PagesChangeAlertModal ref={modalRef}/>

    </SideBarWrapper>)
}
export default SideBar

