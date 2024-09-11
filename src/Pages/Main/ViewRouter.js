import React from "react";
import { Route, Routes } from "react-router-dom";
import CreateSurvey from "../Viewer/CreateSurvey";
import SurveyMangager from "../Viewer/SurveyManager";
import SurveyForm from "../Viewer/SurveyForm";
import NotFoundPage from '../Viewer/NotFoundPage';

function ViewRouter () {

    return <div className="viewer">
        <Routes>
            <Route path="/" element={<SurveyMangager/>}/>
            <Route path="survey">
                <Route path="create/*" element={<CreateSurvey/>}></Route>
                <Route path="form/*" element={<SurveyForm/>}/>
            </Route>
            <Route exact path='*' element={<NotFoundPage />}/>
        </Routes>
    </div>
}
export default ViewRouter