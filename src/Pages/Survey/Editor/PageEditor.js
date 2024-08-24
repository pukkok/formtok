import React from "react";
import { useRecoilState } from "recoil";
import { pagesAtom } from "../../../Recoil/AdminRecoil";

function PageEditor () {

    const [pages, setPages] = useRecoilState(pagesAtom)

    return <div className="card">
        <div>1/1 페이지</div>
        <input className="page-title" placeholder="페이지 제목"/>
        <input placeholder="페이지 설명"/>
    </div>
}

export default PageEditor