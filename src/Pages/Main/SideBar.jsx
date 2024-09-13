import React from "react";
import { useRecoilState } from "recoil";
import { isSideOpenAtom } from "../../recoils/surveyAtoms";
import { useNavigate } from "react-router-dom";
import { SideBarWrapper, Logo } from "./StyledMainPage";

function SideBar () {

    const [isSideOpen, setIsSideOpen] = useRecoilState(isSideOpenAtom)

    const sideOpener = () => {
        setIsSideOpen(prev => !prev)
    }

    return <SideBarWrapper>
        {isSideOpen ? 
        <div className="tabs">
            <div className="top">
                <Logo/>
                <button onClick={sideOpener}>닫기</button>
            </div>
            <ul>
                <li><button>설문지 제작</button></li>
                <li><button>대시보드</button></li>
                <li><button>문항 관리</button></li>
            </ul>
        </div> :
        <button className="open-tab" onClick={sideOpener}></button>}
    </SideBarWrapper>
}
export default SideBar

