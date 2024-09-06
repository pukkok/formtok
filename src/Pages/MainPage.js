import React, { useEffect } from "react";
import SideBar from './Main/SideBar'
import Header from './Main/Header'
import ViewRouter from './Main/ViewRouter'

import { useRecoilState, useRecoilValue } from "recoil";
import { gridAtom, isSideOpenAtom } from "../recoils/surveyAtoms";

function MainPage() {

    const [grid, setGrid] = useRecoilState(gridAtom)

    const isSideOpen = useRecoilValue(isSideOpenAtom)

    const adminStyle = {
        gridTemplateColumns : `${grid}px 1fr`
    }

    useEffect(() => {
        isSideOpen ? setGrid(250) : setGrid(20)
    }, [isSideOpen])

    return <section className="main-page" style={adminStyle}>
        <SideBar/>
        <Header/>
        <ViewRouter/>
    </section>
}

export default MainPage