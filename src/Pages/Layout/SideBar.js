import React from "react";
import { useRecoilState } from "recoil";
import { isSideOpenAtom } from "../../Recoil/AdminRecoil";
import { useNavigate } from "react-router-dom";

function SideBar () {
    
    

    const [isSideOpen, setIsSideOpen] = useRecoilState(isSideOpenAtom)

    const sideOpener = () => {
        setIsSideOpen(prev => !prev)
    }

    return <div className="side-bar">
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
    </div>
}
export default SideBar

function Logo () {
    const naviate = useNavigate()
    return <span className="logo" onClick={()=>naviate('/')}>PK&SURVEY</span>
}