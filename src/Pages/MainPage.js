import React, { useEffect } from "react";
import SideBar from './Layout/SideBar'
import Header from './Layout/Header'
import ViewRouter from './Layout/ViewRouter'
import './Layout/MainPage.css'

import { useRecoilState, useRecoilValue } from "recoil";
import { gridAtom, isSideOpenAtom } from "../Recoil/AdminRecoil";
import LoginPage from "./LoginPage";

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