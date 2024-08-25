import React from "react";
import { MultipleChoice, PageEditor, RemoteControl, TableEditor } from ".";

function CreateSurvey () {
    
    return <section className="create-survey">
        *설문지 제작 페이지
        <div className="editor-box">
            <div className="card-box">
                <PageEditor/>
            </div>
            <RemoteControl/>
        </div>
        <MultipleChoice />
        <TableEditor/>

    </section>
}

export default CreateSurvey