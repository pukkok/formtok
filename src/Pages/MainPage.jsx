import React, { useEffect } from "react";
import SideBar from '../Main/SideBar'
import Header from '../Main/Header'
import ViewRouter from '../Main/ViewRouter'
import { MainPageWrapper } from "../Main/_StyledMainPage";

import { useRecoilState, useRecoilValue } from "recoil";
import { gridAtom, isSideOpenAtom } from "../Recoils/surveyAtoms";

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