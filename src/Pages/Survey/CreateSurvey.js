import React, { useEffect, useState } from "react";
import { MultipleChoice, PageEditor, RemoteControl, TableEditor } from ".";
import { useRecoilValue } from "recoil";
import { pagesAtom } from "../../Recoil/AdminRecoil";
import classNames from "classnames";

function CreateSurvey () {
    const pages = useRecoilValue(pagesAtom)
    const [activeNum, setActiveNum] = useState(0)

    return <section className="create-survey">
        *설문지 제작 페이지
        <div className="editor-box">
            <div className="card-box" >
                {pages.map((page, idx) => {
                    const {type, data} = page
                    return (<div onClick={()=>setActiveNum(idx)} key={idx}
                    className={classNames("card", {active : idx === activeNum})}>
                        {type === 'page' && <PageEditor pageIdx={idx}/>}
                        {type === 'quiz' && <MultipleChoice/>}
                    </div>)
                })}
            </div>
            <RemoteControl/>
        </div>
        <MultipleChoice />
        <TableEditor/>

    </section>
}

export default CreateSurvey