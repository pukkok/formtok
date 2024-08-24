import React, { useEffect } from "react";
import { SideBar, Header, Viewer } from "./index";
import { useRecoilState, useRecoilValue } from "recoil";
import { gridAtom, isSideOpenAtom } from "../Recoil/AdminRecoil";

function AdminPage() {

    const [grid, setGrid] = useRecoilState(gridAtom)

    const isSideOpen = useRecoilValue(isSideOpenAtom)

    const adminStyle = {
        gridTemplateColumns : `${grid}px 1fr`
    }

    useEffect(() => {
        isSideOpen ? setGrid(250) : setGrid(20)
    }, [isSideOpen])

    return <section className="admin-page" style={adminStyle}>
        <SideBar/>
        <Viewer/>
        <Header/>
    </section>
}

export default AdminPage