import React from "react";
import { useRecoilState } from "recoil";
import { isSideOpenAtom } from "../../recoils/surveyAtoms";
import { useNavigate } from "react-router-dom";
import { SideBarWrapper } from "./StyledMainPage";
import Logo from "../../components/Logo/Logo";
import { Icon } from "../../components/Icons";
function SideBar () {

    const [isSideOpen, setIsSideOpen] = useRecoilState(isSideOpenAtom)

    const sideOpener = () => {
        setIsSideOpen(prev => !prev)
    }

    const navigate = useNavigate()

    return <SideBarWrapper>
        {isSideOpen ? 
        <div className="tabs">
            <div className="logo-box">
                <Logo/>
                <button onClick={sideOpener}>닫기</button>
            </div>
            <ul>
                <li className="active"><button>홈</button></li>
                <li><button>설문지 제작</button></li>
                <li><button>대시보드</button></li>
                <li><button>문항 관리</button></li>
            </ul>

            <ul>
                <li></li>
            </ul>
            <div className="user-info-wrapper">
                <div className="user-info">
                    <Icon code={'account_circle'}/>
                    <div>
                        <h4>비회원</h4>
                        <p>이메일 없음</p>
                    </div>
                </div>
                <button><Icon code={'login'}/></button>
                {/* <button><Icon code={'logout'}/></button> */}
                {/* <UserButton onClick={()=>navigate('/user/login')}/> */}
            </div>
        </div> :
        <button className="open-tab" onClick={sideOpener}></button>}
    </SideBarWrapper>
}
export default SideBar

