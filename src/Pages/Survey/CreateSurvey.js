import React from "react";
import { MultipleChoice, PageEditor, TableEditor } from ".";

function CreateSurvey () {
    
    return <section className="create-survey">
        설문지 제작 페이지 입니다.
        <div className="editor-box">
            <div className="card-box">
                <PageEditor/>
            </div>
            <div className="remote-control"></div>
        </div>
        <MultipleChoice />
        <TableEditor/>

    </section>
}

export default CreateSurvey