import React, { useEffect } from "react";
import SideBar from '../MainPageRoutes/SideBar'
import ViewRouter from '../MainPageRoutes/ViewRouter'
import styled from "styled-components";
import { useRecoilState, useRecoilValue } from "recoil";
import { gridAtom, isSideOpenAtom } from "../Recoils/surveyAtoms";

const MainPageWrapper = styled.section`
    display: grid;
    grid-template-areas: 
    'side viewer';
    width: 100vw;
    height: 100vh;
    transition: .5s;
`

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
        <ViewRouter/>
    </MainPageWrapper>
    )
}

export default MainPage