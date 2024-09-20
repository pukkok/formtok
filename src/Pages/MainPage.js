import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import SideBar from "../MainPageRoutes/SideBar";
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

const ViewerWrapper = styled.div`
    grid-area: viewer;
    background-color: var(--pk-deep-dark);
    overflow: scroll;  
`

function MainPage() {

    const [grid, setGrid] = useRecoilState(gridAtom)

    const isSideOpen = useRecoilValue(isSideOpenAtom)

    const screenRatio = {
        gridTemplateColumns : `${grid}px 1fr`
    }

    useEffect(() => {
        isSideOpen ? setGrid(320) : setGrid(20)
    }, [isSideOpen, setGrid])

    return <MainPageWrapper style={screenRatio}>
        <SideBar/>
        <ViewerWrapper>
            <Outlet/>
        </ViewerWrapper>
    </MainPageWrapper>
}

export default MainPage