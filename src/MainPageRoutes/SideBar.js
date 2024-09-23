import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { isSideOpenAtom } from "../Recoils/surveyAtoms";
import { useNavigate } from "react-router-dom";
import SideBarWrapper from "./_StyledSideBar";
import Logo from "../Components/Logo/Logo";
import { Icon } from "../Components/Icons";
import classNames from "classnames";
import sidebarNavs from "../Datas/sidebarNavs";
import useAxios from "../Hooks/useAxios";

function SideBar () {

    const [isSideOpen, setIsSideOpen] = useRecoilState(isSideOpenAtom)
    
    const [userInfo, setUserInfo] = useState(JSON.parse(localStorage.getItem('userInfo')))

    const token = localStorage.getItem('token')
    const { firstExpiredTokenCheck } = useAxios()

    useEffect(() => {
        if(token) firstExpiredTokenCheck(token)
    }, [token])

    const sideOpener = () => {
        setIsSideOpen(prev => !prev)
    }

    const navigate = useNavigate()

    const [active, setActive] = useState({depth1 : null, depth2: 0})
    const [openDepth2, setOpenDepth2] = useState([1])

    const depth1Click = (idx, path) => {
        setActive({depth1 : idx, depth2: null})
        if(path) return navigate(path)
            
        if(openDepth2.includes(idx)){
            setOpenDepth2(prev => prev = prev.filter(openIdx => openIdx !== idx))
        }else{
            setOpenDepth2([...openDepth2, idx])
        }
    }

    const depth2Click = (idx2, path) => {
        setActive({depth1: null, depth2: idx2})
        navigate(path)
    }

    return <SideBarWrapper>
        {isSideOpen ? 
        <div className="tabs">
            <div className="logo-box">
                <Logo/>
                <button onClick={sideOpener}>닫기</button>
            </div>
            <ul className="depth1">
            {sidebarNavs.map((list, idx) => {
                const {text, code, path, depth2} = list
                return <li key={text}
                className={classNames({
                toggle : depth2 && openDepth2.includes(idx), 
                active : active['depth1'] === idx})}>
                    <button
                    onClick={()=>depth1Click(idx, path)}
                    >
                    <Icon code={code}/>{text}
                    
                    {depth2 && //애로우 버튼
                    <Icon className={classNames('arrow', {open : openDepth2.includes(idx)})}
                    code={'keyboard_arrow_up'}/>}
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

    </SideBarWrapper>
}
export default SideBar

