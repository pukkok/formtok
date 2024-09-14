import React, { useEffect } from "react";
import SideBar from './SideBar'
import Header from './Header'
import ViewRouter from './ViewRouter'
import { MainPageWrapper } from "./StyledMainPage";
import { useRecoilState, useRecoilValue } from "recoil";
import { gridAtom, isSideOpenAtom } from "../../recoils/surveyAtoms";

function MainPage() {

    const [grid, setGrid] = useRecoilState(gridAtom)

    const isSideOpen = useRecoilValue(isSideOpenAtom)

    const adminStyle = {
        gridTemplateColumns : `${grid}px 1fr`
    }

    useEffect(() => {
        isSideOpen ? setGrid(320) : setGrid(20)
    }, [isSideOpen, setGrid])

    return (
    <MainPageWrapper style={adminStyle}>
        <SideBar/>
        <Header/>
        <ViewRouter/>
    </MainPageWrapper>
    )
}

export default MainPage