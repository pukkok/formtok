import React from "react";
import { useRecoilState } from "recoil";
import { pagesAtom } from "../../../Recoil/AdminRecoil";

function RemoteControl () {
    const [pages, setPages] = useRecoilState(pagesAtom)

    const applyOption = () => {
        setPages([...pages, {type: 'page', data: {}}])
    }

    return <div className="remote-control">
        <nav>
            <p>전체 문항</p>
            {/* <p>설정</p> */}
        </nav>
        <div className="btns">
            <button>문항 추가</button>
            <button onClick={applyOption}>페이지 추가</button>
            <button>페이지 나누기</button>
        </div>
    </div>
}

export default RemoteControl