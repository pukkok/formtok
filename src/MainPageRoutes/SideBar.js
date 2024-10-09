import React, { useEffect, useRef, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { isSideOpenAtom } from "../Recoils/screenAtom";
import { replace, useNavigate } from "react-router-dom";
import SideBarWrapper from "./_StyledSideBar";
import Logo from "../Components/DashBoardLogo";
import { Icon } from "../Components/Icons";
import classNames from "classnames";
import sidebarNavs from "../Datas/sidebarNavs";
import SwitchScreenModeBtn from "../Components/SwitchScreenModeBtn";
import useSwitchPage from "../Hooks/useSwitchPage";
import { endingMentAtom, originalDataAtom, pagesAtom, surveyListStyleAtom, surveyOptionsAtom, surveyTitleAtom } from "../Recoils/surveyAtoms";
import _ from 'lodash'
import PagesChangeAlertModal from "./PagesChangeAlertModal";

function SideBar ({logo}) {

    const [isSideOpen, setIsSideOpen] = useRecoilState(isSideOpenAtom)
    const [userInfo, setUserInfo] = useState(JSON.parse(localStorage.getItem('userInfo')))
    const [isExpiredToken, setIsExpiredToken] = useState(false)
    const navigate = useNavigate()
    const modalRef = useRef(null)

    const [temporary, setTemporary] = useState({depth1: null, depth2: null, path: null})

    const pages = useRecoilValue(pagesAtom)
    const title = useRecoilValue(surveyTitleAtom)
    const endingMent = useRecoilValue(endingMentAtom)
    const listStyle = useRecoilValue(surveyListStyleAtom)
    const options = useRecoilValue(surveyOptionsAtom)

    const [originalData, setOriginalData] = useRecoilState(originalDataAtom)

    // 사이드바 열고 닫기
    const sideOpener = () => {
        setIsSideOpen(prev => !prev)
    }

    useEffect(() => {
        if(isExpiredToken){
            setUserInfo(null)
        }
    }, [isExpiredToken])

    useEffect(() => {
        const handleBeforeUnload = (event) => {
            if (pagesChangeValueCheck()) {
                event.preventDefault()
                event.returnValue = '' // 브라우저에서 기본 경고 메시지를 표시하도록 함
            }
        }

        window.addEventListener('beforeunload', handleBeforeUnload)

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload)
        }
    }, [pages, title, endingMent, listStyle, options, originalData])

    const [active, setActive] = useState({depth1 : null, depth2: 0})
    const [openDepth2, setOpenDepth2] = useState([1])
    const {goToPage} = useSwitchPage()

    const pagesChangeValueCheck = () => { // 가장 많이 변할것 같은 데이터 우선순위로 비교
        if(!originalData) return false // 들어가기 전
        // pages 비교
        if (!_.isEqual(pages, originalData.pages)) return true // 변경된 경우 바로 true 리턴
        // title 비교
        if (!_.isEqual(title, originalData.title)) return true
        // endingMent 비교
        if (!_.isEqual(endingMent, originalData.endingMent)) return true
        // listStyle 비교
        if (!_.isEqual(listStyle, originalData.listStyle)) return true
        // options 비교
        if (!_.isEqual(options, originalData.options)) return true
        // 모든 항목이 동일한 경우 false 리턴
        return false
    }

    const depth1Next = (idx, path) => {
        if(idx === 0) return goToPage(path) // 홈 <-> 대시보드 페이지 이동
        if(openDepth2.includes(idx)){ // 폴더
            setOpenDepth2(prev => prev = prev.filter(openIdx => openIdx !== idx))
        }else{
            setOpenDepth2([...openDepth2, idx])
        }
        setActive({depth1 : idx, depth2: null})
        if(path) return navigate(path)
    }

    const depth2Next = (idx2, path) => {
        navigate(path)
        setActive({depth1: null, depth2: idx2})
    }

    const depth1Click = async (idx, path) => {
        // 페이지의 데이터가 다르다면 저장 선택 모달 띄우기
        if(!path) return depth1Next(idx, path)
        if(pagesChangeValueCheck()) {
            setTemporary({depth1: idx, depth2: null, path})
            return modalRef.current.showModal()
        }
        depth1Next(idx, path)
    }

    const depth2Click = (idx2, path) => {
        if(pagesChangeValueCheck()){
            setTemporary({depth1: null, depth2: idx2, path})
            return modalRef.current.showModal()
        }
        depth2Next(idx2, path)
    }

    const next = () => {
        const {depth1, depth2, path} = temporary
        if(depth1) depth1Next(depth1, path)
        else depth2Next(depth2, path)
        setOriginalData(null)
        modalRef.current.close()
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

        <PagesChangeAlertModal next={next} ref={modalRef}/>

    </SideBarWrapper>)
}
export default SideBar

