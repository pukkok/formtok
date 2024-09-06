import React from "react";
import CreateSurvey from "../Viewer/CreateSurvey";
import { Route, Routes } from "react-router-dom";
import SurveyMangager from "../Viewer/SurveyManager";

function ViewRouter () {

    return <div className="viewer">
        <Routes>
            <Route path="/" element={<SurveyMangager/>}/>
            <Route path="survey">
                <Route path="create/*" element={<CreateSurvey/>}></Route>
            </Route>
        </Routes>
    </div>
}
export default ViewRouter